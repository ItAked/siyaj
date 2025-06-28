import axios from "axios"

export async function getPractitioners (status: string) {    
    let response = null;
    if (status != '') {
        response = await axios.get(`http://127.0.0.1:8000/api/practitioners?status=${status}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    } else {
        response = await axios.get('http://127.0.0.1:8000/api/practitioners', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    }
    
    return response
}