import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { authActions } from '../auth/AuthActions';

import {
  Drawer,
  AppBar,
  Toolbar,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Typography,
  IconButton,
  withStyles
} from '@material-ui/core';

import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Apps,
  Settings,
  Star,
  Lock
} from '@material-ui/icons';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarTitle: {
    flex: 1
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuHeader: {
    flex: 100,
    textAlign: 'center',
    justifySelf: 'flex-start',
    fontSize: '18px'
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3 + 64,
  },
});

class Layout extends Component {
  constructor() {
    super();

    this.state = {
      isMenuOpened: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        {/* HEADER */}
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.isMenuOpened && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.isMenuOpened}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.toggleMenu}
              className={classNames(classes.menuButton, this.state.isMenuOpened && classes.hide)}>
              <Menu />
            </IconButton>

            <Typography  className={classes.appBarTitle} variant="title" color="inherit" noWrap>
              {this.props.page}
            </Typography>

            {
              this.props.authenticated ?
                <IconButton
                  color="inherit"
                  onClick={this.props.logout}
                  >
                  <Lock />
                </IconButton>
                :
                ''
            }
          </Toolbar>
        </AppBar>

        {/* MENU */}
        <Drawer
          variant="permanent"
          open={this.state.isMenuOpened}
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.isMenuOpened && classes.drawerPaperClose)
          }}>
          <div className={classes.toolbar}>
            <h1 className={classes.menuHeader}>
              {this.props.heading}
            </h1>

            <IconButton onClick={this.toggleMenu}>
              {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>

          {/* DASHBOARD */}
          <Link to="/" style={{textDecoration: 'none'}}>
            <Tooltip title={this.state.isMenuOpened ? '' : 'Dashboard'}>
              <ListItem button>
                <ListItemIcon>
                  <Apps />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Tooltip>
          </Link>

          {/* SETTINGS */}
          <Link to="/settings" style={{textDecoration: 'none'}}>
            <Tooltip title={this.state.isMenuOpened ? '' : 'Settings'}>
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Tooltip>
          </Link>

          {/* ABOUT */}
          <Link to="/about" style={{textDecoration: 'none'}}>
            <Tooltip title={this.state.isMenuOpened ? '' : 'About'}>
              <ListItem button>
                <ListItemIcon>
                  <Star />
                </ListItemIcon>
                <ListItemText primary="About" />
              </ListItem>
            </Tooltip>
          </Link>
        </Drawer>

        {/* CONTENT */}
        <main className={classes.content}>
          {this.props.children}
        </main>
      </div>
    );
  }

  /**
   * toggleMenu
   * @name toggleMenu
   * @desc toggle menu opened/closed
   * @return {void}
   */
  toggleMenu() {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.app.page,
    authenticated: state.auth.authenticated
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      return dispatch(authActions.logout());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Layout));
