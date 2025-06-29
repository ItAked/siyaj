import axios from "axios";

export async function deleteFeature(id: number) {
    const response = await axios.delete(`http://127.0.0.1:8000/api/remove-feature/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    return response
}