import React from 'react'
import style from './NotesName.module.css';

export default function NotesName({id,groupName,color,buttonColorId}) {
  const text=groupName.length;
  function getInitials(groupName) {
    const words = groupName.split(' ');
    const len=words.length;
    let initials = '';
    if(len>1){
      initials = initials+words[0][0].toUpperCase()+words[len-1][0].toUpperCase()
    }else{
      initials+=words[0][0].toUpperCase();
    }
  
    return initials;
  }
  
  
  
  return (
    <>
     { (buttonColorId===id)?(
      <div className={style.notesarea}>
          <div className={style.profile} style={{background:color}}>
            {getInitials(groupName)}
          </div>&nbsp; &nbsp; &nbsp;
          <div className={style.groupName}>{groupName}</div>
          </div>
      ) : <div className={style.notesarea}>
          <div className={style.profile} style={{background:color}}>
            {getInitials(groupName)}
          </div>&nbsp; &nbsp; &nbsp;
          <div className={style.groupName}>{groupName}</div>
          </div>
        
     }
    </>
  )
}
