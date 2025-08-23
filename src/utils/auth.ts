import Cookies from 'js-cookie';

// Save token to cookie
export const setToken = (token: string, expiresIn: number = 24 * 60 * 60) => {
  Cookies.set('authToken', token, { 
    expires: expiresIn / 86400,
    secure: true,
    sameSite: 'lax'
  });
};

// Get token from cookie
export const getToken = (): string | undefined => {
  return Cookies.get('authToken');
};

// Remove token on logout
export const removeToken = () => {
  Cookies.remove('authToken');
  Cookies.remove('role')
};

export const setRole = (role: string) => {
  Cookies.set('role', role)
}

export const getRole = (): string | undefined => {
  return Cookies.get('role')
}