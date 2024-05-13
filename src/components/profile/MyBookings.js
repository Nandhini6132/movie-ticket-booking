import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { Box, Grid, Typography, Stack } from "@mui/material";
import ProfileHeader from "./ProfileHeader";
import ProfileSideBar from "./ProfileSideBar";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
const MyBookings = ({ user, selectedSeats }) => {
  const date = new Date();
  const todayDate = date.getDate();
  const getMonth = date.getMonth();
  let month;
  switch (getMonth) {
    case 0:
      month = "Jan";
      break;
    case 1:
      month = "Feb";
      break;
    case 2:
      month = "Mar";
      break;
    case 3:
      month = "Apr";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "Jun";
      break;
    case 6:
      month = "Jul";
      break;
    case 7:
      month = "Aug";
      break;
    case 8:
      month = "Sep";
      break;
    case 9:
      month = "Oct";
      break;
    case 10:
      month = "Nov";
      break;
    case 11:
      month = "Dec";
      break;
    default:
      month = "";
  }
  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );

  const length = showDetailsSelector.length;
  const slicedArray = showDetailsSelector.slice(length - 1, length);
  const userId = auth?.currentUser?.uid;
  const [getData, setGetData] = useState([]);

  const handleCancelTicket = async (id) => {
    const docRef = doc(db, userId, id);
    await deleteDoc(docRef);
    setGetData((prevData) => prevData.filter((ticket) => ticket.idDoc !== id));
  };
  useEffect(() => {
    const handleGetData = async () => {
      try {
        if (userId) {
          const q = query(collection(db, userId));
          const querySnapshot = await getDocs(q);
          let a = [];
          querySnapshot.forEach((doc) => {
            a.push({ idDoc: doc.id, ...doc.data() });
          });
          setGetData(a);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    handleGetData();
  }, [userId]);
  console.log(getData);

  // const columns = [
  //   { field: "id", headerName: "ID", width: 10 },
  //   { field: "Movie Name", headerName: "movie name", width: 200 },

  //   {
  //     field: "Date",
  //     headerName: "date",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "Time",
  //     headerName: "Time",
  //     type: "number",
  //     width: 90,
  //   },
  //   {
  //     field: "Seat",
  //     headerName: "Seat No",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 130,

  //   },
  //   {
  //     field: "actions",
  //     headerName: "Actions",
  //     sortable: false,
  //     width: 130,
  //     renderCell: (params) => (
  //       <button className="btn" variant="outlined" color="secondary" onClick={() => handleCancelTicket(getData?.map(a=>a.idDoc))}>
  //         Delete Ticket
  //       </button>
  //     ),
  //   },
  // ];

  // const [rows, setRows] = useState([]);

  // useEffect(() => {

  //   const formattedRows = getData.map((ticket,i) => ({
  //      id: i+1,
  //     "Movie Name": ticket.title,
  //     Date: ticket.date,
  //     Time: ticket.time,
  //     Seat: ticket.seat.filter(seat => !seat.includes("[object Object]")).map(seat => seat),
  //   }));
  //   setRows(formattedRows);
  // }, [getData]);
  // const [selectedRows, setSelectedRows] = useState([]);

  return (
    <>
      <Box>
        <ProfileHeader />
        <Container style={{ marginTop: "6rem", height: "20rem" }}>
          <Grid container style={{ height: "100%" }}>
            <Grid item md={4}>
              <ProfileSideBar />
            </Grid>

            <Grid
              item
              md={8}
              sx={{
                background: "white",
                border: "1px solid rgb(234, 234, 234)",
                borderRadius: "20px",
                padding: " 20px",
                height: "320px",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, borderBottom: "1px solid black" }}
              >
                Bookings
              </Typography>

              <Grid item height={"100%"} overflow={"scroll"}>
                {user === auth.currentUser?.displayName &&
                getData.length !== 0 ? (
                  <>
                    {getData?.length === 1 ? (
                      <>
                        {getData.map((a) => (
                          <>
                            <Stack
                              gap={2}
                              textAlign={"center"}
                              height={"100%"}
                              justifyContent={"center"}
                            >
                              <Typography variant="h5">{a.title}</Typography>
                              <Typography variant="body1">
                                <strong>Booking Date:</strong>
                                {a.date}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Booking Time:</strong>
                                {a.time}
                              </Typography>
                              <Stack
                                direction={"row"}
                                justifyContent={"center"}
                                gap={2}
                              >
                                {a.seat
                                    ?.filter(
                                      (seat) =>
                                        !seat.includes("[object Object]")
                                    )
                                  .map((seat, index) => (
                                    <Box
                                      padding={1.5}
                                      bgcolor={"#ffbf00"}
                                      borderRadius={3}
                                      key={index}
                                    >
                                      {seat}
                                    </Box>
                                  ))}
                              </Stack>
                              <button
                                className="btn btn-danger w-25 m-auto"
                                onClick={() => handleCancelTicket(a.idDoc)}
                              >
                                Cancel Ticket
                              </button>
                            </Stack>
                          </>
                        ))}
                      </>
                    ) : (
                      <>
                        {getData.map((a) => (
                          <>
                            <Stack
                              gap={2}
                              display={"flex"}
                              flexDirection={"row"}
                              mt={3} mb={3}
                            >
                              <Box width={"100%"}>
                                <Typography variant="h5">{a.title}</Typography>
                                <Typography variant="body1">
                                  <strong>Booking Date:</strong>
                                  {a.date}
                                </Typography>
                                <Typography variant="body1">
                                  <strong>Booking Time:</strong>
                                  {a.time}
                                </Typography>
                              </Box>

                              <Box width={"100%"} mt={4}>
                                <Stack
                                  direction={"row"}
                                  justifyContent={"center"}
                                  gap={2}
                                >
                                  Seats:
                                  {a.seat
                                    ?.filter(
                                      (seat) =>
                                        !seat.includes("[object Object]")
                                    )
                                    .map((seat, index) => (
                                      <Box key={index}>{seat}</Box>
                                    ))}
                                </Stack>
                               <div style={{textAlign:'center'}}> <button
                                  className="btn btn-danger  m-auto"
                                  onClick={() => handleCancelTicket(a.idDoc)}
                                >
                                  Cancel Ticket
                                </button></div>
                              </Box>
                            </Stack>
                          </>
                        ))}
                      </>
                      // <div style={{ height: 400, width: "100%" }}>
                      //   <DataGrid
                      //     rows={rows}
                      //     columns={columns}
                      //     initialState={{
                      //       pagination: {
                      //         paginationModel: { page: 0, pageSize: 5 },
                      //       },
                      //     }}
                      //     pageSizeOptions={[5, 10]}
                      //     checkboxSelection
                      //     onSelectionModelChange={(newSelection) => {
                      //       setSelectedRows(newSelection.selectionModel);
                      //     }}
                      //     components={{
                      //       Footer: () => (
                      //         <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}>
                      //           {selectedRows.length > 0 && (
                      //             <button className="btn btn-danger" onClick={handleCancelTicket}>
                      //               Cancel Ticket
                      //             </button>
                      //           )}
                      //         </div>
                      //       ),
                      //     }}
                      //   />
                      // </div>
                    )}
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{ textAlign: "center", marginTop: "3rem" }}
                      variant="h6"
                    >
                      No Bookings Found
                    </Typography>
                    <Box sx={{ textAlign: "center" }}>
                      <Link to={"/"}>
                        <button className="btn btn-warning mt-4">
                          Book Now
                        </button>
                      </Link>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default MyBookings;
