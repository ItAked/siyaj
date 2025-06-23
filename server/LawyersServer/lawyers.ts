import axios from "axios"

export async function get (filter: string) {
    let response = null
    if (filter != '') {
        response = await axios.get(`http://127.0.0.1:8000/api/lawyers?filter=${filter}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})    
    } else {
        response = await axios.get('http://127.0.0.1:8000/api/lawyers', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})    
    }

    return response
}