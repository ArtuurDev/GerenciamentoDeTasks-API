import fs from 'fs'
import http from 'node:http'
import { routes } from './routes/routes.js'
import { requestBody } from './middleware/request-body.js'

const server = http.createServer(async(req, res) => {

    const {method, url} = req
    await requestBody(req, res)

    const route = routes.find(route => route.method === method && route.urlPath.test(url)) 

    if (route) {

        const parameters = url.match(route.urlPath)

        req.param = {...parameters.groups} || [] // se na rota o parametro n foi passado, modiquei para ser array, ai na rota posso verificar se tem algum 
        // parametro que foi passado, pois preciso retornar a resposta se o id não for passado, da outra forma, 
        //se eu não passase o parametro na url, o match não batia com o regex, ja que não tinha nehum valor e ai a rota n funcionava e não conseguia mandar a reposta na requisição
        
        return route.handler(req, res)
    } 
    else {
        return res.writeHead(404).end('page not found')
    }
  
})

server.listen(3000, () => {
    console.log('server running')
})