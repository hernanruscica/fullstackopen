//console.log('hello world 2')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT | 3000;
const fs = require('fs');
//const dataURL = './data.json';
//let persons = require(dataURL);
const PersonModel = require('./models/person');
const errorHandler = require('./middlewares/errorHandler');

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
app.use(express.static('dist'))


app.get('/api/persons', (request, response, next) => {         
    PersonModel.find().then(results => {
        response.json(results);
    }).catch(error => next(error));    
});

app.get('/api/info', (request, response) => {
    const requestDate = new Date();
    PersonModel.find().then(results => {        
        response.send(`Phonebook has info for ${results.length} persons at ${requestDate}`);
    }).catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    PersonModel.findById(id).then(person => {
        if (person) {
            response.status(200).json(person);
        } else {
            throw new Error('notFound');
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    PersonModel.findById(id).then(result => {
        if (result) {
            PersonModel.deleteOne({ _id: id }).then(() => {
                response.status(204).end();
            }).catch(error => next(error));
        }else {
            throw new Error('notFound');
        }}).catch(error => next(error));   
});

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;
    const { name, number } = request.body;
    
    if (!name || !number) {
        return response.status(400).json({ error: 'name or number is missing' });
    }

    PersonModel.findById(id).then(person => {
        if (!person) {
            throw new Error('notFound');
        }

        person.name = name;
        person.number = number;
        
        person.save().then(updatedPerson => {
            response.status(200).json(updatedPerson);
        }).catch(error => next(error));

    }).catch(error => next(error));    
});

app.post('/api/persons', (request, response, next) => {
    const {name, number} = request.body;   
    
    if (name === '' || number === ''){
        return response.status(400).json({success: false, message: "The name or number is missing"})
    }
    
    PersonModel.find().then(results => {        
        const personAlreadyStored = results.find(p => p.name === name)
        const nameIsUnique =  personAlreadyStored?.name == undefined;
        if (!nameIsUnique){
            //console.log(personAlreadyStored);
            personAlreadyStored.number = number;
            personAlreadyStored.save().then(updatedPerson => {                
                return response.status(200).json(
                    {success: true, 
                        message: 'The name already exists in the phonebook, the number has been updated',
                        person: updatedPerson });
                    }
                    ).catch(error => next(error));
        } else {
            const newPerson = new PersonModel({        
                name: name,
                number: number
            });
    
            newPerson.save().then(savedPerson => {
                return response.status(201).json(savedPerson);
            }).catch(error => next(error));
        }

    }).catch(error => next(error));    

})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
