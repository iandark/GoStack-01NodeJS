const express = require("express");
const { uuid } = require("uuidv4");

const app = express();
const projects = [];

app.use(express.json());

app.get("/projects", (request, response) => {
    const { title } = request.query;
    const results = title
        ? projects.filter((project) => project.title.includes(title))
        : projects;

    console.log("projects", projects);
    console.log("results", results);
    return response.json(results);
});

app.post("/projects", (request, response) => {
    const { title, owner } = request.body;
    const project = { id: uuid(), title, owner };
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
