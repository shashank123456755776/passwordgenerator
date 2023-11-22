import { useEffect, useState,useCallback,useRef } from 'react'
// import './App.css'

function App() {
  const[length,setlength] =useState(8)
  const[number,setnumber] =useState(false)
  const[char,setchar] =useState(false)
  const[password,setpassword]= useState("")
  //use ref 
   const passwordref = useRef(null)
  //password generator methods 
  const passgenerator = useCallback(
    () => {
      let pass=""
      let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
       for(let i =1;i<length;i++){
            let char = Math.floor(Math.random()*str.length+1)
            pass += str.charAt(char)
       }
       setpassword(pass)
       if(number) str += "0123456789"
       if(char)  str  +=  "!}[~9@$6|]"
       
    },
    [length,number,char,setpassword],
  )
  const copypasstoclickboard =useCallback(()=>{
    passwordref.current?.select()
     window.navigator.clipboard.writeText(password)
  },[password])

 useEffect(() => {

   passgenerator()

 }, [length,number,char,passgenerator])
 
  
  
 return(
    
  
    <div className ="w-full max-w-md  mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500 bg-gray-700">
    <h1 className='text-white text-center my-3'>password generator</h1>
      <div className='flex shadow  rounded-lg  overflow-hidden mb-4 pb-1 ' >
    <input
     type='text'
     value={password}
     className='outline-none w-full py-1 px-3'
     placeholder='password'
     readOnly
     ref={passwordref}

   />
   <button onClick={copypasstoclickboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
            min={6}
            max={100}
            value ={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
          />
          <label >Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type ="checkbox"
            defaultChecked={number}
            id="numberinput"
            onChange={()=>{setnumber((prev)=> !prev)}}
          />
          <label htmlFor='numberinput'>Numbers</label>
        </div>
        <div className ='flex items-center gap-x-1'>

          <input
            type="checkbox"
            defaultChecked={char}
            id="charinput"
            onChange={()=>{setchar((prev)=>!prev)}}
          />
          <label htmlFor ="charinput">
               Characters
          </label>
        </div>
      </div>
    </div>
    
  )
}


export default App
