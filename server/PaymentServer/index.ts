import axios from 'axios';

export async function getPayments(page: number = 1) {
    const params: Record<string, unknown> = {page};
    console.log(params);
    
    const response = await axios.get('https://api.moyasar.com/v1/payments', {params, headers: {Authorization: 'Basic c2tfdGVzdF9UUFNGUmVRVnl5a0xVMkd6VXc3djhhOERKMktuWXZVVEZWNHNhZmduOiIi'}})
    
    return response.data;
}