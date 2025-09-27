import axios from "axios";

const baseUrl = import.meta.env.VITE_ENDPOINT_BASEURL;
const endpointUrl = `${baseUrl}`;

const Create = (newObject) => {
    const request = axios.post(endpointUrl, newObject);
    return request.then(response => response.data);
}

const GetAll = () => {
    const request = axios.get(endpointUrl);
    return request.then(response => response.data);
}

const Update = (newObject, id) => {
    const request = axios.put(`${endpointUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

const Delete = (id) => {
    const request = axios.delete(`${endpointUrl}/${id}`);
    return request.then(response => response.data);
}

export default {
    Create,
    GetAll,
    Update,
    Delete
}