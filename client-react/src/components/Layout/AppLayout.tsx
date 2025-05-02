

// import { Link, Outlet } from 'react-router-dom';
// import AccountMenu from './AccountMenu'
// import { Box, Drawer, Toolbar, Avatar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import SettingsIcon from '@mui/icons-material/Settings';
// import CreateAvatar from '../login/CreateAvatar';

// const drawerWidth = 240;

// const AppLayout = () => {
//     return(<>
//             {/* <div style={{ width: "100%", height: '100%' }}>
//             <div style={{ backgroundColor: '#FFC300', position: 'sticky', top: '0', zIndex: 1000, display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
//                 <nav style={{ marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row-reverse' }}>
//                     <Link to="/" style={{ margin: '0 10px' }}>HomePage</Link>
//                     <Link to="/MyMeetings" style={{ margin: '0 10px' }}>myMeetings</Link>
//                     <Link to="/CreateMeeting" style={{ margin: '0 10px' }}>create meeting</Link>
//                     {user.id != 0 && <Link to='/RecipeForm'>Add recipe </Link>}
//                 </nav>
//                 <AccountMenu />
//             </div>
//             <div >
//                 <Outlet />
//             </div>
//         </div> */}

// <Box sx={{ display: 'flex' }}>
//             <Drawer
//                 variant="permanent"
//                 sx={{
//                     width: drawerWidth,
//                     flexShrink: 0,
//                     [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//                 }}
//             >
//                 <Toolbar />
//                 {/* <Box sx={{ p: 2 }}>
//                     <Avatar sx={{ bgcolor: '#3b3c71', mb: 1 }}>
//                         {user.mail.charAt(0).toUpperCase()}
//                     </Avatar>
//                     <Typography variant="subtitle1">{user.mail}</Typography>
//                     <Typography variant="caption">{user.companyName}</Typography>
//                 </Box> */}
//                 <div style={{ paddingLeft: '85px',paddingBottom:'15px', textAlign: 'center' }}>
//                  <CreateAvatar/>
//                 </div>
//                 <List>
//                     <ListItem component="button">
//                         <ListItemIcon><HomeIcon /></ListItemIcon>
//                         <ListItemText primary="Home" />
//                     </ListItem>
//                     <ListItem component="button">
//                         <ListItemIcon><SettingsIcon /></ListItemIcon>
//                         <ListItemText primary="Settings" />
//                     </ListItem>
//                 </List>
//             </Drawer>
//             {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//                 <Toolbar /> //Spacer for drawer height
//                 {children}
//             </Box> */}
//         </Box>
//     </>)
// }

// export default AppLayout;

import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import PeopleIcon from "@mui/icons-material/People";
  import AddCircleIcon from "@mui/icons-material/AddCircle";
  import { useState } from "react";
  import { useNavigate, Outlet } from "react-router-dom";
  import CreateAvatar from "../login/CreateAvatar";
  
  const drawerWidth = 300;
  
  const AppLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:900px)");
    const navigate = useNavigate();
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <Box>
        <Box mb={3} sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <Toolbar>
            <CreateAvatar />
          </Toolbar>
        </Box>
  
        <List>
          <Box mb={3}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("create-meeting")}>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Create Meeting" />
              </ListItemButton>
            </ListItem>
          </Box>
          <Box mb={3}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("my-meetings")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="My Meetings" />
              </ListItemButton>
            </ListItem>
          </Box>
        </List>
      </Box>
    );
  
    return (
      <Box sx={{ display: "flex" }}>
        {isMobile && (
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                My App
              </Typography>
            </Toolbar>
          </AppBar>
        )}
  
        <Box component="nav">
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                borderTopRightRadius: "40px",
                borderBottomRightRadius: "40px",
                backgroundColor: "#fff", // רקע לבן לתפריט
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
  
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {isMobile && <Toolbar />} {/* מוסיף רווח מתחת ל-AppBar במובייל */}
          <Outlet /> {/* עמודים פנימיים נטענים כאן */}
        </Box>
      </Box>
    );
  };
  
  export default AppLayout;
  