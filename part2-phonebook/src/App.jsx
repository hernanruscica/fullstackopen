import { useState } from 'react'

const personsSeed = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]

const App = () => {
  
  const [persons, setPersons] = useState(personsSeed);
  const [filteredPersons, setFilteredPersons ] = useState(personsSeed);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  }

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const handleChangeSearchTerm = (event) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);       
    const filteredPersons = persons.filter(person => person.name.includes(event.target.value));
    console.log(filteredPersons);
    setFilteredPersons(filteredPersons);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    };  
    const personNames = persons.map(person => person.name);
    //console.log(personNames);
    
    const nameAlreadyExists = personNames.filter(pName => pName == newName).length > 0;
    //console.log('person already exists?', nameAlreadyExists);
    if (!nameAlreadyExists){
      const newPersonsArray = persons.concat(newPerson)
      setPersons(newPersonsArray);
      setFilteredPersons(newPersonsArray)
      setSearchTerm('');
    }else{
      alert(`${newName} is already added to phonebook`);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with:
        <input type="text" 
              value={searchTerm}
              onChange={handleChangeSearchTerm}/>
      </div>
      <form onSubmit={handleSubmit}>     
        <h2>add new</h2> 
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {        
        filteredPersons.map(person=><p key={person.id}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default App