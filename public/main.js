import crud from "./utils/crud.js"
const main = document.querySelector('main') 


crud.getAll('api/users', {columns:['username','email']})
  // .then((result)=>{
  //   for(let i of result){
  //     main.appendChild(i)
  //   }
  // })