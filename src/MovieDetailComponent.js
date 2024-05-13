import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Grid, Divider, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMovieToGetDetails } from "./slice/MovieSlice";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import { Row, Col } from "react-bootstrap";

const MovieDetailComponent = ({ value, user }) => {
  let tax = 4.36;
  const selector = useSelector((state) => state.allMovie.movieDetail);
  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );

  const length = showDetailsSelector.length;
  const slicedArray = showDetailsSelector.slice(length - 1, length);

  const seatInfo = slicedArray?.map((a) => a.comb)?.map((seat) => seat);


  const dispatch = useDispatch();
  const [selectedSeatByUser, setSelectedSeatByUser] = useState([]);

  const amt =
    slicedArray.map((a) => a?.seats) * slicedArray.map((a) => a?.amount);
 
  const date = new Date();
  const todayDate = date.getDate();
  let bookingDate;
  if (value === 0) {
    bookingDate = todayDate;
  } else if (value === 1) {
    bookingDate = todayDate + 1;
  } else {
    bookingDate = todayDate + 2;
  }
  const { id } = useParams();
  const { time } = useParams();
  const documentId = `${bookingDate}-${id}-${time}`;

  useEffect(() => {
    dispatch(fetchMovieToGetDetails(id));
  }, []);

  useEffect(() => {
    const checkIfDataExists = async () => {
      if (user) {
        try {
          const docRef = collection(db, documentId);
          const querySnapshot = await getDocs(docRef);
          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSelectedSeatByUser(data);
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      } else {
        console.log("No user logged in.");
      }
    };

    checkIfDataExists();
  }, [user]);


  return (
    <Container sx={{boxShadow:" -1px -2px 0px #e9dfdf", height:'90vh', pt:4}}>
      <Box>
        <Typography>Booking Summary</Typography>
        <Divider sx={{ borderColor: "black", marginBottom: "5px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${selector.poster_path}`}
              alt="poster"
              style={{ width: "100%", maxWidth: "140px", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: "700" }} variant="body1">
                {selector.original_title}
              </Typography>
              <Stack spacing={1}>
                <ul
                  style={{
                    display: "flex",
                    gap: "35px",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <li>U/A</li>
                  <li>Drama</li>
                  <li>{selector.original_language}</li>
                </ul>
                <Typography variant="h6">
                 
                  {slicedArray?.map(a=>a.date)}, {slicedArray?.map(a=>a.time)}
                </Typography>
                <Typography variant="body1">
                  Colan Cinemas,{" "}
                  <small>
                    near colan infotech,near SBI, Ashraf street, Pernambut,
                    Vellore
                  </small>
                </Typography>

                <small style={{ fontSize: "12px" }}>
                  "எங்களுக்கு வேறு எங்கும் கிளைகள் கிடையாது"{" "}
                  <strong style={{ fontSize: "16px" }}>
                    &nbsp; &nbsp; Masha allah
                  </strong>
                </small>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Divider
          sx={{ borderColor: "black", marginTop: "5px", marginBottom: "10px" }}
        />

        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body2" sx={{ color: "grey" }}>
              SEAT INFO
            </Typography>

            <Typography variant="body2" mt={1}>
              PRIME{" "}
            </Typography>
                  {console.log(seatInfo)}
              {seatInfo?.length>0 ?  <Stack direction="row" spacing={2}>
              {seatInfo.map((a, index) => (
                <Box
                  key={index}
                  sx={{
                    background: "#c29c09",
                    padding: "10px",
                    borderRadius: "7px",
                    color: "white",
                  }}
                >
                  {a}
                </Box>
              ))}
            </Stack>:''}
          </Grid>
        </Grid>
        <Divider
          sx={{ borderColor: "black", marginTop: "5px", marginBottom: "10px" }}
        />

        <Grid container flexDirection={"column"}>
          <Grid item>
            <Typography variant="body2" sx={{ color: "grey" }}>
              TICKETS
            </Typography>
          </Grid>

          <Grid item>
            <Row>
              <Col>
                {slicedArray.map((a) => a?.seats)}*
                {slicedArray.map((a) => a?.amount)}.00
              </Col>
              <Col style={{ textAlign: "end" }}> &#8377;{amt}.00</Col>
            </Row>
          </Grid>

          <Grid item mt={4} mb={7}>
            <Typography variant="body2" sx={{ color: "grey" }}>
              PAYMENT DETAILS
            </Typography>
            <Row>
              <Col>SubTotal</Col>
              <Col style={{ textAlign: "end" }}> &#8377;{amt}.00</Col>
            </Row>

            <Row>
              <Col>Taxes and fees</Col>
              <Col style={{ textAlign: "end" }}>
                &#8377;{Math.floor(tax * slicedArray.map((a) => a?.seats))}.00
              </Col>
            </Row>
          </Grid>
          <Divider
            sx={{
              borderColor: "black",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          />
        </Grid>

        <Grid container flexDirection={"column"}>
          <Grid item>
            <Row>
              <Col>GRAND TOTAL</Col>
              <Col style={{ textAlign: "end" }}>
                {" "}
                &#8377;{amt + tax * slicedArray.map((a) => a?.seats)}
              </Col>
            </Row>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MovieDetailComponent;
