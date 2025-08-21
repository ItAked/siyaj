import api from '../utils/api';
import { removeToken, setToken } from '../utils/auth';

export const login = async (data: FormData): Promise<boolean> => {
  const response = await api.post('/login', data);
  return response.data;
};

export const logout = async () => {
  await api.post('/logout', {})
  removeToken();
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

export async function verifyOtpLogin(data: FormData){
  const response = await api.post('/verify-otp-login', data)
  setToken(response.data.access_token);
  return response.data
}