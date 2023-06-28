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
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { FC } from 'react'
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

const styles = {
  header: {
    flex: '1',
    width: '25%',
    fontWeight: 'bold',
  },
  value: {
    flex: '1',
    width: '25%',
  },
}

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

  function handleDecreaseQuantity(item: CartItem): void {
    dispatch(decreaseQuantity(item))
  }

  function handleIncreaseQuantity(item: CartItem): void {
    dispatch(increaseQuantity(item))
  }

  const basePrice = cart.totalPrice
  const deliveryCost = basePrice > 100 ? 0 : 12

  const calculateDiscount = (basePrice: number) => {
    let discount = 0

    if (cart.totalQuantity >= 5) discount = basePrice * 0.1
    else if (cart.totalQuantity >= 3) discount = basePrice * 0.05

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
        Click and choose some.
      </Link>
    </Alert>
  ) : (
    <Container
      maxWidth={false}
      sx={{
        width: '80%',
        backgroundColor: '#f6f6f6',
        border: '2px solid black',
      }}
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
              <div style={{ display: 'flex' }}>
                <Typography variant="h6" component="span" sx={styles.header}>
                  Title
                </Typography>
                <Typography variant="h6" component="span" sx={styles.header}>
                  Quantity
                </Typography>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{
                    flex: '1',
                    width: '25%',
                    fontWeight: 'bold',
                    marginLeft: '-50px',
                  }}
                >
                  Price
                </Typography>
              </div>
            }
          />
        </ListItem>
        {groupedCartItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={item.book.title}
              sx={{ flex: '1', width: '25%' }}
            />
            <Box
              sx={{
                flex: '1',
                width: '25%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}
            >
              <IconButton
                aria-label="add"
                onClick={() => handleIncreaseQuantity(item)}
                sx={{ padding: '0', marginLeft: '30px' }}
              >
                <Box
                  sx={{
                    backgroundColor: '#5a228b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AddIcon sx={{ color: 'white' }} />
                </Box>
              </IconButton>
              <IconButton
                sx={{ padding: '10px 10px', color: 'black !important' }}
                disabled
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ListItemText primary={item.quantity} />
                </Box>
              </IconButton>
              <IconButton
                aria-label="remove"
                onClick={() => handleDecreaseQuantity(item)}
                sx={{ padding: '0' }}
              >
                <Box
                  sx={{
                    backgroundColor: '#5a228b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <RemoveIcon sx={{ color: 'white' }} />
                </Box>
              </IconButton>
            </Box>
            <ListItemText
              primary={`$${item.subtotal.toFixed(2)}`}
              sx={{ flex: '1', width: '25%' }}
            />
            <ListItemSecondaryAction>
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveFromCart(item)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={8}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloseIcon />}
            onClick={handleClearCart}
            disabled={cart.items.length === 0}
            fullWidth
          >
            Clear Cart
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckIcon />}
            onClick={handleCheckout}
            disabled={cart.items.length === 0}
            fullWidth
          >
            Checkout (${totalPrice.toFixed(2)})
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          p: 2,
          backgroundColor: '#f0f0f0',
          borderTop: '2px solid black',
        }}
      >
        <Typography variant="subtitle1" component="span">
          Base Price: ${basePrice.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" component="span">
          Discount: ${discount.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" component="span">
          Delivery Cost: ${deliveryCost.toFixed(2)}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: 'bold', color: '#5a228b' }}
        >
          Total: ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Container>
  )
}

export default Cart
