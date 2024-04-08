import React, { ReactPropTypes } from 'react'
import '../css/Alert.css'

const Alert = ({data}:any) => {
  return (
    <div className='alert'>
        <div className='alert-content'>
        <p>{data}</p>
        </div>
    </div>
  )
}

export default Alert
