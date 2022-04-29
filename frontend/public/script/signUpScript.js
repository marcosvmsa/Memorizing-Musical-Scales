const validate = document.querySelectorAll('.validate');
const email = document.getElementById('email');
const password = document.getElementById('password');
const popupMessage = document.getElementById('popupMessage');
const submit = document.getElementById('submit');


submit.addEventListener('click',async (event)=>{
    event.preventDefault()
    const UserName = validate[0].value
    const validateEmail = validate[1].value
    const validatePassword = validate[2].value
    const validateimgAvatar = validate[3].value
    const {data} = await axios.post(`http://localhost:4000/SingUp/register/`, {
        UserName: UserName,    
        email: validateEmail, 
        password: validatePassword,
        validateimgAvatar: validateimgAvatar
    })
    if(data.successful){
        window.location.replace('/frontend/views/login.html')
    }else{
        popUp(`Erro na criacao do seu usuario`)
    }
})

function popUp (msg){
    popupWrapper.style.display = 'block';
    popupMessage.innerHTML = msg;
    closePopup.addEventListener('click', () => {
        popupWrapper.style.display = 'none';
    })
};