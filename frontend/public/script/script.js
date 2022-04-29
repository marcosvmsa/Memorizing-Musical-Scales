const movesOn = document.querySelector('.movesOn');
const boxNotes = document.getElementById('boxNotes');
const caption = document.getElementById('caption')
const nameTr = document.getElementById('nameTr');
const showContent = document.getElementById('showContent');

movesOn.addEventListener('click', (event)=>{
    event.preventDefault()
    const note = boxNotes.value
    console.log(boxNotes)
    axios.get(`http://localhost:4000/${note}`)
    .then(response => {addContante(response.data)})
})

function addContante (contente) {
    showContent.style.display = 'block';
    caption.innerHTML = `Note : ${contente[0].note}`
    const harmonico = contente[0].harmonico
    for (const [key, value] of Object.entries(harmonico)) {
        const td = document.createElement('td')
        td.innerHTML= value
        nameTr.appendChild(td)
    }
};