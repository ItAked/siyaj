import api from "../src/utils/api";
import { removeToken, setToken } from "../src/utils/auth";

export async function login (user:FormData) {
    const data = await api.post('/login', user);
    // const token = data.data.access_token;
    // if (token) {
    //     const pipeIndex = token.indexOf('|');
    //     const tokenSubstring = token.substring(pipeIndex + 1)
    //     setToken(tokenSubstring);
    // }
    return data.data
}

export async function logout() {
    const response = await api.post('/logout',{})
    removeToken()
    return response
}

export async function signup (newUser: FormData) {
    const data  = await api.post(`/register`, newUser)
    const token = data.data.access_token;
    if (token) {
        const pipeIndex = token.indexOf('|');
        const tokenSubstring = token.substring(pipeIndex + 1)
        setToken(tokenSubstring);
    }
    return data.data
}

export async function sendOtp(data: FormData){
  const response = await api.post('/confirm-email', data);
  return response.data
}

export async function verifyOtp(data: FormData){
  const response = await api.post('/verify-otp', data)
  return response.data
}

export async function loginGoogleAuth() {
    window.location.href = window.location.href = 'https://dev.siyaj.sa/auth/google/redirect';
}

export async function verifyOtpLogin(data: FormData) {
    const response = await api.post('/verify-otp-login', data)
    const token = response.data.access_token;
    if (token) {
        const pipeIndex = token.indexOf('|');
        const tokenSubstring = token.substring(pipeIndex + 1)
        setToken(tokenSubstring);
    }
    return response.data
}