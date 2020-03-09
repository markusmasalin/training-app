import React, { useState, useEffect } from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import TrainingList from './components/TrainingList'
import CustomerList from './components/CustomerList'
import {
  Calendar,
  momentLocalizer,
  Views
} from 'react-big-calendar';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'typeface-roboto';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PersonIcon from '@material-ui/icons/Person';
import moment from 'moment'

const drawerWidth = 240;



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
 
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const localizer = momentLocalizer(moment)

function App() {
  const [trainings, setTrainings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Customers')
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => fetchTrainings() , []);
  useEffect(() => fetchCustomers() , []);
  
  
  
  console.log(trainings)
  console.log(customers)

  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(d => setTrainings(d))

  
  }

  const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(d => setCustomers(d.content))
  }

  const deleteCustomer = (id) => {
    console.log(id.links[0].href)
    fetch(id.links[0].href, {method: 'DELETE'})
    .then( res => fetchCustomers())
    .catch(err => console.error(err))
    }

  const createCustomer = (customer) => {
    console.log(customer, 'customer')
    fetch('https://customerrest.herokuapp.com/api/customers', {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then( res => fetchCustomers())
    .catch(err => console.error(err))
    }

  const editCustomer = (customer) => {
    console.log(customer.links[0].href)
    fetch(customer.links[0].href, {
      method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then( res => fetchCustomers())
    .catch(err => console.error(err))
    }
    
  const events = trainings.map(d => {
        const date = new Date(d.date);
        const changedDate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        const changedTime = date.getHours()
        console.log(changedTime, 'changedTime')
        console.log(changedDate, 'changedDate')
        const endTime = moment(d.date).add(60, 'm')
        console.log(endTime, 'endTime')
        const newObject = {
        title: d.activity,
        start: d.date,
        end: moment(d.date).add(60, 'm').toISOString,
        }
        return newObject
  })

  console.log(events, 'events')
       
        
  let allViews = Object.keys(Views).map(k => Views[k])

  const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

  
  const saveTraining = (training) => {
    
    const trainings = {
      "date":  `${training.date}T${training.time}:00.000+0000`,
    
      "activity": training.activity,
      "duration": training.duration,
      "customer": training.customer
    }

    console.log(trainings, 'trainings')
    console.log(events, 'events')
    fetch(`https://customerrest.herokuapp.com/api/trainings`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(trainings)
      })
      .then(res => fetchTrainings())
      .catch(err => console.error(err))
    
    }

    const deleteTraining = (t) => {
      console.log(t.id)
      fetch(`https://customerrest.herokuapp.com/api/trainings/${t.id}`, {
        method: 'DELETE',
      })
      .then( res => fetchTrainings())
      .catch(err => console.error(err))
      }

    
      const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

      const onItemClick = title => () => {
        setTitle(title);
      }
  


  
  return (
   <div className={classes.root}>
    <CssBaseline />
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Personal trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
          <List>
            <ListItem button component={Link}  to="/customers" onClick={onItemClick('Customers')}>
              <PersonIcon></PersonIcon>
              <ListItemText primary={'customers'} />
            </ListItem>
        
            <ListItem button component={Link}  to="/trainings" onClick={onItemClick('Trainings')}>
              <DirectionsRunIcon></DirectionsRunIcon>
              <ListItemText primary={'trainings'} />
            </ListItem>
            <ListItem button component={Link}  to="/calendar" onClick={onItemClick('Calendar')}>
              <CalendarTodayIcon></CalendarTodayIcon>
              <ListItemText primary={'calendar'} />
            </ListItem>


         
          </List>
      </Drawer>
      
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
      
        
      <div className={classes.drawerHeader} />
            <Switch>
              <Route exact path="/trainings" 
                  render={() => 
                 <TrainingList
                    data={trainings}
                    deleteTraining={deleteTraining}
                    >
                  </TrainingList>
                  }/>
              <Route path="/customers" 
                render={() => <CustomerList
                  data={customers}
                  deteleCustomer={deleteCustomer}
                  saveTraining={saveTraining}
                  createCustomer={createCustomer}
                  deleteCustomer={deleteCustomer}
                  editCustomer={editCustomer} 
                 >
                 </CustomerList>}
                />
               <Route path="/calendar" 
                render={() => <Calendar
                  views={allViews}
                  localizer={localizer}
                  defaultDate={new Date()}
                  defaultView="week"
                  events={events}
                  components={{
                    timeSlotWrapper: ColoredDateCellWrapper,
                  }}
                  drilldownView="agenda"
                  
                  step={60}
                  showMultiDayTimes
                />}
                />
              <Route render={() => <h1>Page not found</h1>}/>
            </Switch>

      
    
      </main>
      </ BrowserRouter>
    
   </div>
  );
}

export default App;
