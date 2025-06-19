import axios from "axios"

export async function getPractitioners () {
    const response = await axios.get('http://127.0.0.1:8000/api/practitioners', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})

    return response
}