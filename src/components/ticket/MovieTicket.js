import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TextField from "@mui/material/TextField";
import {Grid} from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { Box, Stack, Typography } from "@mui/material";
import {
  fetchMovieToGetDetails,
  getAmount,
  getSeatLength,
  getDate,
  getTime,
  getId,
  getSeatNo,
  getRowNo,
  removeRowAndSeat,
} from "../../slice/MovieSlice";

import { Container, Form } from "react-bootstrap";
import MovieDetailComponent from "../../MovieDetailComponent";

const MovieTicket = ({
  user,
  value,
  handleLogin,
  handleGetDetail,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  handleVerifyPhone,
  selectedSeats,
  setSelectedSeats,
  // isDisabled,
  isPaymentConfirmed,
  rowNo,
  setRowNo,
  seatNo,
  setSeatNo,
  setMaritalStatus,
  setGender,
  gender,
  setDob,
  dob,
  maritalStatus,
}) => {
  const [combo, setCombo] = useState([]);
  // console.log(isDisabled);
  console.log(selectedSeats, "selseat");
  let price = 120;
  let tax = 4.36;

  const currentName = auth.currentUser;

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
  let bookingDate;
  if (value === 0) {
    bookingDate = todayDate;
  } else if (value === 1) {
    bookingDate = todayDate + 1;
  } else {
    bookingDate = todayDate + 2;
  }

  const BookingDate = `${bookingDate}-${month}`;

  const { time } = useParams();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchMovieToGetDetails(id));
    dispatch(getDate(BookingDate));
    dispatch(getTime(time));
    dispatch(getId(id));
  }, []);

  const noOfSeats = selectedSeats
  .filter((seat) => seat.payment === false)
  .flatMap((a) => a.seat).length 

  console.log(noOfSeats)

  // const seatInfo = selectedSeats.filter(
  //   (seat) => seat.userId === currentName?.uid
  // );

  const seatInfo = selectedSeats.filter((a) => a.payment === false);
  const comb = seatInfo.map((seat) => `${seat.rowNo}${seat.seatNo}`);

  const totalPrice = price * noOfSeats;
  console.log(totalPrice, "totprice");
  const grandTotal = totalPrice + tax * noOfSeats;
  console.log(grandTotal, "grtot");

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    setShow(true);
    console.log(totalPrice);
    dispatch(
      getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
    );
  };

  const handleClick = (event) => {
    dispatch(
      getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
    );
  };

  const [fbDocId, setFbDocId] = useState();

  const selector = useSelector((state) => state.allMovie.movieDetail.id);

  const documentId = `${BookingDate}-${id}-${time}`;
  const overAllSeats = [
    { id: 1, rowNo: "A", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    { id: 2, rowNo: "B", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    { id: 3, rowNo: "C", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    { id: 4, rowNo: "D", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    { id: 5, rowNo: "E", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    { id: 6, rowNo: "F", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    { id: 7, rowNo: "G", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    { id: 8, rowNo: "H", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    // { id: 9, rowNo: "I", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    // { id: 10, rowNo: "J", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    // { id: 11, rowNo: "K", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
    // { id: 12, rowNo: "L", seats: [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13] },
  ];

  const handleToggle = async (rowNo, seatNo) => {

    if (user) {
      const seatId = `${time}*${id}*${todayDate}th${month}*seatNo${seatNo}`;
      const isSelected = selectedSeats.find(
        (seat) => seat.rowNo === rowNo && seat.seatNo === seatNo
      );
      dispatch(
        getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
      );
 
      if (isSelected) {
        dispatch(removeRowAndSeat());
        console.log(documentId, "idd");
        // await deleteDoc(doc(db, `${documentId}`, isSelected?.idDoc));
        setSelectedSeats((prevSeats) =>
          prevSeats.filter(
            (seat) => !(seat.rowNo === rowNo && seat.seatNo === seatNo)
          )
        );
      } else {

        dispatch(getSeatNo(seatNo));
        dispatch(getRowNo(rowNo));
        setRowNo((prev) => [...prev, { rowNo }]);
        setSeatNo((prev) => [...prev, { seatNo }]);
      
        // const ab = await addDoc(collection(db, `${documentId}`), {
        //   rowNo,
        //   seatNo,
        //   id: seatId,
        //   status: "selected",
        //   userId: currentName.uid,
        // });
        // console.log(ab, "hkjhjk");

        setSelectedSeats((prevSeats) => [
          ...prevSeats,
          {
            rowNo,
            seatNo,
            id: seatId,
            // idDoc: ab.id,
            status: "selected",
            userId: currentName.uid,
            isSeatConfirmed: "booked",
            payment: isPaymentConfirmed,
          },
        ]);
        
   
      }

     
    }
     else {
      console.log("pls login");
    }
  };

  useEffect(() => {
    dispatch(
      getAmount({ price, noOfSeats, BookingDate, time, grandTotal, comb })
    );
    
  }, [selectedSeats]);

  useEffect(() => {
    const checkIfDataExists = async () => {
      if (user) {
        console.log(documentId);
        const q = query(collection(db, `${documentId}`));
        console.log("Firestore Query:", q);
        const querySnapshot = await getDocs(q);
        console.log("Query Snapshot:", querySnapshot);

        let a = [];
        querySnapshot.forEach((doc) => {
          a.push({ idDoc: doc.id, ...doc.data() });
        });

        setSelectedSeats(a);
        setFbDocId(a.map((item) => item.idDoc));
        console.log("fbDocId:", fbDocId);
        console.log(selectedSeats, "hjkhjkhh");
        console.log(fbDocId);
      } else {
        console.log("no user");
      }
    };

    checkIfDataExists();
  }, [documentId, user]);

  console.log(selectedSeats.map((a) => a.seat).length);
  console.log(selectedSeats.flatMap((a) => a.seat).length);
  const [userData, setUserData] = useState();
  const [userDataExists, setUserDataExists] = useState(false);
  const userDocRef = doc(db, "users", auth.currentUser?.uid);


  useEffect(() => {
    const checkUserDocument = async () => {
      const userDocRef = doc(db, "users", auth.currentUser?.uid);
      const docSnap = await getDoc(userDocRef);
      setUserDataExists(docSnap.exists());
      
    };

    checkUserDocument();
  }, []);
  const saveData = async () => {
    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUserDataExists(true);

        await setDoc(userDocRef, {
          phoneNo: phone,
          gender: gender,
          maritalStatus: maritalStatus,
          name:name,
          email:email
          // dob: dob,
        });
      } else {
        setUserDataExists(true);

        await setDoc(userDocRef, {
          phoneNo: phone,
          gender: gender,
          maritalStatus: maritalStatus,
          name:name,
          email:email
          // dob: dob,
        });
      }
      console.log("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const showDetailsSelector = useSelector(
    (state) => state.allMovie.bookingDetails
  );

  const length = showDetailsSelector.length;
  const slicedArray = showDetailsSelector.slice(length - 1, length);
  const seatInfor = slicedArray?.map((a) => a.comb)?.map((seat) => seat);
  const amt =
  slicedArray.map((a) => a?.seats) * slicedArray.map((a) => a?.amount);
  return (
    <>
      <Container fluid style={{height:'90vh', background:'white'}}>
            <Grid container>
                <Grid item md={8}>
                <div className="screen-container">
          <div className="screen"></div>
          <Box className='screenText'>Screen</Box>
        </div>
       <div className="seatOrder">
       {overAllSeats.map((row, rowIndex) => (
          <div key={row.id} className="div">
            <div>{row.rowNo}</div>
            {row.seats.map((seat, seatIndex) => (
              <div key={seat} onClick={() => handleToggle(row.rowNo, seat)}>
                <button
                  id={`${id}*${todayDate}th${month}*seatNo${seat}`}
                  className={`h6 seat ${
                    selectedSeats.some(
                      (selSeat) =>
                        selSeat.rowNo === row.rowNo && selSeat.seatNo === seat
                    )
                      ? "selected"
                      : ""
                  }`}
                  disabled={selectedSeats.some((selSeat) => {
                    if (!Array.isArray(selSeat.rowNo)) return false;
                    return (
                      selSeat.rowNo.some(
                        (rowObj) => rowObj.rowNo === row.rowNo
                      ) &&
                      selSeat.seatNo.some(
                        (seatObj) => seatObj.seatNo === seat
                      ) &&
                      selSeat.payment === true
                    );
                  })}
                >
                  {seat}
                </button>
              </div>
            ))}
          </div>
        ))}
       </div>
        <Stack direction="row" gap={7} justifyContent={'center'} mt={3}>
          {seatDetails.map((det, i) => (
            <>
              <Stack direction="row" gap={1}>
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: det.color,
                    borderRadius:'3px'
                  }}
                ></div>
                {det.value}
              </Stack>
            </>
          ))}
        </Stack>
        <p style={{textAlign:'center'}} className="mt-3">
          Total No.of seats selected:{" "}
          {
            selectedSeats
              .filter((seat) => seat.payment === false)
              .flatMap((a) => a.seat).length
          }
        </p>
        {console.log(userDataExists)}
        {userDataExists === true ? (
           <Stack width={'20%'} margin={'auto'}>
             <Link to="/upiPage" className="btn btn-warning" onClick={handleClick}>
            Book Now Rs.
            {amt + tax * slicedArray.map((a) => a?.seats)}
            {/* {selectedSeats
              .filter((seat) => seat.payment === false)
              .flatMap((a) => a.seat).length * price} */}
            
          </Link>
           </Stack>
        ) : (
          <Stack width={'20%'} margin={'auto'}>
            <button onClick={handleShow} className="btn btn-warning">
            Book Now Rs.
            {amt + tax * slicedArray.map((a) => a?.seats)}
            {/* {selectedSeats
              .filter((seat) => seat.payment === false)
              .flatMap((a) => a.seat).length * price} */}
            
          </button>
          </Stack>
        )}
                </Grid>

                <Grid item md={4} width={'100%'}>
                  <MovieDetailComponent />
                </Grid>
            </Grid>


{!userDataExists && <>
  <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          // style={{width:'800px'}}
        >
          <Modal.Header closeButton>
            <Modal.Title>Let us know More about you!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="input">
          
              <>
                {/* <Typography>Let us know more about you</Typography> */}
                <button onClick={handleGetDetail} className="btn btn-warning mt-3 mb-3">
                  Get info from Google
                </button>
                <div className="mb-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control form-control-color"
                    id="name"
                    style={{ width: "90%" }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email"> Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-color"
                    style={{ width: "90%" }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control form-control-color"
                    style={{ width: "90%" }}
                  />
                  {/* <button className="btn btn-sm btn-warning" onClick={handleVerifyPhone}>verify</button> */}
                </div>

                <div className="mb-4">
                  <label htmlFor="gender">Gender</label>
                 <div className="d-flex gap-4 mt-2">
                 {["Male", "Female", "Not to disclose"].map((option) => (
                    <div key={option}   style={{cursor:'pointer'}}>
                      <Form.Check
                        type="radio"
                        id={`gender-${option}`}
                        label={option}
                        name="gender"
                        value={option}
                        style={{cursor:'pointer'}}
                        onChange={(e) => setGender(e.target.value)}
                      />
                    </div>
                  ))}
                 </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="maritalStatus">Marital Status</label>
               <div className="d-flex gap-4 mt-2">
               {["Single", "Married", "Unmarried"].map((option) => (
                    <div key={option}>
                      <Form.Check
                        type="radio"
                        id={`maritalStatus-${option}`}
                        label={option}
                        name="maritalStatus"
                        value={option}
                        onChange={(e) => setMaritalStatus(e.target.value)}
                      />
                    </div>
                  ))}
               </div>
                </div>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Basic date picker"
                    value={dob}
                    onChange={() => setDob(date)}
                  />
                </DemoContainer>
              </LocalizationProvider> */}
                <Link to={"/upiPage"}>
                  {" "}
                  <button onClick={saveData} className="btn btn-warning w-100">
                    Proceed
                  </button>
                </Link>
              </>
          
          </Modal.Body>
        </Modal>
</>}

       
      </Container>
    </>
  );
};

const seatDetails = [
  {
    value: "occupied",
    color: "#0532ffc9",
    disable: true,
  },
  {
    value: "available",
    color: "rgb(196 196 196)",
    disable: false,
  },
  {
    value: "selected",
    color: "#ffc107",
    disable: false,
  },
];
export default MovieTicket;
