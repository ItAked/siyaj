import axios from "axios";

export async function readPractitionerId(id: number) {
    const response = await axios.get(`http://127.0.0.1:8000/api/practitioner/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    return response.data
}