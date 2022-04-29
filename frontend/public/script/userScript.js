const movesOn = document.querySelector('.movesOn');
const boxNotes = document.getElementById('boxNotes');
const caption = document.getElementById('caption')
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const saveButt = document.querySelector('.saveButt');
const userId = sessionStorage.getItem('data');
let newDrop;


movesOn.addEventListener('click', (event)=>{
  event.preventDefault()
  const note = boxNotes.value
  axios.get(`http://localhost:4000/${note}`)
  .then(response => {addContante(response.data)})
})

function addContante (contente) {
  showContent.style.display = 'block';
  const harmonico = contente[0].harmonico 
  console.log(harmonico)
  for (const [key, value] of Object.entries(harmonico)) {
      const td = document.createElement('div')
      td.setAttribute("draggable", "true");
      td.setAttribute("ondragstart", "drag(event)");
      td.setAttribute("id", `drag${key}`);
      td.setAttribute('value', value)
      td.setAttribute("data-objeto",key,value)
      td.innerHTML = value
      div1.appendChild(td)  
    }
};
//--------Drag And Dop ---------------------------------------- 
function allowDrop(ev) {
    ev.preventDefault();
};
  
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
};

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const child = document.getElementById(data);
  child.setAttribute('class', 'newDrop');
  ev.target.appendChild(child);
  newDrop = document.querySelectorAll('.newDrop');  
};
//--------data base obej to insert ------------------------------------ 
saveButt.addEventListener('click',async (e)=>{
  e.preventDefault();
  const object = new Object();
  object.userId = userId;
  newDrop.forEach(element => {
    let chave = element.dataset.objeto
    let value = element.innerHTML
    object [chave] = value
  });
  const {data} = await axios.post(`http://localhost:4000/user/add`,object)
    if(data.successful){
        console.log(`successful`)
    }else{
        popUp(`Error : Data not saved`)
    };
});