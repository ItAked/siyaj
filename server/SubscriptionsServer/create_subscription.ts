import axios from "axios";

export async function createSubscriptions(data: { name: string; type: string; price: string; features: number[]; }) {
    const response = await axios.post('http://127.0.0.1:8000/api/create-subscription', data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

    return response.data.data
}