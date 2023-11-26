package handlers

import (
	"database/sql"
	"errors"
	"github.com/skapskap/GoShop/internal/data"
	"github.com/skapskap/GoShop/internal/jsonlog"
	"github.com/skapskap/GoShop/utility"
	"net/http"
)

func GetAllProducts(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	queries := data.New(db)

	ctx := r.Context()
	product, err := queries.SelectProducts(ctx)
	if err != nil {
		switch {
		case errors.Is(err, jsonlog.ErrRecordNotFound):
			utility.NotFoundResponse(w, r)
		default:
			utility.ServerErrorResponse(w, r, err)
		}
		return
	}

	err = utility.WriteJSON(w, http.StatusOK, utility.Envelope{"product": product}, nil)
	if err != nil {
		utility.ServerErrorResponse(w, r, err)
	}
}

func GetOneProduct(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	queries := data.New(db)

	id, err := utility.ReadIDParam(r)
	if err != nil {
		utility.NotFoundResponse(w, r)
		return
	}

	ctx := r.Context()
	product, err := queries.SelectAProduct(ctx, id)
	if err != nil {
		switch {
		case errors.Is(err, jsonlog.ErrRecordNotFound):
			utility.NotFoundResponse(w, r)
		default:
			utility.ServerErrorResponse(w, r, err)
		}
		return
	}

	err = utility.WriteJSON(w, http.StatusOK, utility.Envelope{"product": product}, nil)
	if err != nil {
		utility.ServerErrorResponse(w, r, err)
	}
}
