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
  TablePagination,
  Button,
  styled,
  Rating,
} from '@mui/material'
import { tableHeadStyle, tableStyle } from '../styles/Bookshelf'
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp'
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp'
import DoNotDisturbOnSharpIcon from '@mui/icons-material/DoNotDisturbOnSharp'

interface Book {
  title: string
  author: string
  availability: string
  description: string
  price: number
  rate: number
}

const Bookshelf: FC = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

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

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const addToCart = (book: Book) => console.log('tbd')

  return (
    <Paper sx={tableStyle}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeadStyle}>Title</TableCell>
              <TableCell sx={tableHeadStyle}>Author</TableCell>
              <TableCell sx={tableHeadStyle}>Availability</TableCell>
              <TableCell sx={tableHeadStyle}>Description</TableCell>
              <TableCell sx={tableHeadStyle}>Price</TableCell>
              <TableCell sx={tableHeadStyle}>Rate</TableCell>
              <TableCell sx={tableHeadStyle}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(book => (
                <TableRow key={book.title}>
                  <TableCell>
                    <strong>{book.title}</strong>
                  </TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    {book.availability == 'true' ? (
                      <CheckCircleSharpIcon
                        sx={{ color: '#5a228b', marginLeft: '20px' }}
                      />
                    ) : (
                      <DoNotDisturbOnSharpIcon
                        sx={{ color: '#5a228b', marginLeft: '20px' }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>{book.price}</TableCell>
                  <TableCell>
                    {<Rating name="read-only" value={book.rate} readOnly />}
                  </TableCell>
                  <TableCell>
                    {book.availability == 'true' ? (
                      <StyledButton
                        variant="contained"
                        onClick={() => addToCart(book)}
                      >
                        ADD TO CART{' '}
                        <ShoppingCartSharpIcon sx={{ marginLeft: '5px' }} />
                      </StyledButton>
                    ) : (
                      <StyledButton
                        variant="contained"
                        sx={{ marginLeft: '5px' }}
                        disabled
                      >
                        OUT OF STOCK
                      </StyledButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default Bookshelf

export const StyledButton = styled(Button)({
  backgroundColor: '#5a228b',
  alignSelf: 'flex-start',
  '&:hover': {
    backgroundColor: '#752eb3',
  },
  '&:disabled': {
    cursor: 'not-allowed'
  }
})
