import { useState, useEffect } from 'react'
import ServicePhonebook from './services/ServicePhonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { calculateFirstSpace } from './utils/Utils';

const App = () => {  
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons ] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {  
    ServicePhonebook.GetAll().then((persons) => {
      setPersons(persons);
      setFilteredPersons(persons);
    })
    
  }, []);

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
    //console.log(event.target.value);
    setSearchTerm(event.target.value);       
    const filteredPersons = persons.filter(person => person.name.includes(event.target.value));
    //console.log(filteredPersons);
    setFilteredPersons(filteredPersons);
    
  };

  const handleDelete = (event) => {
    const {id, name} = event.target 
    //console.log(`click on delete - id: ${id}`);
    const confirmDelete = window.confirm(`Delete ${name} ?`)
    if (confirmDelete){
      ServicePhonebook.Delete(id).then(deletedPerson => {
        //console.log('deletedPerson', deletedPerson);
        const updatedPersons = persons.filter(p=>p.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);      
        });
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();  
    //prevents duplicate ids.
    let nextAvailableId = calculateFirstSpace(persons.map(p=>p.id));
    const newPerson = {
      id: String(nextAvailableId),
      name: newName,
      number: newNumber
    };  
    const personAlreadyStored = persons.find(person => person.name === newName);
    //console.log(personAlreadyStored);
    
    const nameAlreadyExists = personAlreadyStored !== undefined;
    
    if (!nameAlreadyExists){
      ServicePhonebook.Create(newPerson).then(addedPerson => {                
        setPersons(persons.concat(addedPerson));
        setFilteredPersons(persons.concat(addedPerson));
        setSearchTerm('');
      })
    }else{
      const updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (updateNumber){
        //console.log('update number section')
        const personUpdatedNumber = {
          id: personAlreadyStored.id, name: personAlreadyStored.name, number: newNumber
        }
        // console.log('personUpdatedNumber', personUpdatedNumber);
        // console.log('id', personUpdatedNumber.id);
        
        
        ServicePhonebook.Update(personUpdatedNumber, personUpdatedNumber.id).then(addedPerson => {
          // setPersons(persons.concat(addedPerson));
          // setFilteredPersons(persons.concat(addedPerson));
          console.log('addedPerson', addedPerson);
          const updatedPersons = persons.filter(p => p.id !== addedPerson.id).concat(addedPerson);
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons);          
          setSearchTerm('');
        })
      }
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
      <Persons list={filteredPersons} onClick={handleDelete}/>      
    </div>
  )
}

export default App
