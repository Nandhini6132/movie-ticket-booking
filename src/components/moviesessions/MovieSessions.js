import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieToGetDetails } from "../../slice/MovieSlice";
import TextField from "@mui/material/TextField";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieToGetDetails(id));
  }, []);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const MovieSessions = ({ handleChange, value, toogleOpen }) => {
  const date = new Date();
  const todayDate = date.getDate();
  const getMonth = date.getMonth();
  const getDay = date.getDay();

  const { id } = useParams();
  console.log(date, "date");

  console.log(todayDate, getMonth, getDay);
  let month;
  let day;

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

  console.log(month);

  switch (getDay) {
    case 1:
      day = "Mon";
      break;

    case 2:
      day = "Tue";
      break;

    case 3:
      day = "Wed";
      break;

    case 4:
      day = "Thru";
      break;

    case 5:
      day = "Fri";
      break;

    case 6:
      day = "Sat";
      break;

    default:
      day = "Sun";
      break;
  }

  console.log(day);
  let today;
  let tomarrow;
  if (todayDate) {
    today = "Today";
  }

  console.log(today, tomarrow);

  const movieselector = useSelector((state) => state.allMovie.movieDetail);
  const runtimeInMinutes = movieselector.runtime;
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;

  const releaseDate = movieselector.release_date;

  const dateObj = new Date(releaseDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);




  const showTime = ["07:10 AM", "11:00 AM", "02:00 PM", "06:00 PM"];
  
  const getCurrentTime = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const currentTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return currentTime;
  };
  
  const isTimePast = (currentTime, showTime) => {

    const [showHours, showMinutes, showPeriod] = showTime.split(/:| /);
    let hours = parseInt(showHours, 10);
    if (showPeriod === "PM" && hours !== 12) {
      hours += 12;
    } else if (showPeriod === "AM" && hours === 12) {
      hours = 0;
    }
    const showTime24 = `${hours < 10 ? '0' + hours : hours}:${showMinutes}`;
  
   
    return currentTime > showTime24;
  };
  
  const currentTime = getCurrentTime();
  return (
    <>
      <Container fluid className="p-0">
        <Box>
          <div
            className="moviesessionBg"
            style={{
              backgroundImage: `linear-gradient(to right, rgb(0 59 255 / 51%), rgb(22 43 63 / 58%)), url(https://image.tmdb.org/t/p/original/${movieselector.backdrop_path})`,
              height: "420px",
              backgroundPosition: "center",
            }}
          >
            <Box className="h-100" ml={25} mr={25}>
              <div className="d-flex" style={{ height: "100%" }}>
                <div className="d-flex align-items-center ">
                  <img
                    className=""
                    src={`https://image.tmdb.org/t/p/original/${movieselector.poster_path})`}
                    alt=""
                    width={200}
                    height={350}
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                <Stack ml={30} mt={5} sx={{ color: "white" }}>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {movieselector.original_title}
                  </Typography>
                  <Stack direction={"row"}>
                    {" "}
                    U
                    <ul
                      className="d-flex gap-5"
                      style={{ listStyleType: "disc" }}
                    >
                      <li>{`${hours}h ${minutes}min`}</li>
                      <li>{formattedDate}</li>
                      <li>
                        {" "}
                        <li className="d-flex gap-2">
                          {movieselector.genres?.map((a) => (
                            <p>{a.name}</p>
                          ))}
                        </li>
                      </li>
                      <li>English</li>
                    </ul>
                  </Stack>

                  <Stack className="mt-5">
                    <Typography className="mt-2">
                      {movieselector.overview}
                    </Typography>
                  </Stack>

                  <a
                    href="#"
                    onClick={() => toogleOpen(id)}
                    style={{ color: "white" }}
                    className="mt-4"
                  >
                    View Details
                  </a>
                </Stack>
              </div>
            </Box>
          </div>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              background: "white",
            }}
            pl={25}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{
                style: { backgroundColor: "#ffbf008a" },
              }}
            >
              <Tab
                label="Today"
                {...a11yProps(0)}
                sx={{
                  "&.Mui-selected": {
                    color: "black",
                    background: "#ffbf0024;",
                  },
                }}
              />
              <Tab
                label="Tomarrow"
                {...a11yProps(1)}
                sx={{
                  height: "80px",
                  "&.Mui-selected": {
                    color: "black",
                    background: "#ffbf0024;",
                  },
                }}
              />
              <Tab
                label={`${todayDate + 2}th ${month}`}
                {...a11yProps(2)}
                sx={{
                  "&.Mui-selected": {
                    color: "black",
                    background: "#ffbf0024;",
                  },
                }}
              />
            </Tabs>
          </Box>

          <CustomTabPanel
            value={value}
            index={0}
   
          >
            <Stack direction="row" gap={4} sx={{ cursor: "pointer", background: "white",
               margin: "5rem 10rem",
               borderRadius: "18px",
               padding: "5rem 3rem"}}>
              {showTime.map((time) => (
                <>
                  <Link to={isTimePast(currentTime, time) ? "#" : `/moviesessions/${id}/ticket/${time}`}>
                    {" "}
                    <TextField
                      id="outlined-read-only-input"
                      label="English"
                      defaultValue={time}
                      InputProps={{
                        readOnly: true,
                        disabled: isTimePast(currentTime, time),
                      }}
                      sx={{
                        width: "100px",
                        input: {
                          cursor: isTimePast(currentTime, time) ? "not-allowed" : "pointer",
                          background: isTimePast(currentTime, time) ? "#f5f5f5" : "#346ec22b",
                          pointerEvents: isTimePast(currentTime, time) ? 'none' : 'auto',
                        },
                      }}
                    />
                  </Link>
                </>
              ))}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Stack direction="row" gap={4} sx={{ cursor: "pointer",background: "white",
               margin: "5rem 10rem",
               borderRadius: "18px",
               padding: "5rem 3rem" }}>
              {showTime.map((time) => (
                <>
                  <Link to={`/moviesessions/${id}/ticket/${time}`}>
                    {" "}
                    <TextField
                      id="outlined-read-only-input"
                      label="English"
                      defaultValue={time}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        width: "100px",
                        input: { cursor: "pointer", background: "#346ec22b;" },
                      }}
                    />
                  </Link>
                </>
              ))}
            </Stack>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Stack
              direction="row"
              gap={4}
              sx={{ cursor: "pointer", pl: "200px",background: "white",
              margin: "5rem 10rem",
              borderRadius: "18px",
              padding: "5rem 3rem" }}
            >
              {showTime.map((time) => (
                <>
                  <Link to={`/moviesessions/${id}/ticket/${time}`}>
                    {" "}
                    <TextField
                      id="outlined-read-only-input"
                      label="English"
                      defaultValue={time}
                      InputProps={{
                        readOnly: true,
                      }}
                      sx={{
                        width: "100px",
                        input: { cursor: "pointer", background: "#346ec22b;" },
                      }}
                    />
                  </Link>
                </>
              ))}
            </Stack>
          </CustomTabPanel>
        </Box>
      </Container>
    </>
  );
};


export default MovieSessions;
