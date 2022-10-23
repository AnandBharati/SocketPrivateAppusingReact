import React from 'react'
import {Link} from 'react-router-dom'

function HomePage() {
  return (
    <div className='homePageContainer'>
        <h1>Welcome to Chat Application <Link to={'/login'}> Login </Link> </h1>
    </div>
  )
}

export default HomePage