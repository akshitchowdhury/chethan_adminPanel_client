import React, { useEffect, useState } from 'react'

const DisplayText = () => {

    const [content, setContent] = useState([]) 
    const fetchData = async function(){

        const data = await fetch("http://localhost:3001/getText", {method: "GET"})

        const dataFlow = await data.json();

        setContent(dataFlow)
    }

    useEffect(()=>{
            fetchData()
    },[])    

    return (
    <div>
      {
        content.map((item,index)=>(
            <>
            <div key={index}>
                <h1>{item.title}</h1>
                <h1>{item.description}</h1>
                <h1>{item.rating}</h1>
                </div>
            </>
        ))
      }
    </div>
  )
}

export default DisplayText
