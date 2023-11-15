import crud from "../utils/crud.js"
const messages = document.querySelector("#messages")


crud.getAll('/api/messages', {dataHandler : crud.generateHTML})
  .then((results)=>{
    results.forEach((elem)=>{
      messages.appendChild(elem)
    })
    messages.scrollTop = messages.scrollHeight;
  });