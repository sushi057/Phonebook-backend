const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

//Configure morgan
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
// app.use(morgan("combined"));

morgan.token("output", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :output",
    {
      skip: (request, response) => request.method !== "POST",
    }
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send(
    "This is the homepage. Go to /api/persons to find the persons database."
  );
});

app.get("/api/persons", (request, response) => {
  response.send(persons);
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
  const id = Math.floor(Math.random() * 100 + 5);
  const body = request.body;
  const person = {
    id: id,
    name: body.name,
    number: body.number,
  };

  if (persons.find((item) => item.name === person.name)) {
    response.status(404).send("Error: Name must be unique");
  } else if (!person.name) {
    response.status(404).send("Error: Name missing");
  } else if (!person.number) {
    response.status(404).send("Error: Number missing");
  }
  console.log(person);
  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server hosted on http://localhost:${PORT}`);
});
