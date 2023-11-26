-- name: SelectProducts :many
SELECT * FROM products
ORDER BY id;

-- name: SelectAProduct :one
SELECT * FROM products
WHERE id = $1
LIMIT 1;