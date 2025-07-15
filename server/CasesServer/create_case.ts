import axios from "axios";

export async function createCase(newCase: FormData) {
    const response = await axios.post('http://127.0.0.1:8000/api/create-case', newCase, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

    return response.data
}