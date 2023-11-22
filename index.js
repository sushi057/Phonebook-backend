const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

const Person = require("./models/person");

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastMessage") {
    return response.status(400).send({ error: "Malformatted Id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: "Inalid Input" });
  }
};

app.use(errorHandler);

//Homepage
app.get("/", (request, response) => {
  response.send(
    "This is the homepage. Go to /api/persons to find the persons database."
  );
});

//Get list of person in the phonebook
app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

//Info page
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${Object.keys(Person).length} people.</p>
    <br/>
    ${Date()}
    `
  );
});

//Getting individual person
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else console.status(404).end();
    })
    .catch((error) => next(error));
});

//Deleting person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
    .catch((error) => next(error));
});

//Adding a person
app.post("/api/persons/", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

//Updaiting phone number
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server hosted on http://localhost:${PORT}`);
});
