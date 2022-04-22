const movesOn = document.querySelector('.movesOn');
const majorMinor = document.getElementById('majorMinor');
const cordExte = document.getElementById('cordExte');
const boxNotes = document.getElementById('boxNotes');
const pgContent = document.getElementById('content');
const main = document.getElementById('main');
// const name = document.getElementById('name-edit').value


movesOn.addEventListener('click', (event)=>{
    event.preventDefault()
    // console.log(boxNotes.value)
    const note = boxNotes.value
    axios.get(`http://localhost:4000/${note}`)
    .then(response => {addContante(response.data)})
})


function addContante (contente) {
    // console.log(contente[0].harmonico)
    const aqui = contente[0].harmonico
    for (const [key, value] of Object.entries(aqui)) {
        console.log(`${key}: ${value}`)
    const contenteNode = document.createElement('div')
    contenteNode.setAttribute('class', 'noteContente')
    contenteNode.innerHTML= key
    contenteNode.innerHTML= value
    main.append(contenteNode)
    }
}




// editSubmit.addEventListener('click', (e) => {
//   // submits the put request to edit a gif
//   const name = document.getElementById('name-edit').value
//   const url = document.getElementById('url-edit').value

//   axios.put(`http://localhost:3000/gifs/${currentlyEditing}`, {
//     name,
//     url
//   }).then((resp) => {
//     console.log(resp)
//     addPictures(resp.data)
//     $('#modal-edit').modal('close')
//   })
// })









