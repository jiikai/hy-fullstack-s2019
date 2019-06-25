const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(`mongo.js :3 
  usage:
  - To print all entries: mongo.js <password>
  - To add a new entry: mongo.js <password> <name> <number>`
  );
  console.log(process.argv.length);
  console.log(process.argv)
  process.exit(1);
}

mongoose.connect(
  `mongodb+srv://jiikai-fullstack:${process.argv[2]}@devcluster0-gxqzh.mongodb.net/phonebook?retryWrites=true&w=majority`, 
  { useNewUrlParser: true }
).catch(error => console.log(error));


const PersonSchema = mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', PersonSchema);

if (process.argv.length === 3)
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  }).catch(error => {
    console.log(error);
  });
else {
  const newEntry = Person({
    name: process.argv[3],
    number: process.argv[4]
  });
  newEntry.save().then(res => {
    console.log(
      `Added ${newEntry.name} number ${newEntry.number} to phonebook`
    );
    mongoose.connection.close();
  }).catch(error => {
    console.log(error);
  });
}