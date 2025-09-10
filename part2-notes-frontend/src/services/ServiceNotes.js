import axios from "axios";
const baseUrl = 'http://localhost:3001/notes'

const Create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const GetAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const Update = (newObject, id) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

export default {
    Create,
    GetAll,
    Update
}