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


app.get('/api/persons', (request, response) => {      
    //response.json(persons);
    PersonModel.find().then(results => {
        response.json(results);
    });
});

app.get('/api/info', (request, response) => {
    const requestDate = new Date();
    PersonModel.find().then(results => {        
        response.send(`Phonebook has info for ${results.length} persons at ${requestDate}`);
    });
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    PersonModel.findById(id).then(person => {
        if (person) {
            response.status(200).json(person);
        } else {
            response.status(404).end();
        }
    }).catch(error => {
        console.log(error);
        response.status(400).send({ error: 'malformatted id' });
    });   
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    PersonModel.findById(id).then(result => {
        if (result) {
            PersonModel.deleteOne({ _id: id }).then(() => {
                response.status(204).end();
            }).catch(error => {
                console.log(error);
                response.status(500).json({ error: 'Failed to delete the person' });
            });            
        } else {
            response.status(404).json({ status: false, message: 'Person not found' });
        }
    }).catch(error => {
        console.log(error);
        response.status(400).send({ error: 'malformatted id' });
    });    
   
});

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const { name, number } = request.body;
    
    if (!name || !number) {
        return response.status(400).json({ error: 'name or number is missing' });
    }

    PersonModel.findById(id).then(person => {
        if (!person) {
            return response.status(404).json({ error: 'Person not found' });
        }

        person.name = name;
        person.number = number;
        
        person.save().then(updatedPerson => {
            response.status(200).json(updatedPerson);
        }).catch(error => {
            console.log(error);
            response.status(500).json({ error: 'Failed to update the person' });
        });

    }).catch(error => {
        console.log(error);
        response.status(400).send({ error: 'malformatted id' });
    });    
});

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body;   
    
    if (name === '' || number === ''){
        return response.status(400).json({success: false, message: "The name or number is missing"})
    }
    
    PersonModel.find().then(results => {        
        const nameIsUnique = results.find(p => p.name === name) == undefined;
        if (!nameIsUnique){
            return response.status(409).json({success: false, message: 'The name already exists in the phonebook, and names must be unique'});
        }   

        const newPerson = new PersonModel({        
            name: name,
            number: number
        });

        newPerson.save().then(savedPerson => {
            response.status(201).json(savedPerson);
        }).catch(error => {
            console.log(error);
            response.status(500).json({ error: 'Failed to save the person' });
        });

    }).catch(error => {
        console.log(error);
        response.status(500).json({ error: 'Failed to fetch persons' });
    });

    

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
