import http from 'node:http'
import { routes } from './routes/routes.js'
import { requestBody } from './routes/middleware/request-body.js'

const server = http.createServer(async(req, res) => {

    const {method, url} = req
    await requestBody(req, res)

    const route = routes.find(route => route.method === method && route.urlPath === url) 

    if (route) {
        return route.handler(req, res)
    }  
    else {
        return res.writeHead(404).end('page not found')
    }

    
})



server.listen(3000, () => {
    console.log('server running')
})