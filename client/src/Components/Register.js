import React, {useState,  useRef, useEffect} from 'react'
import AuthService from '../Services/AuthService'
import Message from './Message'

const Register = (props) =>{
    const [user, setUser] = useState({username: "", password: "", role:"User", employeeID:"", contacts:""})
    const [message, setMessage] = useState(null)
    let timerID = useRef(null)

    useEffect(()=>{
        return(
            clearTimeout(timerID)
        )
    }, [])

    const onChange = e =>{
        setUser({...user,[e.target.name]:e.target.value})
        console.log(user)
    }

    const resetForm = () =>{
        setUser({username: "", password: "", role:"User", employeeID:"", contacts:""})
    }

    const onSubmit = e => {
        e.preventDefault()
        AuthService.register(user).then(data=>{
            const {message} = data
            setMessage(message)
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/')
                },2000)
            }
        })
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10 col-l-9 mx-auto">
                    <div className="card card-signin">
                        <div className="card-body">
                            <h5 className="card-title text-center">Register New User/Admin</h5>
                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="username">Username: </label>
                                    <input 
                                        type="text" 
                                        id="username"
                                        name="username" 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Enter username"/>
                                    <small id="username" className="form-text text-muted">
                                    Username max length is 8 characters
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password: </label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        onChange={onChange} 
                                        className="form-control" 
                                        placeholder="Enter password"/>
                                    <small id="description" className="form-text text-muted">
                                    Password minimum at least 5 characters
                                    </small>
                                </div>
                                <div className="form-row">
                                    <div className="col form-group">
                                        <label htmlFor="employeeID">Employee ID: </label>
                                        <input 
                                            type="text" 
                                            name="employeeID" 
                                            value = {user.employeeID}
                                            onChange={onChange} 
                                            className="form-control" 
                                            placeholder="Enter employee ID"/>
                                    </div>
                                    <div className="col form-group">
                                        <label htmlFor="contacts">Contacts: </label>
                                        <input 
                                            type="text" 
                                            name="contacts" 
                                            value = {user.contacts}
                                            onChange={onChange} 
                                            className="form-control" 
                                            placeholder="Enter contacts"/>
                                    </div>
                                    <div className="col form-group">
                                        <label htmlFor="role">Role: </label>
                                        <select 
                                            name="role" 
                                            onChange={onChange}
                                            className="form-control">
                                            <option defaultValue="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn btn-lg" type="submit">Register</button>
                            </form>
                            {message ? <Message message={message}/> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register