import axios from "axios"

export async function post (newUser: FormData) {
    for (const pair of Array.from(newUser.entries())) {
    console.log(pair[0]+ ', ' + pair[1]); 
}
    let data  = await axios.post(`http://127.0.0.1:8000/api/register`, newUser)

    localStorage.setItem('token', data.data.message.access_token)

    return 'تم إنشاء الحساب'
   
}