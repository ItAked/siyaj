import axios from "axios"

export async function post(id: number, data: { cases: number[], is_checked: boolean }) {
    const response = await axios.post(
        `http://127.0.0.1:8000/api/assign-case/${id}`,
        data, // Send as object with 'cases' key
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response;
}