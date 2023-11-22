const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

const Person = require("./models/person");

app.get("/", (request, response) => {
  response.send(
    "This is the homepage. Go to /api/persons to find the persons database."
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${Object.keys(persons).length} people.</p>
    <br/>
    ${Date()}
    `
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) response.send(person);
  else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  response.send(persons.filter((person) => person.id !== id));
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(404).send("Missing name");
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server hosted on http://localhost:${PORT}`);
});
