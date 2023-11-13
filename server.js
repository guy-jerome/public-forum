import express from "express"
import pool from "./db.js"


const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(express.static("public"))

//GET ALL
app.get('/api/messages', async (req,res,next)=>{
  const client = await pool.connect()
  try{
    const query = await client.query('SELECT * FROM messages;')
    res.status(200).json(query.rows)
  }catch (err){
    next(err)
  }finally{
    client.release()
  }
})
//GET ONE
app.get('/api/messages/:id', async (req,res,next)=>{
  const {id} = req.params
  const client = await pool.connect()
  try{
    const query = await client.query('SELECT * FROM messages WHERE id=$1;',[id])
    res.status(200).json(query.rows)
  }catch (err){
    next(err)
  }finally{
    client.release()
  }
})
//ADD ONE
app.post('/api/messages', async (req,res,next)=>{
  const {content, time_stamp, user_id} = req.body
  const client = await pool.connect()
  try{
    const query = await client.query('INSERT INTO messages (content, time_stamp, user_id) VALUES ($1,$2,$3) RETURNING *',[content, time_stamp, user_id])
    res.status(200).json(query.rows)
  }catch (err){
    next(err)
  }finally{
    client.release()
  }
})
//UPDATE ONE
app.put('/api/messages/:id', async (req,res,next)=>{
  const {content, time_stamp, user_id} = req.body
  const {id} = req.params
  const client = await pool.connect()
  try{
    const query = await client.query('UPDATE messages SET content = $1, time_stamp = $2, user_id = $3 WHERE id = $4 RETURNING *',[content, time_stamp, user_id, id])
    res.status(200).json(query.rows)
  }catch (err){
    next(err)
  }finally{
    client.release()
  }
})
//DELETE ONE
app.delete('/api/messages/:id', async (req,res,next)=>{
  const {id} = req.params
  const client = await pool.connect()
  try{
    const query = await client.query('DELETE FROM messages WHERE id = $1 RETURNING *',[id])
    res.status(200).json(query.rows)
  }catch (err){
    next(err)
  }finally{
    client.release()
  }
})

app.use((req,res)=>{
  res.status(404).json({error:"Resource Not Found"})
})

app.use((err,req,res)=>{
  console.log(err)
  res.status(500).json({error:"Internal Error"})
})



app.listen(port, ()=>{
  console.log("Server Running on Port:", port)
})