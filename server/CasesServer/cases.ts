import axios from "axios"

export async function getCases (status: string) {
    console.log(status);
    
    let response = null;
    if (status != '') {
        response = await axios.get(`http://127.0.0.1:8000/api/cases?status=${status}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    } else {
        response = await axios.get('http://127.0.0.1:8000/api/cases', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    }
    
    return response
}