package main

import (
	"github.com/skapskap/GoShop/utility"
	"net/http"
)

func (app *application) healthcheckHandler(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"status":      "available",
		"environment": app.config.env,
		"version":     version,
	}

	err := utility.WriteJSON(w, http.StatusOK, data, nil)
	if err != nil {
		app.logger.PrintError(err, nil)
		http.Error(w, "O servidor encontrou um problema e não conseguiu processar sua requisição"+
			"", http.StatusInternalServerError)
	}
}
