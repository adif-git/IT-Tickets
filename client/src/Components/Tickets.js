import React, {useState, useContext, useEffect} from 'react'
import TicketService from '../Services/TicketService'
import {AuthContext} from '../Context/AuthContext'
import Plugins from '../Plugins/Plugins'
import {Tabs, Tab} from 'react-bootstrap'
import Message from './Message'
import BarLoader from 'react-spinners/BarLoader'

import './Tickets.css'

const Tickets = props => {
    const [ticket, setTicket] = useState({title: "", description: ""})
    const [tickets, setTickets] = useState([])
    const [message, setMessage] = useState(null)
    const [isLoaded,setIsLoaded] = useState(false)
    const authContext = useContext(AuthContext)

    useEffect(()=>{
        TicketService.getTickets().then(data=>{
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

    const onChange = e =>{
        setTicket({...ticket,[e.target.name]:e.target.value})
    }
    
    const onSubmit = e =>{
        e.preventDefault()
        TicketService.postTicket(ticket).then(data=>{
            const {message} = data
            resetForm()
            if(!message.msgError){
                TicketService.getTickets().then(getData =>{
                    const {message} = getData
                    if(!message.msgError){
                        setTickets(getData.tickets)
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

    const resetForm = e =>{
        setTicket({title: "", description:""})
    }

    return(
        <div className="container-fluid tickets-page">
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
            <Tabs defaultActiveKey="tickets-list" id="tickets-tabs" variant="pills">
                <Tab eventKey="tickets-list" title="My Tickets">
                    <div className="tickets">
                        <h1 className="float-left">My Tickets</h1>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="col-1">ID</th>
                                    <th className="col-2">Title</th>
                                    <th className="col-auto">Description</th>
                                    <th className="col-2">Submitted</th>
                                    <th className="col-1">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                        tickets.map(ticket =>{
                                        return(
                                            <tr className="text-left" key={ticket._id}>
                                                <td>{Plugins.ticketID(ticket._id)}</td>
                                                <td>{ticket.title}</td>
                                                <td className="text-justify">{ticket.description}</td>
                                                <td>{Plugins.formatDate(ticket.createdAt)}</td>
                                                <td>{ticket.status}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </Tab>
                <Tab eventKey="tickets-add" title="Add Ticket">
                    <div className="container-fluid">
                        <form onSubmit={onSubmit} className="pt-3">
                            <div className="form-group row">
                                <label htmlFor="title">Title:</label>
                                <input  type="text" 
                                    name="title"
                                    value={ticket.title}
                                    onChange={onChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description">Description:</label>
                                <textarea
                                    rows='6'
                                    name="description"
                                    value={ticket.description}
                                    onChange={onChange}
                                    className="form-control"
                                />
                                <small id="description" className="form-text text-muted">
                                Please describe your problems as spesific as possible.
                                </small>
                            </div>
                            <div className="form-group row">
                                <button className="btn btn-md" type="submit">Submit Ticket</button>
                            </div>
                            {message ? <Message message={message}/> : null}
                        </form>
                    </div>
                </Tab>
            </Tabs>
            }
        </div>
    )
}

export default Tickets