import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [title, settitle] = useState("")
  const [todo, settodo] = useState([])

  const [todo_id, settodo_id] = useState(-1)

  const [edit_title,setedit_title]=useState("")

  const apis = "http://localhost:3000";
 


  const handle_sumbite = () => {

    if (title.trim !== " ") {

      fetch(apis + "/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      })
        .then((res) => {
          if (res.ok) {
            settodo([...todo, { title }])
            settodo_id(-1)
          }
          else {
            console.log("ERRO IN POST METHOD");

          }
        })


    }

  }

  const getitem = () => {

    fetch(apis + "/todo")
      .then((res) => res.json())
      .then((res) => { settodo(res) })
  }
  
  const handle_update=()=>{

     if(edit_title !== " "){

       fetch(apis+"/todo/"+todo_id,{

        method:"PUT",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ title:edit_title })
       }).then((res)=>{

          if(res.ok){
            
           const update_todo = todo.map((item)=>{

                if(item._id==todo_id){
                   
                  item.title=edit_title
                }

                return item;
              })

              settodo(update_todo)
              
          }
          else{
            console.log("update la error");
            
          }

          settodo_id(-1)

       })

     }
   
     
    
  }

  const delete_item=(id)=>{

    fetch(apis+"/todo/"+id,{
      method:"DELETE"
    })
    .then(()=>{
     const update=todo.filter((item)=>item._id !==id)
     settodo(update)
    })
  }

  const handle_cancel=()=>{

    settodo_id(-1)
  }

  const edid=(e)=>{

    settodo_id(e._id)
    setedit_title(e.title)
  }

  useEffect(() => { getitem() }, [])


  return (
    <>
      <h1>todo</h1>
      <div>
        <input type="text" value={title} onChange={(e) => settitle(e.target.value)} />
        <button onClick={handle_sumbite}>Add</button>
      </div>

      <div>
        {
          todo.map((e, index) => (<ul key={index}>
            {
              todo_id == -1 || todo_id !== e._id ? <> <li>{e.title}</li>
              <li><button onClick={()=>edid(e)} >edit</button></li>
              <li><button  onClick={()=>delete_item(e._id)} >delete</button></li> </> :  <><input type="text" value={edit_title} onChange={(e) => setedit_title(e.target.value)} />
              <button onClick={handle_update}>Add</button> 
              <button onClick={handle_cancel}>Cancel</button>  </>
            }

          </ul>))
        }

      </div>

    </>

  )
  
}

export default App
