const errorHandler = (error, request, response) => {


  if (error.message === 'notFound') {
    return response.status(404).send({ message: 'Person not found on DataBase' })
  }

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  //  console.log(error);
  //             response.status(500).json({ error: 'Failed to delete the person' });

  //response.status(400).send({ message: 'Error on server'});
  console.log('error message', error.message)
  console.log('error', error)

}
module.exports = errorHandler