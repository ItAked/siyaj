import axios from "axios"

// export async function post (id: number, cases: number[]) {
//     const response = await axios.post(`http://127.0.0.1:8000/api/assign-case/${id}`,cases ,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})

//     return response
// }

export async function post(id: number, data: { cases: string[] }) {
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