const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

const app = express();
app.use(express.static('build'))
app.use(cors());
morgan.token('post-body', (req, res) => 
  req.method === 'POST' ? JSON.stringify(req.body) : ' ');
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :post-body'));

app.use(bodyParser.json());
 
let persons = [
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      }
];

const getRandomInt = (min, max) => {
  let minCeil = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minCeil)) + minCeil;
}

const generateId = () => {
  let id;
  do
    id = getRandomInt(0, 1000000000);
  while (persons.find(person => person.id === id));
  return id;
}

const nameIsUnique = name => 
  !persons.find(person => 
    person.name.trim().toLowerCase()
        === name.trim().toLowerCase());

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

app.get('/info', (req, res) => {
  console.log(req);
  res.send(`
    <p>Phonebook currently has ${persons.length} entries.</p>
    <p>${new Date()}</p>
  `);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(person => 
    person.id === Number(req.params.id));
  if (person)
    res.json(person);
  else
    res.status(404).end();
});

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(person =>
    person.id !== Number(req.params.id));
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number)
    return res.status(400).json({ 
      error: `Missing field "${!body.name ? 'name' : 'number'}".`
    });
  else if (!nameIsUnique(body.name))
    return res.status(400).json({ 
      error: 'Value of "name" must be unique.'
    });
  persons = persons.concat({
    name: body.name, 
    number: body.number, 
    id: generateId()
  });
  res.json(persons[persons.length - 1]);
});
 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})