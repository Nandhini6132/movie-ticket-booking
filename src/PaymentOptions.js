import * as React from "react";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

import List from "@mui/material/List";

import Typography from "@mui/material/Typography";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";





import PaymentIcon from '@mui/icons-material/Payment';

const drawerWidth = 340

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});





const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sidebar = [
  {
    title: "Choose your payment options",
    menus: [
      {
        id: 1,
        title: "UPI",
        navigate: "/upiPage",
        icon: PaymentIcon,
      },
     
    ],
  },

];


function PaymentOptions({ setDark, children, themes }) {
  console.log(setDark)

  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
//   const opens = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const [activeMenu, setActiveMenu] = useState("");

//   const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

//   const handleSubMenuToggle = () => {
//     setIsSubMenuOpen((prev) => !prev);
//   };
//   const [openAccordionId, setOpenAccordionId] = useState(null);

//   const handleAccordionToggle = (accordionId) => {
//     setOpenAccordionId(openAccordionId === accordionId ? null : accordionId);
//   };

  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Box sx={{ display: "flex" }} style={themes}>
      
    

      <Drawer
        variant="permanent"
        open={open}
        className="drawer"
        // sx={{ width: "300px" }}
        PaperProps={{ style: { maxWidth: "25%", top:'96px' } }}
      >
    

    
       
        <div className="drawer-content" sx={{ width: "100%" }}>
          {children}
        </div>

        {/* Messed UP */}

        <List onMouseOver={handleDrawerOpen}>
          {sidebar.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <Typography
                ml={3}
                variant="h6"
                color={"#72849A"}
                fontFamily={"system-ui"}
                fontSize={"large"}
                mb={2}
              >
                {section.title}
              </Typography>

              {section.menus.map((menu, menuIndex) => (
                <div key={menuIndex}>
                  {menu.submenus ? (
                    // Use Accordion for submenus
                 <></>
                  ) : (
                    // Regular ListItem for non-submenu items
                    <ListItem
                      key={menu.id}
                      onClick={() => {
                        navigate(menu.navigate);
                      }}
                      disablePadding
                      sx={{
                        display: "block",
                        mt: 2,
                      }}
                    >
                      <ListItemButton
                        onClick={() => setSelectedIndex(menu.id)}
                        style={
                          selectedIndex === menu.id
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
                          {React.createElement(menu.icon)}
                        </ListItemIcon>
                        <ListItemText
                          primaryTypographyProps={{ variant: "subtitle1" }}
                          primary={menu.title}
                          sx={{ opacity: open ? 1 : 0, color: "#72849A" }}
                          style={
                            selectedIndex === menu.id ? { color: "skyblue" } : {}
                          }
                        />
                   
                      </ListItemButton>
                    </ListItem>
                  )}
                </div>
              ))}
            </div>
          ))}
        </List>
      
      </Drawer>
 
    </Box>
  
  );
}

export default PaymentOptions;
