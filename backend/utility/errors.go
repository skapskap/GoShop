package utility

import (
	"fmt"
	"github.com/skapskap/GoShop/internal/jsonlog"
	"net/http"
	"os"
)

func LogError(r *http.Request, err error) {
	logger := jsonlog.New(os.Stdout, jsonlog.LevelError)

	logger.PrintError(err, map[string]string{
		"request_method": r.Method,
		"request_url":    r.URL.String(),
	})
}

func ErrorResponse(w http.ResponseWriter, r *http.Request, status int,
	message interface{}) {

	env := Envelope{"error": message}

	err := WriteJSON(w, status, env, nil)
	if err != nil {
		LogError(r, err)
		w.WriteHeader(500)
	}
}

func ServerErrorResponse(w http.ResponseWriter, r *http.Request, err error) {
	LogError(r, err)

	message := "O servidor encontrou um problema e não conseguiu processar sua requisição"
	ErrorResponse(w, r, http.StatusInternalServerError, message)
}

func NotFoundResponse(w http.ResponseWriter, r *http.Request) {
	message := "O recurso solicitado não foi encontrado"
	ErrorResponse(w, r, http.StatusNotFound, message)
}

func methodNotAllowedResponse(w http.ResponseWriter, r *http.Request) {
	message := fmt.Sprintf("O método %s não é suportado neste recurso", r.Method)
	ErrorResponse(w, r, http.StatusMethodNotAllowed, message)
}

func badRequestResponse(w http.ResponseWriter, r *http.Request, err error) {
	ErrorResponse(w, r, http.StatusBadRequest, err.Error())
}
