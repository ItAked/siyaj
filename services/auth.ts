import api from '../utils/api';
import { removeToken, setToken } from '../utils/auth';

export const login = async (data: FormData): Promise<boolean> => {
  try {
    const response = await api.post('/login', data);
    setToken(response.data.message.access_token);
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