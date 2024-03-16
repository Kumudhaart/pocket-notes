import React,{useState} from 'react'
import style from './Notes.module.css';


export default function Notes(userId) {
  const [saveNotes,setSaveNotes]=useState(false);
  const storedDataString =localStorage.getItem("notesGroupName");
  const storedData=JSON.parse(storedDataString)  || [];
  const [myNotes,setMyNotes]=useState({
    id:[],
    notes:[],
    time:[],
    date:[]
  });
  const groupName=storedData[userId.userId-1].groupName;
  const color=storedData[userId.userId-1].color;
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
  const NotesImage = {
    backgroundColor: `${color}`,
    borderRadius: "50%",
    minWidth: "61px",
    minHeight: "61px",
    maxWidth: "61px",
    maxHeight: "61px",
    color: "#FFF",
    fontFamily: "Roboto",
    fontSize: "1.5rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "97.6%" ,
    letterSpacing: "0.03rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
  };
  const myNotesFunction=(e)=>{
    const currentNotesDate = new Date();
    const noteTimeWithSeconds = currentNotesDate.toLocaleTimeString();
    const NoteTimeWithoutSeconds = noteTimeWithSeconds.replace(/:\d{2}\s/, " ");

    const currentDate = new Date();
    const notesDay = currentDate.getDate();
    const notesMonth = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(currentDate);
    const notesYear = currentDate.getFullYear();

    const notesDate = `${notesDay} ${notesMonth} ${notesYear}`;

    setMyNotes({
      ...myNotes,
      id: userId.userId,
      notes: e.target.value,
      time: NoteTimeWithoutSeconds,
      date: notesDate,
    });
    setSaveNotes(true);
  }

  const resetTextarea = () => {
    setMyNotes({ ...myNotes, notes: '' }); 
  };
  const saveMyNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");
    let existingNotes = JSON.parse(existinggroupNamesData) || [];

    if (myNotes.notes !== "" && saveNotes === true) {
      existingNotes.push(myNotes);
      localStorage.setItem("myNotesSave", JSON.stringify(existingNotes));
    }
    resetTextarea();
  };

  const retrieveNotes = () => {
    const existinggroupNamesData = localStorage.getItem("myNotesSave");
  
    if (existinggroupNamesData) {
      const existingNotes = JSON.parse(existinggroupNamesData);
  
      return( existingNotes.map((note, index) => (
       (userId.userId === note.id) ?(
        <div className={style.area} key={index}>
          <div>
          <div className={style.notes} style={{width: "70vw",contentWrap: "break-word"}}> {note.notes}</div>
         <br/><br/><br/>
            <div style={{display:"flex",float:"right",position:"relative",right:"0",bottom:"15px"}}>
            <div className={style.date}>{note.date}&nbsp;&nbsp; &nbsp; &nbsp;</div>
            <li></li>
            <div className={style.time}>&nbsp;{note.time}</div>
            </div>
          </div>
        </div>
      ):(
        null
      ))));
    } else {
      console.log("Data not found in localStorage");
    }
  };
  
  const handleKEnterKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      saveMyNotes();
    }
  };

  return (
    <>
    {
        userId.userId>0 ? (
        <div className={style.NotesGroupNotes}>
            <div className={style.NotesGroupHeading}>
            <span className={style.backButton} onClick={() => window.location.reload()}><img src="assets/Arrow.png"alt="BackButton" /> &nbsp;</span>
                <div style={NotesImage}>{getInitials(groupName)}</div>
                <div className={style.NotesName}>&nbsp;&nbsp;{groupName}</div>
            </div>
            <div className={style.NotesContent}>
                {retrieveNotes()}
            </div>
            <div className={style.NotesEnter}>
               <textarea type="text" placeholder="Enter your text here..........."
                onChange={(e)=>{myNotesFunction(e)}}
                className={style.NotesInput}
                value={myNotes.notes}
             
               />
               <img src="assets/send.png" alt="Enter" className={style.NotesInputButton} onClick={saveMyNotes} />
            </div>
        </div>) 
        
        : console.log("no notes")
    }
    </>
  )
}
