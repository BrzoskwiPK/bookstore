import { FC, useEffect, useState } from 'react'
import {
  Alert,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Button,
} from '@mui/material'
import { useAuthUser } from 'react-auth-kit'
import { fetchCarts } from '../services/api'
import { Link } from 'react-router-dom'

interface Cart {
  user: string
  items: CartItem[]
  totalQuantity: number
  totalPrice: number
}

const Orders: FC = () => {
  const [carts, setCarts] = useState<Cart[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 1
  const userAuth = useAuthUser()
  const username = userAuth()?.username

  useEffect(() => {
    if (username) setOrders(username)
  }, [username])

  const setOrders = async (username: string) => {
    const response = await fetchCarts(username)
    setCarts(response.data)
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1)
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCarts = carts.slice(startIndex, endIndex)

  return carts.length === 0 ? (
    <Alert severity="error" sx={{ color: 'black' }}>
      There is no orders in the database.{' '}
      <Link to="/bookshelf" style={{ color: 'black', fontWeight: 'bold' }}>
        Purchase our books!
      </Link>
    </Alert>
  ) : (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#f6f6f6',
        border: '2px solid black',
        overflow: 'auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{ margin: '30px 0', fontWeight: 'bold', color: '#5a228b' }}
      >
        The {carts[0].user}'s orders
      </Typography>
      <Table sx={{ border: '2px solid black', marginBottom: '25px' }}>
        <TableHead>
          <TableRow
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TableCell sx={{ flex: '1', width: '33.3%', fontWeight: 'bold' }}>
              Title
            </TableCell>
            <TableCell sx={{ flex: '1', width: '33.3%', fontWeight: 'bold' }}>
              Quantity
            </TableCell>
            <TableCell sx={{ flex: '1', width: '33.3%', fontWeight: 'bold' }}>
              Subtotal
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCarts.map(cart => (
            <TableRow key={cart.user}>
              <TableCell>
                <Table>
                  <TableBody>
                    {cart.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ flex: '1', width: '33.3%' }}>
                          <strong>{item.book.title}</strong>
                        </TableCell>
                        <TableCell sx={{ flex: '1', width: '33.3%' }}>
                          {item.quantity}
                        </TableCell>
                        <TableCell sx={{ flex: '1', width: '33.3%' }}>
                          {item.subtotal}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          sx={{ marginRight: '10px' }}
        >
          Previous Order
        </Button>
        <Button disabled={endIndex >= carts.length} onClick={handleNextPage}>
          Next Order
        </Button>
      </div>
    </Container>
  )
}

export default Orders
