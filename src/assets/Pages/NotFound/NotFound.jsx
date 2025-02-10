import React from 'react'
import error404 from './../../error.svg'
import { Helmet } from 'react-helmet'
export default function NotFound() {
  return (
    <>
    <Helmet>
        <title>Not Found</title>
    </Helmet>
    <div className='flex justify-center items-center'>
        <img src={error404} alt="" />
    </div>
    </>

  )
}
