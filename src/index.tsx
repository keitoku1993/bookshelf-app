import React from 'react'
import { render } from 'react-dom'

import { Bookshelf } from './components/bookshelf'

import './styles/styles.css'

const rootElement = document.getElementById('root')

render(<Bookshelf />, rootElement)