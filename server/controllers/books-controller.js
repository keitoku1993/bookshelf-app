// import databse
const knex = require('./../db')

// retrieve all books
exports.booksAll = async (req, res) => {
    knex.select('*').from('books')
        .then(userData => {
            res.json(userData)
        })
        .catch(err => {
            res.json({ message: `There was an error retriving books: ${err}` })
        })
}

// create new book
exports.booksCreate = async (req, res) => {
    knex('books').insert({
        'author': req.body.author,
        'title': req.body.title,
        'pubDate': req.body.pubDate,
        'rating': req.body.rating
    })
    .then(() => {
        res.json({ message: `Book \'${req.body.title}\' by ${req.body.author} created. ` })
    })
    .catch(err => {
        res.json({ message: `There was an error creating ${req.body.title} book: ${err}` })
    })
}

// remove specific book
exports.booksDelete = async (req, res) => {
    knex('books').where('id', req.body.id).del()
        .then(() => {
            res.json({ message: `Book ${req.body.id} deleted.` })
        })
        .catch(err => {
            res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
        })
}

// remove all books on the list
exports.booksReset = async (req, res) => {
    knex.select('*').from('books').truncate()
        .then(() => {
            res.json({ message: 'Book list cleared.' })
        })
        .catch(err => {
            res.json({ message: `There was an error resetting book list: ${err}.` })
        })
}