import { useState, useEffect } from 'react'
import ServicePhonebook from './services/ServicePhonebook';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import { calculateFirstSpace } from './utils/Utils';
import Notification from './components/Notification/Notification';

const App = () => {  
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons ] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [notification, setNotification] = useState({message: null, type: 'ok'});

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
      ServicePhonebook.Delete(id)
      .then(response => {
        //console.log('response', response);
        const updatedPersons = persons.filter(p=>p.id !== id);
        setPersons(updatedPersons);
        setFilteredPersons(updatedPersons);
        setNotification({message: `Information of ${name} deleted from server`, type: 'ok'});
            setTimeout(() => {
              setNotification({message: null, type: 'ok'});
            }, 2500);    
        })
      .catch(error => {
            setNotification({message: `Information of ${name} has already been removed from server`, type: 'error'});
            setTimeout(() => {
              setNotification({message: null, type: 'ok'});
            }, 2500);
            const updatedPersons = persons.filter(p => p.id !== id);
            setPersons(updatedPersons);
            setFilteredPersons(updatedPersons);          
            setSearchTerm('');            
          });
      }
  }

  const handleSubmit = (event) => {
    event.preventDefault();     
    
    const newPerson = {      
      name: newName,
      number: newNumber
    };  
    
    const personAlreadyStored = persons.find(person => person.name === newName);
    const nameAlreadyExists = personAlreadyStored !== undefined;
    
    if (!nameAlreadyExists){
      ServicePhonebook.Create(newPerson).then(addedPerson => {                
        setPersons(persons.concat(addedPerson));
        setFilteredPersons(persons.concat(addedPerson));
        setSearchTerm('');
        setNotification({message: `Added ${addedPerson.name}`, type: 'ok'});
        setTimeout(() => {
          setNotification({message: null, type: 'ok'});
        }, 2500);
      })
    }else{
      const updateNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (updateNumber){
        //console.log('update number section')
        const personUpdatedNumber = {
          id: personAlreadyStored.id, name: personAlreadyStored.name, number: newNumber
        } 
        
        ServicePhonebook.Update(personUpdatedNumber, personUpdatedNumber.id)
          .then(addedPerson => {    
          const updatedPersons = persons.filter(p => p.id !== addedPerson.id).concat(addedPerson);
          setPersons(updatedPersons);
          setFilteredPersons(updatedPersons);          
          setSearchTerm('');
        })
          .catch(error => {
            setNotification({message: `Information of ${newName} has already been removed from server`, type: 'error'});
            setTimeout(() => {
              setNotification({message: null, type: 'ok'});
            }, 2500);
            const updatedPersons = persons.filter(p => p.id !== personUpdatedNumber.id);
            setPersons(updatedPersons);
            setFilteredPersons(updatedPersons);          
            setSearchTerm('');            
          });
      }
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={notification?.message} 
        type={notification?.type}
      />
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
