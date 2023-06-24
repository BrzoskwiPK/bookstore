import { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

interface Book {
  title: string
  author: string
  availability: string
  description: string
  price: number
}

const Bookshelf: FC = () => {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          'http://localhost:3001/books',
        )
        setBooks(response.data)
      } catch (error) {
        console.error('Wystąpił błąd:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((el, index) => (
            <TableRow key={index}>
              <TableCell>{el.title}</TableCell>
              <TableCell>{el.author}</TableCell>
              <TableCell>{el.availability.toString()}</TableCell>
              <TableCell>{el.description}</TableCell>
              <TableCell>{el.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Bookshelf
