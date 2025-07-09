import axios from "axios";

export async function readUserCategories(page: number = 1){
    const params: Record<string, unknown> = {page};

    const response = await axios.get('http://127.0.0.1:8000/api/subscribe/showSubscribe', {params, headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})

    return response.data
}