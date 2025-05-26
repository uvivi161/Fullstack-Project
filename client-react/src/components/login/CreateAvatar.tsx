import type React from "react"
import { useContext, useState } from "react"
import { Avatar, IconButton, Menu, MenuItem, ListItemIcon, Tooltip } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { UserContext } from "./UserReducer"
import { useNavigate } from "react-router-dom"

const CreateAvatar = () => {
  const [user, usersDispatch] = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    sessionStorage.removeItem("token")
    usersDispatch({ type: "DELETE", data: {} })
    handleClose()
    navigate("/") // חזרה לדף הבית
  }

  return (
    <>
      <Tooltip title="Account">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "var(--devnote-primary)",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            {user?.mail?.charAt(0)?.toUpperCase() || <span>?</span>}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 2,
          sx: {
            minWidth: "120px",
            borderRadius: "8px",
            mt: 1,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            "& .MuiMenuItem-root": {
              fontSize: "0.875rem",
              py: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={logout} sx={{ color: "var(--devnote-secondary)" }}>
          <ListItemIcon sx={{ minWidth: "30px" }}>
            <LogoutIcon fontSize="small" sx={{ color: "var(--devnote-primary)", fontSize: "1rem" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default CreateAvatar
