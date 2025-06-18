import axios from "axios";

export async function post(data: unknown) {
    const response = await axios.post('http://127.0.0.1:8000/api/create-appointment', data, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})

    return response.data
}