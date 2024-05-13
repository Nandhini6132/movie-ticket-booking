import React from 'react'
import { auth } from '../../firebase/firebase'
import { Container } from 'react-bootstrap'
import { Box, Stack, Typography } from '@mui/material'

const ProfileHeader = () => {
  return (
    <Container fluid className="profileContainer" style={{background:'white'}}>
    <Container>
      <Stack direction="row" gap={3}>
        <img
          src={auth?.currentUser?.photoURL}
          alt={auth?.currentUser?.displayName}
          width={"100px"}
          style={{ borderRadius: "50%" }}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Typography variant="h4">
            {auth?.currentUser?.displayName}
          </Typography>
          <Typography variant="h6">{auth?.currentUser?.email}</Typography>
        </Box>
      </Stack>
    </Container>
  </Container>
  )
}

export default ProfileHeader