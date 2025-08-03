import api from "../src/utils/api";
import { removeToken, setToken } from "../src/utils/auth";

export async function login (user:FormData) {
    try {
        const data = await api.post('/login', user);
        const token = data.data.message.access_token;
        if (token) {
            const pipeIndex = token.indexOf('|');
            const tokenSubstring = token.substring(pipeIndex + 1)
            setToken(tokenSubstring);
        }
        return data.data
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export async function logout() {
    try {
        const response = await api.post('/logout',{})
        removeToken()
        return response
    } catch (error) {
        console.error('logout failed: ', error)
    }
}

export async function signup (newUser: FormData) {
    const data  = await api.post(`/register`, newUser)
    const token = data.data.message.access_token;
    if (token) {
        const pipeIndex = token.indexOf('|');
        const tokenSubstring = token.substring(pipeIndex + 1)
        setToken(tokenSubstring);
    }
    return data.data
}