// /subscribe/{subscribe}

import axios from "axios";

export async function assignSubscription(form: FormData) {
    const data = Object.fromEntries(form.entries());
    console.log(data);
    
    const response = await axios.post(`http://127.0.0.1:8000/api/subscribe`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

    return response.data
}