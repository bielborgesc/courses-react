import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import MoreIcon from '@mui/icons-material/MoreVert';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from "react-router-dom";
import {useEffect } from 'react';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import api from "../services/api"
import {logout as logoutAPI} from '../services/auth';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const TemporaryDrawer = () => {
  const [state, setState] = React.useState({left: false});
  const [isTeacher, setIsTeacher] = React.useState(null)

  useEffect(() => {
    (async () => {
      let response = await api.get("/me/teacher");
      setIsTeacher(response.status)
    })()
  }, [])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {isTeacher !== 200 ? 
      <Link href="/dashboard-student" color="inherit" underline="none">
        <ListItem button>
          <ListItemIcon>
            <LaptopChromebookIcon />
          </ListItemIcon>
          <ListItemText primary={"Meus Cursos"} />
        </ListItem>
      </Link> :
      <Link href="/dashboard-teacher" color="inherit" underline="none">
        <ListItem button>
          <ListItemIcon>
            <LaptopChromebookIcon />
          </ListItemIcon>
          <ListItemText primary={"Meus Cursos"} />
        </ListItem>
      </Link>
      }
      
        {isTeacher !== 200 ? 
        false :
        <Link href="/new-course" color="inherit" underline="none">
          <ListItem button>
            <ListItemIcon>
              <PlusOneIcon />
            </ListItemIcon>
            <ListItemText primary={"Cadastrar Curso"} />
          </ListItem>
        </Link>
        }
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment>
          <MenuIcon onClick={toggleDrawer("left", true)}/>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

const PrimarySearchAppBar = (props) => {
  const isAuth = localStorage.getItem("isAuthenticated") ? true : false
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [inputSearch, setInputSearch] = React.useState("")

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogin = () =>{
    handleMenuClose()
    history.push({pathname: `/login`});    
  }

  const handleLogout = () =>{
    handleMenuClose()
    logoutAPI();
    history.push("/login")
        
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchInput = (event) => {
    setInputSearch(event.target.value)
    props.updateSearch(inputSearch)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      {isAuth ? 
        <MenuItem onClick={handleMenuClose}>Meus Cursos</MenuItem> &&
        <MenuItem onClick={handleLogout}>Sair</MenuItem> :
        <MenuItem onClick={handleLogin}>Login</MenuItem> }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        {isAuth ? (<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <TemporaryDrawer/>
          </IconButton>) : false}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link href="/" variant="body2" style={{color: "white", textDecoration: "none"}}>
              <h3>Courses</h3>
            </Link> 
          </Typography>
          {history.location.pathname === "/login" || history.location.pathname === "/create-login" ? 
          false : 
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar Curso"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchInput}
              value={inputSearch}
            />
          </Search>}
          <Box sx={{ flexGrow: 1 }} />
          {history.location.pathname === "/login" || history.location.pathname === "/create-login"? 
          false : 
            <Box>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="Usuário"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
              </Box>
            </Box>
          }
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
export default PrimarySearchAppBar