import React, {useState,useEffect} from 'react'
import style from './GroupSection.module.css';
import NotesName from '../components/NotesName';

export default function GroupSection({handleClick,handleUserIdClicked,id,groupName,color,create}) {
  
  const [clickedButton,setClickedButton]=useState(null);
  const storedData=JSON.parse(localStorage.getItem('notesGroupName')) || [];
  
  const genId=storedData.length>0? storedData[storedData.length-1].id+1:1;

  const data={
    id:genId,
    groupName:groupName,
    color:color,
    create:create,
  }
  const submitCheck=()=>{
    if(groupName!=="" && create===true){
      return true;
    }else{
      return false;
    }
  } 
  useEffect(()=>{
    if(submitCheck()===true){
      storedData.push(data);
      localStorage.setItem("notesGroupName",JSON.stringify(storedData));
    }
  },[groupName,create,data])
  
  const handleButtonClick =(buttonId)=>{
    setClickedButton(buttonId);
  }

  return (
   <>
    <div className={style.div}>
      <p className={style.pocket}>pocket notes</p>
      <button type="button" className={style.button} onClick={()=> {console.log("clicked");handleClick(true)}}>+</button>
      <div style={{display:'flex',flexDirection:'column-reverse'}}>
      {
        storedData.map((data)=>{
          return data.create ?(
          <div>
          <span onClick={ ()=>{
            handleUserIdClicked(data.id);
            handleButtonClick(data.id);
          }}>
          <NotesName key={data.id} groupName={data.groupName} color={data.color} buttonColorId={data.id}/>
          </span>
          </div>
          ):null
        })
      } 
      </div>
      

    </div>
   </>
  )
}

