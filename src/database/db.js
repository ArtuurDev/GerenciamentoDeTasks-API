import fs from 'node:fs/promises'
import { dateNow } from '../middleware/date.js'
export class Database {

    database = {}

    constructor() {
        fs.readFile('db.json').then(data => {
            this.database = JSON.parse(data)
        }).catch(() => {
            this.persist()
        })
    }

    persist() {
       return fs.writeFile('db.json', JSON.stringify(this.database, null, 2), 'utf8')
    }

    insert(table, data) {
        
        const tasks = this.database[table]
        
        if (!tasks) {
            this.database[table] = [data]
        } else {
            this.database[table].push(data)
        }
        this.persist()
    }

    select(table) {
        const data = this.database[table] ?? []
        return data
    }


    updatePartial(table, id, data) {

        try {

            if(!Array.isArray(this.database[table])) {
                const error = new Error('Não há registro na tabela')
                error.statusCode = 404
                throw error
            } 

            const findTaskTable = this.database[table].findIndex(tasks => tasks.id === id)
        
            if (findTaskTable === -1) {

                const error = new Error('Id não existe no banco de dados')
                error.statusCode = 404
                throw error
            }
            // continuação da gambiarra da gambiarra
            if (data.title) {
                this.database[table][findTaskTable].title = data.title
            }

            if (data.description) {
                this.database[table][findTaskTable].description = data.description
            }

            if(data.title || data.description || data.completed_at) {
                this.database[table][findTaskTable].updated_at = dateNow
            }
            console.log(this.database)
            this.persist()
            


        } catch(error) {
            console.log(error)
            throw error
        }
    }


    setUpdateCompletedAt(table, id) {
        
        try {

            if(!Array.isArray(this.database[table])) {
                const error = new Error('Não há registro na tabela')
                error.statusCode = 404
                throw error
            } 

            const rowIndex = this.database[table].findIndex(row => row.id === id)
            console.log(rowIndex)

            if (rowIndex === -1) {
                const error = new Error("Id não existe no banco de dados")
                error.statusCode = 404
                throw error
            }

            this.database[table][rowIndex].completed_at = {concluded: true , date: dateNow}
            this.database[table][rowIndex].updated_at = dateNow
            this.persist()


        } catch(error) {
            console.log(error)
            throw error
        }

    }



    delete(table, id) {
        
        try {

            if(!Array.isArray(this.database[table])) {
                const error = new Error('Não há registro na tabela')
                error.statusCode = 404
                throw error
            } 

            const rowIndex = this.database[table].find(row => row.id === id)
            console.log(rowIndex)

            if (rowIndex === -1) {
                const error = new Error("Id não existe no banco de dados")
                error.statusCode = 404
                throw error
            }

            this.database[table].splice(rowIndex, 1)
            this.persist()
            
            

        } catch(error) {
           console.log(error.message)
           throw error
        }

    }
}