import React, {useState, useContext} from 'react'
import AuthService from '../Services/AuthService'
import {AuthContext} from '../Context/AuthContext'
import Message from '../Components/Message'
import './Login.css'

const Login = (props) =>{
    const [user, setUser] = useState({username: "", password: ""})
    const [message, setMessage] = useState(null)
    const authContext = useContext(AuthContext)

    const onChange = e => {
        setUser({...user,[e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        AuthService.login(user).then(data=>{
            const {isAuthenticated, user, message} = data
            if(isAuthenticated){
                authContext.setUser(user)
                authContext.setIsAuthenticated(isAuthenticated)
                props.history.push('/')
            }
            else{
                setMessage(message)
            }
        })
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin">
                        <div className="card-body">
                            <h5 className="card-title text-center">LOGIN</h5>
                            <form onSubmit={onSubmit}>
                                <label htmlFor="username">Username: </label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    onChange={onChange} 
                                    className="form-control" 
                                    placeholder="Enter username"/>
                                <label htmlFor="password">Password: </label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    onChange={onChange} 
                                    className="form-control" 
                                    placeholder="Enter password"/>
                                <button className="btn btn-lg" type="submit">Login</button>
                            </form>
                            {message ? <Message message={message}/> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login