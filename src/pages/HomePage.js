import GroupSection from '../components/GroupSection';
import React,{useState} from 'react';
import {Modal} from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import style from '../components/PopUp.module.css';
import RightSidePannel from '../components/RightSidePannel';
import styleHomePage from './HomePage.module.css';
import Notes from '../components/Notes';
const HomePage = ()=>{
  const [userId,setUserId]=useState(0);
  const [open,setOpen]=useState(false);
  const [error,setError]=useState({groupName:false,color:false});
  const [errstate,setErrState]=useState({groupName:false,color:true});
  const [isVisible, setIsVisible] = useState(true);
  const colors=['#B38BFA','#FF79F2','#43E6FC','#F19576','#0047FF','#6691FF'];
  const [formData,setFormData]=useState({
        id:0,
        groupName:"",
        color:"",
        create:false,
  });
  const handleUserIdClicked =(id)=>{
    setUserId(id);
  }
  const handleClick=(open)=>{
    setOpen(open)
  }
  const handleNameChange =(e)=>{
      setFormData({...formData,groupName:e.target.value});
  }
  const handleColor=(color)=>{
    setFormData({...formData,color:color})
  }
  const submitCheck=()=>{
     
      if(formData.groupName!=="" &&  formData.color!==""){
        return true;
      }else{
        return false;
      }
    }
  
  const handleSubmit =(e)=>{
  
    /*if(formData.groupName==="" ){
      setError({...error,groupName:true}) 
    }else{
    setError({...error,groupName:false})
    }
    formData.color===""? setError({...error,color:true}) :
    setError({...error,color:false})*/
    if(submitCheck()===true){
    console.log(formData);
    setFormData({...formData,create:true});
    setOpen(false);
    }
  }
  console.log(open);
  return(
    <>
    <div className={styleHomePage.mainpage}>
   {
    submitCheck()?(
      <div className={styleHomePage.hideWhenMobile}>
        <GroupSection handleClick={handleClick}  handleUserIdClicked={handleUserIdClicked} id={formData.id} groupName={formData.groupName} color={formData.color} create={formData.create}/>
      </div>
    ):
    <div className={styleHomePage.hideWhenMobile}>
      <GroupSection  handleClick={handleClick} handleUserIdClicked={handleUserIdClicked}/>
    </div>
    
   }
   {
    userId>0 ? <div className={styleHomePage.hideWhenMobile}><Notes userId={userId}/></div>:<div className={styleHomePage.hideWhenMobile}><RightSidePannel/></div>
   }
   </div>
   { submitCheck() && isVisible ? (
        <div className={styleHomePage.hideWhenPc}>
        <GroupSection handleClick={handleClick}  handleUserIdClicked={handleUserIdClicked} id={formData.id} groupName={formData.groupName} color={formData.color} create={formData.create}/>
          </div>
        ) : (
          (isVisible) ?(
          <div className={styleHomePage.hideWhenPc} onClick={()=>setIsVisible(false)}>
          <GroupSection handleClick={handleClick} handleUserIdClicked={handleUserIdClicked}/>
          {console.log(isVisible)}
          </div>
          )
        :(null)
        )
        }
        {
          (userId.userId>0) ? (
            <div className={styleHomePage.hideWhenPc}>
            <Notes userId={userId}/>
            </div>
          ):(
            open > 0 && (
              <div className={styleHomePage.hideWhenPc}>
              <GroupSection handleClick={handleClick}  handleUserIdClicked={handleUserIdClicked} id={formData.id} groupName={formData.groupName} color={formData.color} create={formData.create}/>
              </div>
            )
          )
        }


  <Modal 
  open={open}
  onClose={()=>{setOpen(false);window.location.reload();}}
  closeOnOverlayClick={true}  
  center
  showCloseIcon={false}
  >
    <h2 className={style.heading}>Create New Group</h2>
    <form>
    <div className={style.label}>
      <label  htmlFor='Gname'>
        <span className={style.group_names}>Group Name</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input onChange={(e)=>handleNameChange(e)} id='Gname' className ={style.input} type="text" placeholder="enter group name"/>
        {error.groupName ? <p className={style.err}>Enter valid group name</p>: ""}
      </label>
      </div>
            <br/>
      <div className={style.label}>
      <label className={style.label}><span className={style.choose_color}>Choose Color</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {
        colors.map((color)=>{
          return <button type="button" onClick={()=>{handleColor(color)}}  style={{background:color,width: '25px',height: '25px',borderRadius: '50%',outline: 'none',margin: '0.3rem',border:color===formData.color? '2px solid blue' :0}}/>
        })
      }
      {error.color? <p className={style.err}>select any color</p>: ""}
      </label><br/>
      </div>
      <button  onClick={handleSubmit} className={style.create_btn}>create</button>
    </form>
  </Modal>
  </>
  )
  
    }
export default HomePage;