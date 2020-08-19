import React, {useContext} from 'react'
import {AuthContext} from '../Context/AuthContext'
import './Home.css'

const Home = props => {
    const {user, isAuthenticated} = useContext(AuthContext)
    return (
        <div className='home-bg'>
            <div className='introduction mx-auto'>
                {isAuthenticated ? <h5>Welcome, {user.username} !</h5>: null}
                <h3>IT TICKETING SYSTEM</h3>
            </div>
        </div>
    )
}

export default Home
