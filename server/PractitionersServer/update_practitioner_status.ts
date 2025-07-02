import axios from "axios";

export async function updatePractitionerStatus(id: number, status: string) {
    const response = await axios.put(`http://127.0.0.1:8000/api/practitioner/edit-status/${id}?status=${status}`, {},
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    return response.data.message
}