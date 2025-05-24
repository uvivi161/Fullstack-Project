// "use client"

// import type React from "react"

// import { useState } from "react"
// import {
//   Box,
//   Drawer,
//   AppBar,
//   Toolbar,
//   List,
//   Typography,
//   Divider,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Avatar,
//   Menu,
//   MenuItem,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material"
// import { MenuIcon, Home, Calendar, FileText, Users, Settings, LogOut, Bell, ChevronDown } from "lucide-react"

// const drawerWidth = 240

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen)
//   }

//   const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleProfileMenuClose = () => {
//     setAnchorEl(null)
//   }

//   // IMPLEMENTATION POINT 11: Handle Logout
//   const handleLogout = () => {
//     // sessionStorage.removeItem('token')
//     // router.push('/login')
//     handleProfileMenuClose()
//   }

//   const menuItems = [
//     { text: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
//     { text: "Meetings", icon: <Calendar size={20} />, path: "/meetings" },
//     { text: "Documents", icon: <FileText size={20} />, path: "/documents" },
//     { text: "Team", icon: <Users size={20} />, path: "/team" },
//     { text: "Settings", icon: <Settings size={20} />, path: "/settings" },
//   ]

//   const drawer = (
//     <Box sx={{ overflow: "auto" }}>
//       <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
//         <Typography variant="h6" fontWeight={600} color="#2c3e50">
//           DevNote
//         </Typography>
//       </Box>
//       <Divider />
//       <List>
//         {menuItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               sx={{
//                 borderRadius: "8px",
//                 mx: 1,
//                 my: 0.5,
//                 "&:hover": {
//                   backgroundColor: "rgba(255, 112, 67, 0.08)",
//                 },
//                 "&.Mui-selected": {
//                   backgroundColor: "rgba(255, 112, 67, 0.12)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255, 112, 67, 0.16)",
//                   },
//                 },
//               }}
//               selected={item.text === "Dashboard"}
//               // IMPLEMENTATION POINT 12: Navigation
//               // onClick={() => router.push(item.path)}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 40,
//                   color: item.text === "Dashboard" ? "#ff7043" : "#7f8c8d",
//                 }}
//               >
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText
//                 primary={item.text}
//                 primaryTypographyProps={{
//                   fontWeight: item.text === "Dashboard" ? 600 : 400,
//                   color: item.text === "Dashboard" ? "#2c3e50" : "#7f8c8d",
//                 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   )

//   return (
//     <Box sx={{ display: "flex" }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           ml: { md: `${drawerWidth}px` },
//           backgroundColor: "white",
//           boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
//           color: "#2c3e50",
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { md: "none" } }}
//           >
//             <MenuIcon />
//           </IconButton>

//           <Box sx={{ flexGrow: 1 }} />

//           <IconButton size="large" aria-label="show notifications" color="inherit" sx={{ mr: 2 }}>
//             <Bell size={20} />
//           </IconButton>

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//             onClick={handleProfileMenuOpen}
//           >
//             <Avatar alt="User Avatar" src="/placeholder.svg?height=40&width=40" sx={{ width: 36, height: 36 }} />
//             {!isMobile && (
//               <>
//                 <Box sx={{ ml: 1.5, mr: 0.5 }}>
//                   <Typography variant="body1" fontWeight={500}>
//                     Sarah Johnson
//                   </Typography>
//                   <Typography variant="body2" color="#7f8c8d" sx={{ lineHeight: 1 }}>
//                     Product Manager
//                   </Typography>
//                 </Box>
//                 <ChevronDown size={16} />
//               </>
//             )}
//           </Box>

//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleProfileMenuClose}
//             PaperProps={{
//               sx: {
//                 mt: 1.5,
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//                 borderRadius: 2,
//               },
//             }}
//           >
//             <MenuItem
//               // IMPLEMENTATION POINT 13: Navigate to Profile
//               // onClick={() => { router.push('/profile'); handleProfileMenuClose(); }}
//               sx={{ py: 1.5, px: 2 }}
//             >
//               <ListItemIcon>
//                 <Avatar sx={{ width: 24, height: 24 }} />
//               </ListItemIcon>
//               <ListItemText primary="My Profile" />
//             </MenuItem>
//             <MenuItem
//               // IMPLEMENTATION POINT 14: Navigate to Settings
//               // onClick={() => { router.push('/settings'); handleProfileMenuClose(); }}
//               sx={{ py: 1.5, px: 2 }}
//             >
//               <ListItemIcon>
//                 <Settings size={20} />
//               </ListItemIcon>
//               <ListItemText primary="Settings" />
//             </MenuItem>
//             <Divider />
//             <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2 }}>
//               <ListItemIcon>
//                 <LogOut size={20} color="#e74c3c" />
//               </ListItemIcon>
//               <ListItemText primary="Logout" sx={{ color: "#e74c3c" }} />
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: "block", md: "none" },
//             "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: "none", md: "block" },
//             "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, borderRight: "1px solid #f0f0f0" },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           mt: "64px", // Height of AppBar
//         }}
//       >
//         {children}
//       </Box>
//     </Box>
//   )
// }
