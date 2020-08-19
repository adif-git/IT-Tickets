import React, {useState, useEffect, useContext} from 'react'
import AdminService from '../Services/AdminService'
import Plugins from '../Plugins/Plugins'
import BarLoader from 'react-spinners/BarLoader'
import {AuthContext} from '../Context/AuthContext'
import Message from '../Components/Message'

import './Admin.css'

const Admin = props => {
    const [tickets, setTickets]=useState([])
    const [message, setMessage] = useState(null)
    const [isLoaded,setIsLoaded] = useState(false)
    const authContext = useContext(AuthContext)

    useEffect(()=>{
        AdminService.getSubmittedTickets().then(data=>{
            const {message} = data
            if(!message.msgError){
                setTickets(data.tickets)
                setIsLoaded(true)
            }
            else if(message.msgBody === 'Unauthorized'){
                setMessage(message)
                authContext.setUser({username: "", role: ""})
                authContext.setIsAuthenticated(false)
            }
            else{
                setMessage(message)
            }
        })
    },[authContext])

    const onClick = (e, id) =>{
        e.preventDefault()
        AdminService.postCompleted({id: id}).then(data=>{
            const {message} = data
            if(!message.msgError){
                AdminService.getSubmittedTickets().then(getData=>{
                    setTickets(getData.tickets)
                    setMessage(message)
                })
            }
            else if(message.msgBody === 'Unauthorized'){
                setMessage(message)
                authContext.setUser({username: "", role: ""})
                authContext.setIsAuthenticated(false)
            }
            else{
                setMessage(message)
            }
        })
    }


    return(
        <div className="container-fluid admin-page">
            {!isLoaded ? 
                <div>
                    <BarLoader
                    css={`
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-right: -50%;
                        transform: translate(-50%, -50%);
                        `}
                    height={5}
                    width={200}
                    color={"#262626"}
                    />
                </div> :
                <>
                    <h3>Submitted Ticket</h3>
                    {message ? <Message message={message}/> : null}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="col-1">ID</th>
                                <th className="col-2">Title</th>
                                <th className="col-auto">Description</th>
                                <th className="col-1">User</th>
                                <th className="col-2">Submitted</th>
                                <th className="col-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tickets.map(ticket =>{
                                    return(
                                        <tr className="text-center" key={ticket._id}>
                                            <td>{Plugins.ticketID(ticket._id)}</td>
                                            <td>{ticket.title}</td>
                                            <td className="text-justify">{ticket.description}</td>
                                            <td>{ticket.user[0].username}</td>
                                            <td>{Plugins.formatDate(ticket.createdAt)}</td>
                                            <td>
                                                <div className="row justify-content-around">
                                                    <div className="col">
                                                        {ticket.status}
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={(e)=>onClick(e, ticket._id)} className='fa fa-check-square'></button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </>
            }
        </div>
    )
}

export default Admin