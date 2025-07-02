import axios from "axios";

export async function updateAppointment(data: unknown, id:number) {
    const response = await axios.put(`http://127.0.0.1:8000/api/update-appointment/${id}`, data, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})

    return response.data
}