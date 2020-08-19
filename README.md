# [WIP] IT Ticket System
*Note: Still work in progress. Tested only on Linux. Mobile mode not tested yet*

![alt text][image]

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

## How to use
### 1. Git clone this repository
### 2. Change MONGO_URI into your MongoDB Atlas URI from ./server/config/config.env
### 3. Change JWT_SECRET from ./server/config/config.env
### 4. Build your docker
*Assume docker and docker-compose already installed on your local machine*
#### * Development Environment (Local)
Run development env from root directory
1. `sudo docker-compose -f dev-docker-compose.yml build`
2. `sudo docker-compose -f dev-docker-compose.yml up`

Stop development env from root directory
1. Press `CTRL+C` on cmd
2. `sudo docker-compose -f dev-docker-compose.yml down`

#### * Production Environment (Local)
Run development env from root directory
1. `sudo docker-compose -f prod-docker-compose.yml build`
2. `sudo docker-compose -f prod-docker-compose.yml up`

Stop development env from root directory
1. Press `CTRL+C` on cmd
2. `sudo docker-compose -f prod-docker-compose.yml down`

### 5. Deployment to Heroku
Follow this instruction : https://devcenter.heroku.com/articles/build-docker-images-heroku-yml

heroku.yml available on repository

## To Do List
1. Add user profile page
2. Test mobile mode

[image]: https://raw.githubusercontent.com/adif-git/IT-Tickets/master/Homepage.png "Homepage"