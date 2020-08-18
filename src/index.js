const express = require("express");

const app = express();

/**
 * Métodos HTTP
 *
 * GET: Buscar informações do backend
 * POST: Criar uma informação no backend
 * PUT: Atualizar uma coleção de dados
 * PATCH: Atualizar um dado único (single element)
 * DELETE: Deletar uma informação no backend
 */

app.get("/projects", (request, response) => {
    return response.json(["Projeto 1", "Projeto 2", "Projeto 3"]);
});

app.post("/projects", (request, response) => {
    return response.json(["Projeto 1", "Projeto 2", "Projeto 3"]);
});

app.put("/projects/:id", (request, response) => {
    return response.json(["Projeto 4", "Projeto 2", "Projeto 3"]);
});

app.delete("/projects:id", (request, response) => {
    return response.json(["Projeto 4", "Projeto 2", "Projeto 3"]);
});

app.listen(3333, () => {
    console.log("🔥 Back-end started!");
});
