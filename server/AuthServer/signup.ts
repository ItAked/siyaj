import axios from "axios"

export async function signup (newUser: FormData) {
    const data  = await axios.post(`http://127.0.0.1:8000/api/register`, newUser)

    const token = data.data.message.access_token;
    if (token) {
        const pipeIndex = token.indexOf('|');
        const tokenSubstring = token.substring(pipeIndex + 1)
    
        localStorage.setItem('token', tokenSubstring)
    }

    return data.data
}