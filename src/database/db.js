import fs from 'node:fs/promises'
export class Database {

    database = {}

    constructor() {
        fs.readFile('db.json').then(data => {
            this.database = data
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

    delete(table, id) {
        
        try {

            if(!Array.isArray(this.database[table])) {
                const error = new Error()
                error.message = "Tabela não foi criada"
                error.statusCode = 404
                throw error
            } 

            const rowIndex = this.database[table].findIndex(row => row.id === id)
            console.log(rowIndex)

            if (rowIndex === -1) {
                const error = new Error()
                error.message = "Id não existe no banco de dados"
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