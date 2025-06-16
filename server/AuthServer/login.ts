import axios from "axios";

export async function post (user:FormData) {
    const data = await axios.post('http://127.0.0.1:8000/api/login', user)

    localStorage.setItem('token', data.data.message.access_token)

    return 'مرحبا بك من جديد'
}