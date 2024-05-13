import React,{useEffect} from 'react'
import { Container } from 'react-bootstrap'
import '../home/Home.css'
import axios from 'axios'
import MovieListing from '../movies/MovieListing';

const apiKey = 'EObjMZ8d5K1UnYXuHEVM75s4VC6ukXq6tEERhSNd';
const authorizationHeader = 'Basic R1JERzphM3ROcHhyM2d2Z3E=';
const territory = 'IN';
const apiVersion = 'v200';
const geolocation = '12.996123616765116,79.11269780454043';
const deviceDateTime = '2024-04-10T07:27:08.588Z';

const apiEndpoint = 'https://api-gate2.movieglu.com/';

const Home = ({user, handleLogin}) => {

  return (
    <>
     <Container fluid className='mt-2 p-0'>
        <div className='bg-img'></div>
        <MovieListing user={user} handleLogin={handleLogin}/>
     </Container>
    </>
  )
}

export default Home