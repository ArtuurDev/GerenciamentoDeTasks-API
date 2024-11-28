import http from 'node:http'
import { routes } from './routes/routes.js'
import { requestBody } from './middleware/request-body.js'

const server = http.createServer(async(req, res) => {

    const {method, url} = req
    await requestBody(req, res)

    const route = routes.find(route => route.method === method && route.urlPath.test(url)) 

    if (route) {

        const parameters = url.match(route.urlPath)

        req.param = {...parameters.groups}
        
        return route.handler(req, res)
    } 
    else {
        return res.writeHead(404).end('page not found')
    }

    
})



server.listen(3000, () => {
    console.log('server running')
})