import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import '../../components/header/Header.css'
import {Link} from 'react-router-dom'
import CardMedia from "@mui/material/CardMedia";
import Avatar from '@mui/material/Avatar';
import { CardActionArea } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
const Header = ({handleLogin, user,handleLogOut}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [location,setLocation]= useState('')
  console.log(location)


  return (
    <>
      <Navbar expand="lg" className="ps-2 pe-5" style={{boxShadow:'0 0px 0px 2px #f3f3f3', background:'white'}}>
        <Container fluid>
          <Navbar.Brand href="#home" className="d-flex align-items-center" style={{height:'80px'}}>
           <Stack >
           <Typography variant="h6" className="colan">COLAN <small className="cinemas">Cinemas</small> </Typography>
            {/* <Typography variant="body2">Cinemas</Typography> */}
           </Stack>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-3">
              <Link to={'/'} style={{textDecoration:'none', color:'#ffbf00', fontSize:'30px', fontWeight:'600'}}>              <Nav href="#home">Home</Nav></Link>
            </Nav>
            <Nav className="ms-auto d-flex gap-3">
              {/* <Nav onClick={handleOpen}>{location?location:'Choose Location'}</Nav> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Stack gap={5} sx={style}>
                  {cities?.map((city) => (
                   <figure className="snip1543" onClick={()=>setLocation(city.city)}>
                   <img src={city.img} />
                   <figcaption>
                     <h3>{city.city}</h3>

                   </figcaption>

                 </figure>
                  ))}

                  {/* <Button className="btn " onClick={handleClose}>Selected location: {location}</Button> */}
                </Stack>
              </Modal>
              {/* <Nav onClick={user?handleLogOut:handleLogin}>{user?'Logout':'Login'}</Nav> */}
              <Nav>
                {user?<Link to={'/personalDetail'}><Avatar src={auth?.currentUser?.photoURL} alt={auth?.currentUser?.displayName}></Avatar></Link>:
                <button className="btn btn-outline-warning text-dark" onClick={handleLogin}>Login</button>}
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const cities = [
  {
    id: 1,
    city: "Vellore",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTln7K50fBCH6XalMwAk1Egd6LvZeoZoieL94HFHS8VgQovS8nqLXebYRhxIkCZLPC8IrY&usqp=CAU",
  },

  {
    id: 2,
    city: "Chennai",
    img: "https://media-cdn.tripadvisor.com/media/photo-s/15/af/42/b1/central-railway-station.jpg",
  },
];
export default Header;
