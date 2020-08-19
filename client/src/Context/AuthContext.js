import React, {createContext, useState, useEffect} from 'react'
import HashLoader from 'react-spinners/HashLoader'
import AuthService from '../Services/AuthService'

export const AuthContext = createContext()

export default ({ children }) => {
    const [user,setUser] = useState(null)
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(()=>{
        AuthService.isAuthenticated().then(data=>{
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            setIsLoaded(true)
        })
    },[])
    
    return(
        <div>
            {!isLoaded ? 
                <div className="loading">
                    <HashLoader
                    css={`
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-right: -50%;
                        transform: translate(-50%, -50%);
                        `}
                    size={90}
                    color={"#262626"}
                    />
                </div> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                {children}
            </AuthContext.Provider>}
        </div>
    )
}