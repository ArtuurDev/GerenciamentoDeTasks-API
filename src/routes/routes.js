import { Database } from "../database/db.js"
import { dateNow } from "../middleware/date.js"
import { buildRouthUrlPath } from "../utils/buildRouthUrlPatch.js"


const database = new Database()
export const routes = [

    {
        method: "POST",
        urlPath: buildRouthUrlPath("/tasks"),
        handler: ((req, res) => {
            
            const {title, description} = req.body
            
            if (!title) {
                return res.end('Title is obrigatory')
            }
            if (!description) {
                return res.end('description is obrigatory')
            }
            database.insert('tasks', {
                
                id: crypto.randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: dateNow,
                updated_at: null

            })
            return res.writeHead(201).end()

        })
    }, {

        method: "GET",
        urlPath: buildRouthUrlPath("/tasks"),
        handler: ((req, res) => {
            const data = database.select('tasks')
            return res.writeHead(200).end(JSON.stringify(data))
        })

    },{
        method: "PUT",
        urlPath: buildRouthUrlPath("/tasks/:id"),
        handler: ((req, res) => {
            
            const {id} = req.param
            const body = req.body
            
            if (body === null) {
                return res.writeHead(404).end("para atualizar, precisa passar pelo menos um dos campos")
            }

            if (!id) {
                return res.writeHead(404).end("Id precisa ser informado para atualizar um usuario")
            }

            // gambiarra da gambiarra
            if (body.title) {
                var title = body.title
            }

            if (body.description) {
                var description = body.description
            }

            if (body.completed_at) {
                var completed_at = body.completed_at
            }


            try {
                database.updatePartial('tasks', id, {
                    title: title || undefined, 
                    description: description || undefined,
                    completed_at: completed_at || undefined

                })

                return res.writeHead(201).end("Atualizaçoes feitas")

            }
            catch(error) {
                console.log(error)
                return res.writeHead(error.statusCode).end(error.message)
            }
        })

    }, {
        method: "PATCH",
        urlPath: buildRouthUrlPath('/tasks/:id/complete'),
        handler: ((req, res)=> {

            const {id} = req.param
            
            if (!id) {
                return res.writeHead(404).end("Id precisa ser informado para atualizar um usuario")
            }

            try {
                
                database.setUpdateCompletedAt('tasks', id)
                return res.writeHead(201).end("Task atualizada")

            } catch(error) {
                console.log(error)
                return res.writeHead(error.statusCode).end(error.message)
            }

        })

    }, {

        method: "DELETE",
        urlPath: buildRouthUrlPath("/tasks/:id"),
        handler: ((req,res) => {
            
            const {id} = req.param

            if (!id) {
                return res.writeHead(404).end("Id precisa ser informado ao deletar um usuario")
            }

            try {

                database.delete('tasks', id)
                return res.writeHead(201).end('Deletado com sucesso')

            } catch(error) {
                console.log(error)
                return res.writeHead(error.statusCode).end(JSON.stringify(error.message))
            }
        
        })
    }, 
    

]
