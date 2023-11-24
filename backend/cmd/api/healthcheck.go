package main

import "net/http"

func (app *application) healthcheckHandler(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"status":      "available",
		"environment": app.config.env,
		"version":     version,
	}

	err := app.writeJSON(w, http.StatusOK, data, nil)
	if err != nil {
		app.logger.PrintError(err, nil)
		http.Error(w, "O servidor encontrou um problema e não conseguiu processar sua requisição"+
			"", http.StatusInternalServerError)
	}
}
