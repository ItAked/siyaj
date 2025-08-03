import api from '../utils/api';
import { removeToken, setToken } from '../utils/auth';

export const login = async (data: FormData): Promise<boolean> => {
  try {
    const response = await api.post('/login', data);
    setToken(response.data.access_token);
    return true;
  } catch (error) {
    console.error('Login failed:', error);
    return false;
  }
};

export const logout = async () => {
    try {
        await api.post('/logout', {})
        removeToken();
    } catch (error) {
        console.error('logout failed:', error)
    }
};

export async function sendOtp(data: FormData){
  const response = await api.post('/confirm-email', data);
  return response.data
}

export async function verifyOtp(data: FormData){
  const response = await api.post('/verify-otp', data)
  return response.data
}

export async function newPassword(data: FormData){
  const response = await api.post('/new-password', data)
  return response.data
}