// import path module
const path = require('path')

// get the location od database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// create connection to SQLite database
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})

// create a table in the database called 'books'
knex.schema
    .hasTable('books')
        .then(exists => {
            if(!exists) {
                return knex.schema.createTable('books', table => {
                    table.increments('id').primary()
                    table.integer('author')
                    table.string('title')
                    table.string('pubDate')
                    table.integer('rating')
                })
                .then(() => {
                    console.log('Table \'Books\' created')
                })
                .catch(error => {
                    console.error(`There was an error creating table: ${error}`)
                })
            }
        })
        .then(() => {
            console.log('done')
        })
        .catch(error => {
            console.error(`There was an error setting up the database: ${error}`)
        })

knex.select('*').from('books')
    .then(data => console.log('data:', data))
    .catch(err => console.log(err))

module.exports = knex