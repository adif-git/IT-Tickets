export default {
   getSubmittedTickets: () =>{
       return fetch('/user/admin').then(
           response =>{
                if(response.status !== 401){
                    return response.json().then(data => data)
                }
                else{
                    return {message:{msgBody: "Unauthorized", msgError: true}}
                }
           }
       )
   },
   postCompleted: (ticket) =>{
       return fetch('/user/admin',{
           method: 'post',
           body: JSON.stringify(ticket),
           headers: {
               'Content-type':'application/json'
           }}).then(response=>{
                if(response.status !== 401){
                    return response.json().then(data=>data)
                }
                else{
                    return {message:{msgBody: "Unauthorized"}, msgError: true}
                }
            })
   }
}