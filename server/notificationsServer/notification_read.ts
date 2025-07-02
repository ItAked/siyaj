import axios from "axios";

export async function updateNotification(id: string) {
    const response = await axios.put(`http://127.0.0.1:8000/api/notification/read/${id}`, {}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    return response
}