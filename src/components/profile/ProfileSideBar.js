import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Grid, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from "@mui/icons-material/Payment";
import { Container } from "react-bootstrap";

const drawerWidth = 340;

const ProfileSideBar = ({ children, handleLogOut }) => {
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const noLogot=()=>{}

  const sidebar = [
    {
      id: 1,
      title: "Personal Details",
      navigate: "/personalDetail",
      icon: PaymentIcon,
      logout:noLogot
    },
  
    {
      id:2,
      title:'My Bookings',
      navigate:'/personalDetail/myBooking',
      icon:BookmarkIcon,
      logout:noLogot
    },
  
    {
      id:3,
      title:'Logout',
      navigate:'/',
      icon:LogoutIcon,
      logout:handleLogOut
      
    }
  ];
  return (
    
      <Grid container height={'100%'}>
        <Grid item >
          <Drawer
            variant="permanent"
            open={open}
            className="drawer"
            sx={{height:'100%'}}
            PaperProps={{ style: { position: "relative", backgroundColor:'white', border:'1px solid #eaeaea', borderRadius:'20px'} }}
          >
          
            {/* Messed UP */}

            <List onMouseOver={handleDrawerOpen}>
              {sidebar.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  <ListItem
                    key={section.id}
                    onClick={() => {
                      navigate(section.navigate);
                      {section?.logout()}
                    }}
                    disablePadding
                    sx={{
                      display: "block",
                      mt: 2,
                    }}
                  >
                    <ListItemButton
                      onClick={() => setSelectedIndex(section.id)}
                      style={
                        selectedIndex === section.id
                          ? { backgroundColor: "#F2F9FE" }
                          : {}
                      }
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {React.createElement(section.icon)}
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "subtitle1",
                        }}
                        primary={section.title}
                        sx={{ opacity: open ? 1 : 0, color: "#72849A" }}
                        style={
                          selectedIndex === section.id
                            ? { color: "skyblue" }
                            : {}
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </div>
              ))}
            </List>
          </Drawer>
        </Grid>
      </Grid>
 
  );
};


export default ProfileSideBar;
