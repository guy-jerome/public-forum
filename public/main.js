import crud from "./utils/crud.js"
const main = document.querySelector('main') 


crud.getAll('api/users', {dataHandler : crud.generateHTML, columns : ['username','email'], divClassName : "user-container"})
  .then((result)=>{
    for(let i of result){
      main.appendChild(i)
    }
  })

crud.getOne('api/messages',2)