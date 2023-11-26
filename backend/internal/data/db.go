// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.23.0

package data

import (
	"context"
	"database/sql"
	"fmt"
)

type DBTX interface {
	ExecContext(context.Context, string, ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

func New(db DBTX) *Queries {
	return &Queries{db: db}
}

func Prepare(ctx context.Context, db DBTX) (*Queries, error) {
	q := Queries{db: db}
	var err error
	if q.selectAProductStmt, err = db.PrepareContext(ctx, selectAProduct); err != nil {
		return nil, fmt.Errorf("error preparing query SelectAProduct: %w", err)
	}
	if q.selectProductsStmt, err = db.PrepareContext(ctx, selectProducts); err != nil {
		return nil, fmt.Errorf("error preparing query SelectProducts: %w", err)
	}
	return &q, nil
}

func (q *Queries) Close() error {
	var err error
	if q.selectAProductStmt != nil {
		if cerr := q.selectAProductStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing selectAProductStmt: %w", cerr)
		}
	}
	if q.selectProductsStmt != nil {
		if cerr := q.selectProductsStmt.Close(); cerr != nil {
			err = fmt.Errorf("error closing selectProductsStmt: %w", cerr)
		}
	}
	return err
}

func (q *Queries) exec(ctx context.Context, stmt *sql.Stmt, query string, args ...interface{}) (sql.Result, error) {
	switch {
	case stmt != nil && q.tx != nil:
		return q.tx.StmtContext(ctx, stmt).ExecContext(ctx, args...)
	case stmt != nil:
		return stmt.ExecContext(ctx, args...)
	default:
		return q.db.ExecContext(ctx, query, args...)
	}
}

func (q *Queries) query(ctx context.Context, stmt *sql.Stmt, query string, args ...interface{}) (*sql.Rows, error) {
	switch {
	case stmt != nil && q.tx != nil:
		return q.tx.StmtContext(ctx, stmt).QueryContext(ctx, args...)
	case stmt != nil:
		return stmt.QueryContext(ctx, args...)
	default:
		return q.db.QueryContext(ctx, query, args...)
	}
}

func (q *Queries) queryRow(ctx context.Context, stmt *sql.Stmt, query string, args ...interface{}) *sql.Row {
	switch {
	case stmt != nil && q.tx != nil:
		return q.tx.StmtContext(ctx, stmt).QueryRowContext(ctx, args...)
	case stmt != nil:
		return stmt.QueryRowContext(ctx, args...)
	default:
		return q.db.QueryRowContext(ctx, query, args...)
	}
}

type Queries struct {
	db                 DBTX
	tx                 *sql.Tx
	selectAProductStmt *sql.Stmt
	selectProductsStmt *sql.Stmt
}

func (q *Queries) WithTx(tx *sql.Tx) *Queries {
	return &Queries{
		db:                 tx,
		tx:                 tx,
		selectAProductStmt: q.selectAProductStmt,
		selectProductsStmt: q.selectProductsStmt,
	}
}