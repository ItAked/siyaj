import axios from "axios";

export async function deleteSubscriptions(id: number) {
    const response = await axios.delete(`http://127.0.0.1:8000/api/delete-subscription/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

    return response
}