import { Database } from "./database/db.js"
import { dateNow } from "./middleware/date.js"

const database = new Database()
export const routes = [

    {
        method: "POST",
        urlPath: "/tasks",
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
    }

]
