import axios from "axios";

export async function get() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return
        }

        const response = await axios.get('http://127.0.0.1:8000/api/checkToken', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}