import { Button, Container, Hidden, Typography, useMediaQuery, styled } from "@mui/material"
import { avatarStyle, containerStyle, headingStyle, paragraphStyle, smallDeviceButton, smallDeviceHeadingStyle, smallDeviceParagraphStyle, textStyle } from "../styles/HomePage"
import { Link } from "react-router-dom"

const HomePage = () => {
    const isSmallDevice = useMediaQuery('(max-width: 450px)')
  
    return (
      <Container disableGutters sx={containerStyle}>
        <Hidden mdDown>
          <div style={avatarStyle}></div>
        </Hidden>
        <div style={textStyle}>
          <Typography
            variant="h3"
            sx={isSmallDevice ? smallDeviceHeadingStyle : headingStyle}
          >
            HELLO! <br /> PLEASURE TO MEET YOU.
          </Typography>
          <Typography
            variant="subtitle2"
            sx={isSmallDevice ? smallDeviceParagraphStyle : paragraphStyle}
          >
            In case you are interested in the services of our bookstore
            do not hesitate to create a free account.
          </Typography>
          <StyledButton
            variant="contained"
            sx={isSmallDevice ? smallDeviceButton : null}
          >
            <Link to="/login">TRY IT OUT</Link>
          </StyledButton>
        </div>
      </Container>
    )
  }
  
  export const StyledButton = styled(Button)({
    backgroundColor: '#5a228b',
    alignSelf: 'flex-start',
    marginTop: '30px',
    '&:hover': {
      backgroundColor: '#752eb3',
    },
  })
  

export default HomePage