const express = require("express");
const app = express();

const persons = [
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
    `<p>Phonebook has info for ${Object.keys(persons).length}.</p>
    <br/>
    ${Date()}
    `
  );
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server hosted on ${PORT}`);
});
