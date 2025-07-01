import axios from "axios";

export async function readNotifications() {
    const response = await axios.get('http://127.0.0.1:8000/api/notifications', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    return response
}