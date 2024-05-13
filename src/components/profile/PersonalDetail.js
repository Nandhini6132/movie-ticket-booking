import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileSideBar from "./ProfileSideBar";
import { Col, Container, Row } from "react-bootstrap";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const PersonalDetail = ({ handleLogOut }) => {
  const [getData, setGetData] = useState();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const userDocRef = doc(db, "users", userId);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setGetData(userData);
          } else {
            console.log("User document does not exist.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        
      }
    };

    getUserData();
  }, [userId]);

  console.log(getData);
  return (
    <>
      <Box>
        <ProfileHeader />
        <Container style={{ marginTop: "6rem", height: "20rem" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid item md={4}>
              <ProfileSideBar handleLogOut={handleLogOut} />
            </Grid>

            <Grid
              item
              md={8}
              sx={{
                background: "white",
                border: "1px solid rgb(234, 234, 234)",
                borderRadius: "20px",
                padding: " 20px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, borderBottom: "1px solid black" }}
              >
                CONTACT INFORMATION
              </Typography>

              <Stack gap={1} mt={2}>
                <Row>
                  <Col>Full Name</Col>
                  <Col>{auth?.currentUser?.displayName}</Col>
                </Row>

                <Row>
                  <Col>Email</Col>
                  <Col>{auth?.currentUser?.email}</Col>
                </Row>

                <Row>
                  <Col>Phone</Col>
                  <Col>{getData?.phoneNo}</Col>
                </Row>

                <Row>
                  <Col>Gender</Col>
                  <Col>{getData?.gender}</Col>
                </Row>

                <Row>
                  <Col>Marital Status</Col>
                  <Col>{getData?.maritalStatus}</Col>
                </Row>

                <Row>
                  <Col>DOB</Col>
                  <Col></Col>
                </Row>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default PersonalDetail;
