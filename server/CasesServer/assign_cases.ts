import axios from "axios"

export async function assignCases(id: number, data: { cases: number[], is_checked: boolean }) {
    const response = await axios.post(
        `http://127.0.0.1:8000/api/assign-case/${id}`,
        data,
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response;
}