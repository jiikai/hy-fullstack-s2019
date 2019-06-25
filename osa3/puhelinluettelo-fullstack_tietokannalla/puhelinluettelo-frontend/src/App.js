import React, {useState, useEffect} from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Notification from './components/Notification';
import TrackedInput from './components/TrackedInput';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]),
    [newName, setNewName] = useState(''),
    [newNumber, setNewNumber] = useState(''),
    [filterText, setFilterText] = useState(''),
    [appMessage, setAppMessage] = useState(''),
    [appMessageType, setAppMessageType] = useState('');

  const includesTrimmedCaseless = (str1, str2) =>
    str1.trim().toLowerCase().includes(str2.trim().toLowerCase());

  const displayAppMessage = (type, msg, timeout = 5000) => {
    setAppMessageType(type);
    setAppMessage(msg);
    setTimeout(() => {
      setAppMessage(null);
    }, timeout);
  };

  const addEntry = (name, number) => {
    personsService.create({name, number})
      .then(data => {
        setPersons(persons.concat({...data,
          visible: includesTrimmedCaseless(name, filterText)}));
        displayAppMessage('success', `Added ${name} with number ${number}.`);
      }).catch(error => {
        console.log(error.response );
        displayAppMessage('error', error.response.data.error);
      });
  };

  const updateEntry = updatedEntry =>
    personsService.update(updatedEntry.id, updatedEntry)
      .then(() => {
        setPersons(persons.map(person =>
          person.id === updatedEntry.id ? {...updatedEntry} : person));
        displayAppMessage('success',
          `Updated ${updatedEntry.name}'s number to ${updatedEntry.number}.`);
      }).catch(error => {
        console.log(error.response);
        displayAppMessage('error', error.response.data.error);
        if (error.response.status === 404)
          setPersons(persons.filter(person =>
            person.id !== updatedEntry.id));
      });

  const deleteEntry = name => {
    if (window.confirm(`Delete ${name}?`)) {
      const id = persons.find(person => person.name === name).id;
      personsService.destroy(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          displayAppMessage('success',
            `Successfully removed the entry for ${name}.`);
        })
        .catch(error => {
          console.log(error);
          displayAppMessage('error',
            `Entry for '${name}' was already removed from the server.`);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  useEffect(() => {
    personsService
      .getAll()
      .then(ret => {
        setPersons(ret.map(person => ({...person, visible: true})));
      });
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={appMessage} type={appMessageType} />
      <TrackedInput textBefore="Filter: " textAfter=""
        expr={filterText} onChange={event => {
          const expr = event.target.value;
          setFilterText(expr);
          setPersons(persons.map(person => ({...person,
            visible: includesTrimmedCaseless(person.name, expr)
          })));}
        }
      />
      <h2>Add new</h2>
      <EntryForm keyField={newName} valueField={newNumber}
        handlers={{
          key: event => setNewName(event.target.value),
          value: event => setNewNumber(event.target.value),
          submit: (event) => {
            event.preventDefault();
            const found = persons.find(person =>
              person.name.toLowerCase() === newName.toLowerCase());
            if (!found)
              addEntry(newName, newNumber);
            else if (window.confirm(`Replace ${newName}'s old number?`))
              updateEntry({...found, number: newNumber});
            setNewName('');
            setNewNumber('');
          }
        }}
      />
      <h2>Numbers</h2>
      <EntryList entries={persons} keyField="name" valueField="number"
        filterField="visible" delHandler={deleteEntry} />
    </div>
  );
};

export default App;