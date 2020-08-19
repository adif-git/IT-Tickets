import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import AuthService from '../Services/AuthService'
import {AuthContext} from '../Context/AuthContext'
import {Navbar, Nav} from 'react-bootstrap'
import './Header.css'

const Header = props => {
    const {isAuthenticated, user, setIsAuthenticated, setUser} = useContext(AuthContext)

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data=>{
            if(data.success){
                setUser(data.user)
                setIsAuthenticated(false)
            }
        })
    }

    const unauthenticatedNavbar = () =>{
        return(
            <>
                <NavLink to="/">
                    <li className="nav-item nav-link">Home</li>
                </NavLink>
                <NavLink className="route" to="/login">
                    <li className="nav-item nav-link">Login</li>
                </NavLink>
            </>
        )
    }

    const authenticatedNavbar = () =>{
        return(
            <>
                <NavLink to="/">
                    <li className="nav-item nav-link">Home</li>
                </NavLink>
                <NavLink to="/tickets">
                    <li className="nav-item nav-link">My Tickets</li>
                </NavLink>
                {
                    user.role === "Admin" ? 
                    <>
                        <NavLink to="/admin">
                            <li className="nav-item nav-link">Admin</li>
                        </NavLink>
                        <NavLink to="/register">
                            <li className="nav-item nav-link">Register</li>
                        </NavLink>
                    </> : null
                }
                <button type="button" 
                    className="btn btn-link nav-item nav-link" 
                    onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }

    return(
        <div className="header">
            <Navbar fixed='top'>
                <Navbar.Brand>
                    <i className="fa fa-clipboard mr-3"></i>
                    IT-Tickets
                </Navbar.Brand>
                <Nav className="mr-auto">
                    {!isAuthenticated ? unauthenticatedNavbar(): authenticatedNavbar()}
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header