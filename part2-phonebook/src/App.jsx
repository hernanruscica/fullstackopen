import { useState, useEffect } from 'react'
import ServicePhonebook from './services/ServicePhonebook';



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

 const Filter = ({value, onChange}) => {
  return (
    <div>filter shown with:
      <input type="text" 
            value={value}
            onChange={onChange}/>
    </div>
  )
}

 const calculateFirstSpace = (array) => {
    // This function finds the first available integer ID.
    // The original implementation had an infinite loop and incorrect logic.
    const ids = array.map(id => Number(id)).sort((a, b) => a - b);
    
    let expectedId = 1;
    for (const id of ids) {
      if (id > expectedId) {
        return expectedId;
      }
      if (id === expectedId) {
        expectedId++;
      }
    }
    return expectedId;
  }

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
    console.log(personAlreadyStored);
    
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
        console.log('update number section')
        const personUpdatedNumber = {
          id: personAlreadyStored.id, name: personAlreadyStored.name, number: newNumber
        }
        console.log('personUpdatedNumber', personUpdatedNumber);
        console.log('id', personUpdatedNumber.id);
        
        
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

 

const Persons = ({list}) => {

  const handleDelete = (event) => {
  const {id, name} = event.target 
  //console.log(`click on delete - id: ${id}`);
  const confirmDelete = window.confirm(`Delete ${name} ?`)
  if (confirmDelete){
    ServicePhonebook.Delete(id).then(deletedPerson => {
      //console.log('deletedPerson', deletedPerson);
      const updatedPersons = list.filter(p=>p.id !== id);
      setPersons(updatedPersons);
      setFilteredPersons(updatedPersons);      
    })
  }
}
  return(
    <>
    {        
      list.map(item=><p key={item.id}>
        {item.name} {item.number}
        <button onClick={handleDelete} id={item.id} name={item.name}>delete</button>
      </p>)
    }
    </>
  )
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
      <Persons list={filteredPersons} />      
    </div>
  )
}

export default App
