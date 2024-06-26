import React from 'react'
import loading from '../assets/loading.gif'
import Image from 'next/image'

const Loading = () => {
  return (
    <div style={{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Image src={loading} height={50} width={50} alt="/"/>
    </div>
  )
}

export default Loading
