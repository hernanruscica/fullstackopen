//console.log('hello world 2')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 3000;
const fs = require('fs');
const dataURL = './data.json';
let persons = require(dataURL);

const saveData = (fileURL, data) => {
    fs.writeFileSync(fileURL, JSON.stringify(data, null, 2));
    return true;
}

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());
app.use(express.json());


app.get('/api/persons', (request, response) => {      
    response.json(persons);
});
app.get('/api/info', (request, response) => {
    const requestDate = new Date();
    response.send(`Phonebook has info for ${persons.length} people<br> ${requestDate}`);
});
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);
    if (person){
        response.send(person);
    }
});
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const personExists = persons.some(p => p.id === id);

    if (!personExists) {
        return response.status(404).json({status: false, message: 'Person not found' });
    }

    persons = persons.filter(p => p.id !== id);    
    const success = saveData(dataURL, persons);

    if (success){
        response.status(204).end();
    }
});

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const { name, number } = request.body;
    
    if (!name || !number) {
        return response.status(400).json({ error: 'name or number is missing' });
    }

    const personIndex = persons.findIndex(p => p.id === id);

    if (personIndex === -1) {
        return response.status(404).json({ error: 'Person not found' });
    }

    const updatedPerson = { ...persons[personIndex], name, number };
    persons[personIndex] = updatedPerson;    
    const success = saveData(dataURL, persons);
    if (success) {
        response.status(200).json(updatedPerson);
    }

});

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body;    
    const nameIsUnique = persons.find(p => p.name === name) == undefined;    

    if (name === '' || number === ''){
        return response.status(400).json({success: false, message: "The name or number is missing"})
    }
    if (!nameIsUnique){
        return response.status(409).json({success: false, message: 'The name already exists in the phonebook, and names must be unique'});
    }
    const nowString = Date.now().toString();
    const randomIdString = Math.floor(Math.random() * 256).toString()

    
    const newPerson = {
        id: nowString + randomIdString,
        name: name,
        number: number
    }
    const updatedPersons = persons.concat(newPerson);

    const success = saveData(dataURL, updatedPersons);
    if (success) {
        response.status(200).json(newPerson);
    }

    
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
