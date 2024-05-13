import { useState, useEffect } from "react";
import Header from "./components/header/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import Tmdb from "../src/Tmdb";
import MovieListing from "./components/movies/MovieListing";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import MovieSessions from "./components/moviesessions/MovieSessions";
import MovieTicket from "./components/ticket/MovieTicket";
import { PhoneAuthProvider } from "firebase/auth";
import UpiPage from './UpiPage'
import { signInWithPopup, signInWithPhoneNumber, signInWithCredential } from "firebase/auth";
import { auth, provider } from "./firebase/firebase";
import Booking from "./components/booking/Booking";
import Profile from "./components/profile/Profile";
import PersonalDetail from "./components/profile/PersonalDetail";
import MyBookings from "./components/profile/MyBookings";
import { useDispatch } from "react-redux";
import { fetchCastAndCrew, fetchMovieToGetDetails } from "./slice/MovieSlice";

function App() {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState(0);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [maritalStatus, setMaritalStatus]= useState();
  const [gender, setGender]= useState();
  const [dob, setDob]= useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isPaymentConfirmed, setIsPaymentConfirmed]= useState(false)
  const [isDisabled, setIsDisabled]= useState(false)
  const [rowNo, setRowNo]= useState([])
  const[seatNo, setSeatNo]= useState([])
  console.log(user);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) setUser(user.displayName);
      else setUser(null);
    });
  }, []);
  const handleLogin = async () => {
    const name = await signInWithPopup(auth, provider);
    console.log(auth.currentUser.displayName);
    // setUser(auth.currentUser.displayName)
  };

  const handleLogOut = async () => {
    await auth.signOut();
  };
  const handleChange = (event, newValue) => {
    console.log(newValue, "new");
    setValue(newValue);
  };
  const handleGetDetail = () => {
    console.log(auth.currentUser);
    setName(auth.currentUser?.displayName);
    setEmail(auth.currentUser?.email);
  };
  const handleVerifyPhone = async () => {
    const phoneNumber = '+6374876300';
    try {
       const verificationId = await signInWithPhoneNumber(auth, phoneNumber);
       console.log('Phone number verification initiated');
   
       const otp = window.prompt('Enter OTP');
   
       const credential = PhoneAuthProvider.credential(verificationId, otp);
       await signInWithCredential(auth, credential);
   
       console.log('Phone number verified successfully');
    } catch (error) {
       console.error('Phone authentication error:', error);
    }
   };
   const [drawer, setDrawer] = useState(false);
   const dispatch= useDispatch()
   const toogleOpen = async (id) => {
    setDrawer(true);
    dispatch(fetchCastAndCrew(id));
    dispatch(fetchMovieToGetDetails(id));
   
  };
  const toogleClose = () => {
    setDrawer(false);
  };
  

  return (
    <div className="App">
      <Header
        handleLogin={handleLogin}
        setUser={setUser}
        user={user}
        handleLogOut={handleLogOut}
      />
      <Routes>
        <Route path="/" index element={<Home  user={user} handleLogin={handleLogin}/>} />
        <Route
          path="/moviesessions/:id"
          index
          element={<MovieSessions handleChange={handleChange} value={value}  toogleOpen={toogleOpen} toggleClose={toogleClose}/>}
        />
        <Route
          path="/moviesessions/:id/ticket/:time"
          element={
            <MovieTicket
              user={user}
              value={value}
              handleLogin={handleLogin}
              handleGetDetail={handleGetDetail}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              handleVerifyPhone={handleVerifyPhone}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              isPaymentConfirmed={isPaymentConfirmed}
              setIsPaymentConfirmed={setIsPaymentConfirmed}
              isDisabled={isDisabled}
              setIsDisabled={setIsDisabled}
              rowNo={rowNo}
              setRowNo={setRowNo}
              seatNo={seatNo}
              setSeatNo={setSeatNo}
              setMaritalStatus={setMaritalStatus}
              setGender={setGender}
              gender={gender}
              setDob={setDob}
              dob={dob}
              maritalStatus={maritalStatus}
             
              
             
            />
          }
        />
        <Route path="/:id/:time/booking" element={<Booking  value={value} user={user}/>} />
        <Route path="/upiPage" element={<UpiPage selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} user={user}  isPaymentConfirmed={isPaymentConfirmed}
              setIsPaymentConfirmed={setIsPaymentConfirmed} isDisabled={isDisabled} setIsDisabled={setIsDisabled}  rowNo={rowNo}
              setRowNo={setRowNo}
              seatNo={seatNo}
              setSeatNo={setSeatNo}/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/personalDetail" element={<PersonalDetail handleLogOut={handleLogOut}/>}/>
        <Route path="/personalDetail/myBooking" element={<MyBookings user={user} selectedSeats={selectedSeats}/>}/>
      
      </Routes>
    </div>
  );
}

export default App;
