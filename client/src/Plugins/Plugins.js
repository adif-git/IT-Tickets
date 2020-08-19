export default {
    formatDate : (date)=>{
        return new Date(date).toLocaleString()
    },
    ticketID : (id)=>{
        return id.substr(16).toUpperCase()
    },
}