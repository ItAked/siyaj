import axios from "axios"

export async function getPractitioners (status? :string, search?: string, page: number = 1) {
    const params: Record<string, unknown> = {page};

    if(status) params.status = status
    if(search) params.search = search

    const response = await axios.get('http://127.0.0.1:8000/api/practitioners', { params, headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    
    return response
}