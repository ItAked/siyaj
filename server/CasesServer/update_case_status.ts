import axios from "axios"

export async function updateCaseStatus(id: number, data: { status: string }) {
    const response = await axios.put(
        `http://127.0.0.1:8000/api/update-case-status/${id}`,
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