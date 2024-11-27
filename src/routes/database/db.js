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
    
}