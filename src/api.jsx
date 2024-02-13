import React, { useEffect, useState } from 'react'
import axios from 'axios'

const api = () => {
    const [data,setdata]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/products").then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    })
 return(
    <>
    {data.map((item)=>(
        <>
        <h1>{item.name}</h1>
        </>
    ))}
    </>
 )
  }

export default api
