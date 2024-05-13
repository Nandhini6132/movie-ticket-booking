import React from 'react'
import Grid from '@mui/material/Grid';
import MovieDetailComponent from '../../MovieDetailComponent';
import PaymentOptions from '../../PaymentOptions';
import UpiPage from '../../UpiPage';

const Booking = ({user,value}) => {
  return (
    <>
     <Grid container>
      <Grid item md={2}>
        <PaymentOptions/>
      </Grid>

      <Grid item md={10}>
        <UpiPage/>
      </Grid>

      <Grid item md={3}>
        <MovieDetailComponent user={user} value={value}/>
      </Grid>
     </Grid>
    </>
  )
}

export default Booking