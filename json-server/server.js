import jsonServer from 'json-server'
import bodyParser from 'body-parser'
import fs from 'fs'
import jwt from 'jsonwebtoken'

const server = jsonServer.create()
const router = jsonServer.router('./json-server/db.json')
const middlewares = jsonServer.defaults()
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

const PRIVATE_KEY = '12345'

const findUser = (email, onUserFound, onUserNotFound, onError) => {
    fs.readFile('./json-server/users.json', (err, data) => {
        if (err) {
            onError(err)
            return
        }

        let users = JSON.parse(data)
        let user = users && users.find(user => user.email === email)
        if (!user) {
            onUserNotFound(users)
            return
        }

        onUserFound(user)
    })
}

server.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        res.status(401).jsonp('Email or password was not provided')
        return
    }

    findUser(email, (user) => {
        if (password !== user.password) {
            res.status(401).jsonp('Wrong password')
            return
        }

        let token = jwt.sign({
            email,
            password
        }, PRIVATE_KEY)
        res.status(200).jsonp({
            token
        })
    }, () => {
        res.status(401).jsonp('User was not found')
    }, () => {
        res.status(500)
    })
})

server.post('/register', (req, res) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        res.status(401).jsonp('Email or password was not provided')
        return
    }

    findUser(email, () => {
        res.status(400).jsonp('User is already registered')
    }, (users) => {
        users.push({
            email,
            password
        })

        fs.writeFile('./json-server/users.json', JSON.stringify(db), (err) => {
            if (err) {
                res.status(500)
            } else {
                let token = jwt.sign({
                    email,
                    password
                }, PRIVATE_KEY)
                res.status(200).jsonp({
                    token
                })
            }
        })
    }, () => {
        res.status(500)
    })
})

const isAuthorized = (req) => {
    let authHeader = req.headers.authorization
    if (!authHeader) {
        return false
    }

    let token = authHeader.replace('Bearer ', '')
    try {
        jwt.verify(token, PRIVATE_KEY);
        return true
    } catch (err) {
        return false
    }
}

server.use(middlewares)
server.use((req, res, next) => {
    if (isAuthorized(req)) {
        next()
    } else {
        res.sendStatus(401)
    }
})
server.use(router)
server.listen(3000, () => {
    console.log(`http://localhost:3000`)
})