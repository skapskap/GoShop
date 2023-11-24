package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/httprate"
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

	v1 := chi.NewRouter()
	r.Mount("/v1", v1)

	v1.Get("/healthcheck", app.healthcheckHandler)

	return r
}
