import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../redux/store'
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Alert,
  Box,
  Grid,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { CSSProperties, FC } from 'react'
import { clearCart, removeFromCart } from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

const Cart: FC = () => {
  const cart = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  const handleRemoveFromCart = (item: CartItem) => {
    dispatch(removeFromCart(item))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleCheckout = () => {
    // TODO
  }

  const basePrice = cart.items.reduce((total, item) => total + item.subtotal, 0)
  const deliveryCost = basePrice > 100 ? 0 : 12

  const calculateDiscount = (basePrice: number) => {
    let discount = 0

    if (cart.items.length >= 5) discount = basePrice * 0.1
    else if (cart.items.length >= 3) discount = basePrice * 0.05

    return discount
  }

  const discount = calculateDiscount(basePrice)
  const totalPrice = basePrice - discount + deliveryCost

  const groupedCartItems = Object.values(
    cart.items.reduce((acc: { [key: string]: CartItem }, item) => {
      const existingItem = acc[item.book.title]
      if (existingItem) {
        existingItem.quantity += item.quantity
        existingItem.subtotal += item.subtotal
      } else {
        acc[item.book.title] = { ...item }
      }
      return acc
    }, {}),
  )

  return !groupedCartItems.length ? (
    <Alert severity="error" sx={{ color: 'black' }}>
      There is no books in the cart!{' '}
      <Link to="/bookshelf" style={{ color: 'black', fontWeight: 'bold' }}>
        Click and choose some
      </Link>
    </Alert>
  ) : (
    <Container
      maxWidth={false}
      sx={{ width: '80%', backgroundColor: '#f6f6f6', border: '2px solid black' }}
    >
      <Typography
        sx={{ margin: '30px 0', fontWeight: 'bold', color: '#5a228b' }}
        variant="h4"
        component="h1"
        align="center"
      >
        My Shopping Cart
      </Typography>
      <List sx={{ border: '2px solid black' }}>
        <ListItem>
          <ListItemText
            primary={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Title</strong>
                <strong>Quantity</strong>
                <strong>Remove</strong>
                <strong>Price</strong>
              </div>
            }
          />
        </ListItem>
        {groupedCartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={item.book.title}
              secondary={`Quantity: ${item.quantity}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{ color: '#5a228b' }}
                onClick={() => handleRemoveFromCart(item)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: '20px' }}
      >
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={boxStyle}>
            <Typography variant="button" sx={{ fontWeight: 'bold' }}>
              Discount {discount.toFixed(2)} PLN
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={boxStyle}>
            <Typography variant="button" sx={{ fontWeight: 'bold' }}>
              Delivery {deliveryCost.toFixed(2)} PLN
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={boxStyle}>
            <Typography variant="button" sx={{ fontWeight: 'bold' }}>
              Subtotal {basePrice.toFixed(2)} PLN
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={boxStyle}>
            <Typography variant="button" sx={{ fontWeight: 'bold' }}>
              Total {totalPrice.toFixed(2)} PLN
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClearCart}
          sx={{ margin: '0 10px 10px 0' }}
        >
          Clear Cart
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          sx={{ margin: '0 0 10px 0' }}
        >
          Checkout
        </Button>
      </Box>
    </Container>
  )
}

export default Cart

export const boxStyle: CSSProperties = {
  flexBasis: '25%',
  border: '1px solid black',
  padding: '15px',
  marginRight: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}
