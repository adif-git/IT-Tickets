# IT Ticket System

## Introduction
Project I build about IT Ticket system. Ticket system is system that are used by IT support to track any hardware/software problems that submitted by user as ticket. This project build using MERN Stack (MongoDB Atlas, Express, Node.js, React.js) with Docker container. Login using passport-local authentication to generate cookies as JWT token. After login, all routes will be using JWT authentication.

Live Demo available at :
https://it-tickets-system.herokuapp.com/

You could login as user {username: usertest, password: usertest} or admin {username: admin, password: admin}.

## Description
### User role
1. User can view own tickets and submit new ticket

### Admin role
1. Admin can view own tickets also other user's tickets 
2. Admin can submit new ticket
2. Admin can register new user/admin
3. Admin can change ticket status from "submitted" into "completed" at admin navigation bar
