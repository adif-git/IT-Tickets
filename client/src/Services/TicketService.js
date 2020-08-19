export default {
    getTickets: ()=>{
        return fetch('/user/tickets').then(
            response =>{
                if(response.status !== 401){
                    return response.json().then(data => data)
                }
                else{
                    return {message:{msgBody: "Unauthorized", msgError: true}}
                }
            })
    },
    postTicket: (ticket)=>{
        return fetch('/user/ticket', {
            method: 'post',
            body: JSON.stringify(ticket),
            headers: {
                'Content-type':'application/json'
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data=>data)
            }
            else{
                return {message:{msgBody: "Unauthorized"}, msgError: true}
            }
        })
    }
}