const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Need to put password");
}

const password = process.argv[2];
const url = `mongodb+srv://sushi:${password}@phonebook.5nwx7gy.mongodb.net/?retryWrites=true&w=majority`;

const personName = process.argv[3];
const personNumber = process.argv[4];

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: personName,
  number: personNumber,
});

if (process.argv.length == 5) {
  person.save().then((result) => {
    console.log(`Added ${personName} number ${personNumber} in Phonebook`);
    mongoose.connection.close();
  });
}

Person.find({}).then((result) => {
  result.forEach((element) => {
    console.log(element.name, element.number);
  });
  mongoose.connection.close();
});
