const email = document.getElementById('email');
const password = document.getElementById('password');
const erroMessag = document.getElementById('erroMessag');
const submit = document.getElementById('submit');
let validMail = false;


submit.addEventListener('click',async (event)=>{
    event.preventDefault()
    const validateEmail = email.value
    const validatePassword = password.value
    const {data} = await axios.post(`http://localhost:4000/login/`, {email: validateEmail, password: validatePassword})
    console.log(data.userId)
    if(data.token){
        sessionStorage.setItem('data', data.userId)
        window.location.replace('/frontend/views/user.html', data.userId)
    }else{
        erroMessag.innerHTML = `Invalid password or username`
    }
})
