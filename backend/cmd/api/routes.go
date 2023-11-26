package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"
	"github.com/skapskap/GoShop/internal/handlers"
	"net/http"
	"time"
)

func (app *application) routes() http.Handler {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(httprate.Limit(
		3,             // requests
		1*time.Second, // per duration
		httprate.WithLimitHandler(func(w http.ResponseWriter, r *http.Request) {
			http.Error(w, "limite de requisições consecutivas atingida", http.StatusTooManyRequests)
		}),
	))
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))

	v1 := chi.NewRouter()
	r.Mount("/v1", v1)

	v1.Get("/healthcheck", app.healthcheckHandler)
	v1.Get("/products", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handlers.GetAllProducts(w, r, app.db)
	}))

	return r
}
