"use client"

import { useState, useContext } from "react"
import { useNavigate, Outlet, useLocation } from "react-router-dom"
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
  Divider,
  useTheme,
}
from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import PeopleIcon from "@mui/icons-material/People"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import DashboardIcon from "@mui/icons-material/Dashboard"
import CreateAvatar from "../login/CreateAvatar"
import { UserContext } from "../login/UserReducer"
import "../../theme.css"

const drawerWidth = 280

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate()
  const location = useLocation()
  const [user] = useContext(UserContext)

  // const [setAnchorEl] = useState<null | HTMLElement>(null);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const isActive = (path: string) => {
    return location.pathname.includes(path)
  }

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/app",
      role: ["teamLeader", "developer"],
    },
    {
      text: "Create Meeting",
      icon: <AddCircleIcon />,
      path: "/app/create-meeting",
      role: ["teamLeader"],
    },
    {
      text: "My Meetings",
      icon: <PeopleIcon />,
      path: "/app/my-meetings",
      role: ["teamLeader", "developer"],
    },
  ]

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) => item.role.includes(user.role))

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* User Profile Section */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <CreateAvatar />
        </Box>
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {user.mail}
        </Typography>
        <Typography variant="body2" color="#7f8c8d" noWrap>
          {user.role === "teamLeader" ? "Team Leader" : "Developer"}
        </Typography>
        <Typography variant="caption" color="#7f8c8d" noWrap>
          {user.companyName}
        </Typography>
      </Box>

      <Divider />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, px: 2, py: 2 }}>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path)
                if (isMobile) setMobileOpen(false)
              }}
              sx={{
                borderRadius: "8px",
                backgroundColor: isActive(item.path) ? "rgba(255, 112, 67, 0.12)" : "transparent",
                color: isActive(item.path) ? "#2c3e50" : "inherit",
                "&:hover": {
                  backgroundColor: isActive(item.path) ? "rgba(255, 112, 67, 0.16)" : "rgba(255, 112, 67, 0.08)",
                },
                transition: "all 0.2s ease-in-out",
                py: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "40px",
                  color: isActive(item.path) ? "#ff7043" : "#7f8c8d",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 400,
                  color: isActive(item.path) ? "#2c3e50" : "#7f8c8d",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: "1px solid #f0f0f0", padding:"25px" }}>@All Rights Save<br/>
        Ahuva Vinograd 2025
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "white",
            color: "#2c3e50",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 600 }}>
              DevNote
            </Typography>
            <Box sx={{ mb: 2, paddingTop: "13px" }}>
              <CreateAvatar />
            </Box>
          </Toolbar>
        </AppBar> 
      )}

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #f0f0f0",
              boxShadow: isMobile ? "0 4px 20px rgba(0,0,0,0.1)" : "none",
              backgroundColor: "white",
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
          p: { xs: 2, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#f8f9fa",
          overflow: "auto",
        }}
      >
        {isMobile && <Toolbar />}
        <Outlet />
      </Box>
    </Box>
  )
}

export default AppLayout

















//עם קובץ עיצוב נפרד
// import React, { useState } from "react"
// import { Box, AppBar, Toolbar, IconButton, Typography, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import { useNavigate, Outlet, useLocation } from "react-router-dom"
// import CreateAvatar from "../login/CreateAvatar"
// import '../../css/AppLayout.css'

// const drawerWidth = 280

// interface User {
//   mail: string
//   role: string
//   companyName: string
// }

// interface MenuItem {
//   text: string
//   path: string
//   icon: React.ReactNode
// }

// interface Props {
//   user: User
//   menuItems: MenuItem[]
//   isMobile: boolean
// }

// export default function AppLayout({ user, menuItems, isMobile }: Props) {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const navigate = useNavigate()
//   const location = useLocation()

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen)
//   }

//   const isActive = (path: string) => {
//     return location.pathname === path
//   }

//   // אפשר כאן לסנן את התפריט לפי תפקיד
//   const filteredMenuItems = menuItems.filter(item => {
//     // לדוגמה - אם צריך לפי תפקיד
//     if (user.role === "teamLeader") return true
//     // או סינון מותאם אישית
//     return true
//   })

//   return (
//     <Box className="appLayoutRoot">
//       {isMobile && (
//         <AppBar position="fixed" className="appBarMobile">
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2 }}
//               aria-label="open drawer"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap className="toolbarTitle">
//               DevNote
//             </Typography>
//             <Box className="avatarBoxToolbar">
//               <CreateAvatar />
//             </Box>
//           </Toolbar>
//         </AppBar>
//       )}

//       <Box component="nav" className="navBox" sx={{ width: { md: drawerWidth } }}>
//         <Drawer
//           variant={isMobile ? "temporary" : "permanent"}
//           open={isMobile ? mobileOpen : true}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           classes={{
//             paper: `${"drawerPaper"} ${isMobile ? "drawerPaperMobile" : ""}`,
//           }}
//         >
//           <Box className="drawerContainer">
//             <Box className="userProfileSection">
//               <Box className="userAvatarBox">
//                 <CreateAvatar />
//               </Box>
//               <Typography variant="subtitle1" fontWeight={600} noWrap>
//                 {user.mail}
//               </Typography>
//               <Typography variant="body2" color="#7f8c8d" noWrap>
//                 {user.role === "teamLeader" ? "Team Leader" : "Developer"}
//               </Typography>
//               <Typography variant="caption" color="#7f8c8d" noWrap>
//                 {user.companyName}
//               </Typography>
//             </Box>

//             <Divider />

//             <List className="menuList">
//               {filteredMenuItems.map((item) => {
//                 const active = isActive(item.path)
//                 return (
//                   <ListItem
//                     key={item.text}
//                     disablePadding
//                     className="menuListItem"
//                     sx={{
//                       backgroundColor: active ? "rgba(255, 112, 67, 0.12)" : "transparent",
//                       color: active ? "#2c3e50" : "inherit",
//                       "&:hover": {
//                         backgroundColor: active ? "rgba(255, 112, 67, 0.16)" : "rgba(255, 112, 67, 0.08)",
//                       },
//                       borderRadius: "8px",
//                       transition: "all 0.2s ease-in-out",
//                       py: 1,
//                       mb: 1,
//                     }}
//                   >
//                     <ListItemButton
//                       onClick={() => {
//                         navigate(item.path)
//                         if (isMobile) setMobileOpen(false)
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           minWidth: "40px",
//                           color: active ? "#ff7043" : "#7f8c8d",
//                         }}
//                       >
//                         {item.icon}
//                       </ListItemIcon>
//                       <ListItemText
//                         primary={item.text}
//                         primaryTypographyProps={{
//                           fontWeight: active ? 600 : 400,
//                           color: active ? "#2c3e50" : "#7f8c8d",
//                         }}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 )
//               })}
//             </List>

//             <Box className="footerBox">
//               @All Rights Save
//               <br />
//               Ahuva Vinograd 2025
//             </Box>
//           </Box>
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         className="mainContent"
//         sx={{ p: { xs: 2, md: 4 } }}
//       >
//         {isMobile && <Toolbar />}
//         <Outlet />
//       </Box>
//     </Box>
//   )
// }

