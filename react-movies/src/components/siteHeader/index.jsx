import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const context = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = context.isAuthenticated ? [
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/movies/watchlist" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/toprated/1" },
    { label: "Popular", path: "/movies/popular/1" },
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Actors", path: "/actors/popular/1" },

  ] : [
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ cursor: "pointer" }} onClick={() => navigate("/movies/discover/1")}>
            TMDB Client
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (

            <>
              {context.isAuthenticated ? (
                < div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                  {menuOptions.map((opt) => (
                    <Button
                      key={opt.label}
                      color="inherit"
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </div>) : (
                <>
                  <div style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
                    {menuOptions.map((opt) => (
                      <Button
                        key={opt.label}
                        color="inherit"
                        onClick={() => handleMenuSelect(opt.path)}
                      >
                        {opt.label}
                      </Button>
                    ))
                    }
                  </div>
                </>
              )
              }
            </>
          )}
          {context.isAuthenticated &&
            <>
              < Typography >
                {context.userName}
              </Typography>
              <button onClick={() => context.signout()} style={{ marginLeft: 18 }}>Sign out</button>
            </>
          }
        </Toolbar>
      </AppBar >
      <Offset />
    </>
  );
};

export default SiteHeader;
