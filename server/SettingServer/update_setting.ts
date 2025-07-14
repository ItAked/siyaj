import axios from "axios";

export async function updateSetting(data: { name: string|undefined; email: string|undefined; phone: string|undefined; }) {
    const response = await axios.put(`http://127.0.0.1:8000/api/update-setting`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

    

    return response
}