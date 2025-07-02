import axios from "axios"

export async function get(search?: string, page: number = 1) {
    const params: Record<string, unknown> = {page};

    if (search) params.search = search;
    
    const response = await axios.get('http://127.0.0.1:8000/api/lawyers', { params, headers:{Authorization:`Bearer ${localStorage.getItem('token')}`} });

    return response;
}