const express = require("express");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

const app = express();
const projects = [];

app.use(express.json());

function logRequest(request, response, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()} ${url}]`;

    console.log(logLabel);

    return next(); // próximo middleware
}

function validateProjectId(request, response, next) {
    const { id } = request.params;
    if (!uuidValidate(id)) {
        return response.status(400).json({ erro: "Invalid project id." });
    }

    return next();
}

app.use(logRequest); // chamada global
app.use("/projects/:id", validateProjectId);

app.get("/projects", (request, response) => {
    const { title } = request.query;
    const results = title
        ? projects.filter((project) => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post("/projects", (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuidv4(), title, owner };
    projects.push(project);
    return response.json(project);
});

app.put("/projects/:id", (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex < 0) {
        return response.status(401).json({ error: "Project not found." });
    }

    const { title, owner } = request.body;
    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
    const { id } = request.params;
    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex < 0) {
        return response.status(401).json({ error: "Project not found." });
    }

    projects.splice(projectIndex, 1);

    // Como se trata de resposta vazia, é recomendado utilizar o status 204
    return response.status(204).send();
});

app.listen(3333, () => {
    console.log("🔥 Back-end started!");
});
