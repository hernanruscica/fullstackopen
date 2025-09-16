 const calculateFirstSpace = (array) => {
    // This function finds the first available integer ID.    
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

  export { calculateFirstSpace };