import axios from "axios"

export async function get () {
    const response = await axios.get('http://127.0.0.1:8000/api/cases/status', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})

    return response
}