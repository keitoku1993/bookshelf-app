import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { BookshelfList } from './bookshelf-list'

import './../styles/bookshelf.css'

export const Bookshelf = () => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [pubDate, setPubDate] = useState('')
    const [rating, setRating] = useState('')
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        axios.get('http://localhost:4001/books/all')
            .then(res => {
                setBooks(res.data)
                setLoading(false)
            })
            .catch(err => console.error(`There was an error retrieving the book list: ${err}`))
    }

    const handleInputReset = () => {
        setAuthor('')
        setTitle('')
        setPubDate('')
        setRating('')
    }

    const handleBookCreate = () => {
        axios.post('http://localhost:4001/books/create', {
            author: author,
            title: title,
            pubDate: pubDate,
            rating: rating
        })
        .then(res => {
            console.log(res.data)
            fetchBooks()
        })
        .catch(err => console.error(`There was an error creating the ${title} book: ${err}`))
    }

    const handleBookSubmit = () => {
        if(author.length > 0 && title.length > 0 && pubDate.length > 0 && rating.length > 0) {
            handleBookCreate()
            console.info(`Book ${title} by ${author} added.`)
            handleInputReset()
        }
    }

    const handleBookRemove = (id: number, title: string) => {
        axios.put('http://localhost:4001/books/delete', {id:id})
            .then(() => {
                console.log(`Book ${title} removed.`)
                fetchBooks()
            })
            .catch(err => console.error(`There was an error removing the ${title} book: ${err}`))
    }

    const handleListReset = () => {
        axios.put('http://localhost:4001/books/reset')
            .then(() => {
                fetchBooks()
            })
            .catch(err => console.error(`There was an error resetting the book list: ${err}`))
    }

    return (
        <div className="book-list-wrapper">
            <div className="book-list-form">
                <div className="form-wrapper" onSubmit={handleBookSubmit}>
                    <div className="form-row">
                        <fieldset>
                            <label htmlFor="title" className="form-label">Enter title:</label>
                            <input
                                className="form-input" type="text" id="title" name="title" value={title}
                                onChange={e => setTitle(e.currentTarget.value)} 
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="author" className="form-label">Enter author:</label>
                            <input
                                className="form-input" type="text" id="author" name="author" value={author}
                                onChange={e => setAuthor(e.currentTarget.value)} 
                            />
                        </fieldset>
                    </div>
                    <div className="form-row">
                        <fieldset>
                            <label htmlFor="pubDate" className="form-label">Enter publication date:</label>
                            <input
                                className="form-input" type="text" id="pubDate" name="pubDate" value={pubDate}
                                onChange={e => setPubDate(e.currentTarget.value)} 
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="rating" className="form-label">Enter rating:</label>
                            <input
                                className="form-input" type="text" id="rating" name="rating" value={rating}
                                onChange={e => setRating(e.currentTarget.value)} 
                            />
                        </fieldset>
                    </div>
                    <button onClick={handleBookSubmit} className="btn btn-add">
                        Add the Book
                    </button>
                    <BookshelfList
                        books={books}
                        loading={loading}
                        handleBookRemove={handleBookRemove}
                    />
                    {books.length > 0 && (
                        <button onClick={handleListReset} className="btn btn-reset">
                            Reset books list
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}