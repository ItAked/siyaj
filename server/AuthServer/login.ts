import axios from "axios";

export async function post (user:FormData) {
    const data = await axios.post('http://127.0.0.1:8000/api/login', user);

    console.log(data.data);
    

    const token = data.data.message.access_token;
    const pipeIndex = token.indexOf('|');
    const tokenSubstring = token.substring(pipeIndex + 1)

    localStorage.setItem('token', tokenSubstring)
    
    return data.data.message.role
}