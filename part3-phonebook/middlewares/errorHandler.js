const errorHandler = (error, request, response, next) => {
    

    if (error.message === 'notFound') {
        return response.status(404).send({ message: 'Person not found on DataBase'});
    }

    //  console.log(error);
    //             response.status(500).json({ error: 'Failed to delete the person' });

    //response.status(400).send({ message: 'Error on server'});
    console.log('error message', error.message);    
    console.log('error', error);
    
}
module.exports = errorHandler;