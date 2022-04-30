const movesOn = document.querySelector('.movesOn');
const saveButt = document.querySelector('.saveButt');
const editButt = document.querySelector('.editButt');
const deletButt = document.querySelector('.deletButt');
const boxNotes = document.getElementById('boxNotes');
const selectProgress = document.getElementById('selectProgress');
const pregressName = document.getElementById('pregressName');
const div1 = document.getElementById('div1');
const div2 = document.getElementById('div2');
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
      const findName = data.progress.find(element => element.name === event.target.value)
      pregressName.value = findName.name
      delete findName.name
      addDropArea(findName)
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
      td.setAttribute('value', value);
      td.setAttribute("class","cleanFild");
      td.setAttribute("data-objeto",key,value);
      td.innerHTML = value;
      div2.appendChild(td);
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
  child.setAttribute('class', 'newDrop cleanFild');
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
        document.getElementById('formeDragDrop').reset()
        let cleanFild = document.querySelectorAll("[ondragstart]");
        for (element of cleanFild){
          element.remove()
        }
    }else{
      console.error
    };
});

editButt.addEventListener('click', async (event)=>{
  event.preventDefault()
    let id = userId
    let name =  selectProgress.value
    
    let object = {
      userId: userId,
      keys: {
        name: pregressName.value.trim()
      }
    }

    for(let i = 0; i < div2.childNodes.length; i++){
      let chave = div2.children[i].dataset.objeto
      let value = div2.children[i].innerHTML
      object.keys = ({...object.keys, [chave]: value})
    }

  const {delet} = await axios.put(`http://localhost:4000/user/${id}/${name}`, object)
    if(delet){
      document.getElementById('formeDragDrop').reset()
        let cleanFild = document.querySelectorAll("[ondragstart]");
        for (element of cleanFild){
          element.remove()
        }
    }else{
      console.error
    }

})

deletButt.addEventListener('click', async (event)=>{
  event.preventDefault()
    let id = userId
    let name =  pregressName.value.trim()
  const {delet} = await axios.delete(`http://localhost:4000/user/${id}/${name}`)
        cleanWindows()
  if(delet){
      cleanWindows()
      
        // document.getElementById('formeDragDrop').reset()
        // let cleanFild = document.querySelectorAll("[ondragstart]");
        // for (element of cleanFild){
        //   element.remove()
        // }
    }else{
      console.error
    }
})

function cleanWindows (){
  document.getElementById('formeDragDrop').reset()
  let cleanFild = document.querySelectorAll("[ondragstart]");
  for (element of cleanFild){
    element.remove()
  }
}
