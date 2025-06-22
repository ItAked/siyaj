import axios from "axios"

export async function get () {
    const response = await axios.get('http://127.0.0.1:8000/api/lawyers', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})

    console.log(response.data.data);
    

    return response
}