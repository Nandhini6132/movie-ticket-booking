import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { auth } from "../../firebase/firebase";
import { Box, Typography, Stack, Grid, Drawer } from "@mui/material";
import ProfileSideBar from "./ProfileSideBar";
import PersonalDetail from "./PersonalDetail";
import ProfileHeader from "./ProfileHeader";

const Profile = ({}) => {
  return (
    <>
    
    <Grid container>
        <ProfileHeader />
        <Container>
        <Grid item md={4}>
          <ProfileSideBar />
        </Grid>

        <Grid item md={8}>
          <PersonalDetail />
        </Grid>
        </Container>
      </Grid>
  
    </>
  );
};

export default Profile;
