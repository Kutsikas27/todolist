package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type RequestBody struct {
	Input string `json:"input"`
}

func main() {
	fileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileServer)
	http.HandleFunc("/text", inputHandler)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

}

func inputHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodGet {
		data := map[string][]string{
			"input": {"koodime, koodime", "magame", "koodime veel"},
		}

		jsonData, err := json.Marshal(data)
		if err != nil {
			fmt.Println("Error marshalling JSON:", err)
			return
		}
		w.Write(jsonData)
	} else if r.Method == http.MethodPost {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			fmt.Println("Error reading response body:", err)
			return
		}
		var input RequestBody
		err = json.Unmarshal(body, &input)
		if err != nil {
			fmt.Println("Error unmarshalling JSON:", err)
			return
		}
		fmt.Println(input.Input)
	}
}
