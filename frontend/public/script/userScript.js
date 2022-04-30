const movesOn = document.querySelector('.movesOn');
const boxNotes = document.getElementById('boxNotes');
const selectProgress = document.getElementById('selectProgress');
const pregressName = document.getElementById('pregressName');
const caption = document.getElementById('caption')
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
const saveButt = document.querySelector('.saveButt');
const userId = sessionStorage.getItem('data');
let newDrop;


window.addEventListener('load', async() => {
  let {data} = await axios.get(`http://localhost:4000/user/${userId}`)
  try{
    data.progress.forEach(a => {
      const option = document.createElement('option')
      option.setAttribute("value", a.name);
      option.text = a.name
      selectProgress.appendChild(option) 
      })
    selectProgress.addEventListener('change',(event)=>{
      const test = data.progress.find(element => element.name === event.target.value)
      pregressName.value = test.name
      delete test.name
      addDropArea(test)
    })
  }catch{
    console.error
  }
})


movesOn.addEventListener('click', (event)=>{
  event.preventDefault()
  const note = boxNotes.value
  axios.get(`http://localhost:4000/${note}`)
  .then(response => {addContante(response.data)})
})


function addContante (contente) {
  showContent.style.display = 'block';
  const harmonico = contente[0].harmonico 
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
// -----------
function addDropArea (contente) {
  showContent.style.display = 'block';
  for (const [key, value] of Object.entries(contente)) {
      const td = document.createElement('div')
      td.setAttribute("draggable", "true");
      td.setAttribute("ondragstart", "drag(event)");
      td.setAttribute("id", `drag${key}`);
      td.setAttribute('value', value)
      td.setAttribute("data-objeto",key,value)
      td.innerHTML = value
      div2.appendChild(td)   
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
  let object = {
    userId: userId,
    keys: {
      name: pregressName.value.trim()
    }
  }

  newDrop.forEach(element => {
    let chave = element.dataset.objeto
    let value = element.innerHTML
    object.keys = ({...object.keys, [chave]: value})
  });

  const {data} = await axios.post(`http://localhost:4000/user/add`,object)
    if(data){
        document.getElementById('marcos').reset()
        let toaqui = document.querySelectorAll('.newDrop'); 
        for (el of toaqui){
          el.remove()
        }
    }else{
      console.log(data)
      console.error
        // popUp(`Error : Data not saved`)
    };
});