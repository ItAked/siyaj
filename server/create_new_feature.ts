import axios from "axios";

export async function CreateFeature(data: FormData) {
    const response = await axios.post('http://127.0.0.1:8000/api/create-feature', data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    return response.data
}