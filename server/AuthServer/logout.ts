import axios from "axios";

export async function logout() {
    const response = await axios.post(
        'http://127.0.0.1:8000/api/logout',
        {},
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
    )

    localStorage.removeItem('token')

    return response
}