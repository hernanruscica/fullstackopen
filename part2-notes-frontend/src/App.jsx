import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      id: persons.length + 1,
      name: newName,
    };
    setPersons(persons.concat(newPerson));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person=><p key={person.id}>{person.name}</p>)
      }
    </div>
  )
}

export default App