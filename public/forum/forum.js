import crud from "../utils/crud.js"
const messages = document.querySelector("#messages")
const input = document.querySelector("#input")
const postBtn = document.querySelector("#post-btn")

const user_id = 10;

const currentDate = new Date();
const formattedDate = currentDate.toISOString();


function updateFeed(){
  crud.getAll('/api/messages', {dataHandler : crud.generateHTML, columns : ['username','content']})
  .then((results)=>{
    messages.innerHTML = ""
    results.forEach((elem)=>{
      messages.appendChild(elem)
    })
    messages.scrollTop = messages.scrollHeight;
  });
}


function makePost(){
  const currentDate = new Date();
  const time_stamp = currentDate.toISOString();  
  const content = input.value
  input.value = ""
  crud.createOne('/api/messages',{content, time_stamp, user_id})
  .then(()=>{
    updateFeed();
  }
  )
}

setInterval(updateFeed, 500)
updateFeed() 
postBtn.addEventListener("click",makePost)