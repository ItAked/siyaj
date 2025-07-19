import axios from "axios";

export async function updateSubscription(id: number, data: { name: string; price: number; }) {
    const response = await axios.put(`http://127.0.0.1:8000/api/update-subscription/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

    return response.data
}