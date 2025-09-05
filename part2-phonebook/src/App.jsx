import { useState } from 'react'

const personsSeed = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ];

const Filter = ({value, onChange}) => {
  return (
    <div>filter shown with:
      <input type="text" 
            value={value}
            onChange={onChange}/>
    </div>
  )
}

const PersonForm = ({title ='Form Title', onSubmit, inputs, btnText}) => {
  return (
    <form onSubmit={onSubmit}>     
        <h3>{title}</h3> 
        { (inputs.length) > 0 ?
          inputs.map(input=>(
            <div key={input.id}>
              {input.name}: <input key={input.id} value={input.value} onChange={input.onChange}/>
            </div>
          ))
          : 'There isnt any input to show'
        }        
        <div>
          <button type="submit">{btnText}</button>
        </div>
      </form>
  )
}

const Persons = ({list}) => {
  return(
    <>
    {        
      list.map(item=><p key={item.id}>{item.name} {item.number}</p>)
    }
    </>
  )
}

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

  const formInputs = [
    {id: 1, name: "name", onChange: handleChangeName},
    {id: 2, name: "number", onChange: handleChangeNumber},
  ];

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
      <Filter 
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />      
      <PersonForm 
        title='add new'
        inputs={formInputs}
        onSubmit={handleSubmit}
        btnText='save'
      />      

      <h3>Numbers</h3>
      <Persons list={filteredPersons}/>      
    </div>
  )
}

export default App