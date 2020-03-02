import React, { useState, useEffect } from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import TrainingList from './components/TrainingList'
import './App.css';
import 'typeface-roboto';
import moment from 'moment'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));


function App() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData() , []);
  
  
  
  console.log(trainings)

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(response => response.json())
    .then(d => setTrainings(d))
  
    
  }
  const classes = useStyles();

  
  return (
   <div>
    <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
           
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography  variant="h6" noWrap>
           PersonalTrainer
          </Typography>
         
        </Toolbar>
      </AppBar>
  
    <TrainingList
     data={trainings}
     columns={[
        { title: 'Activity', field: 'activity' },
        { title: 'Date', field: 'date',
     render: rowData => <p>{moment(rowData.date, ).format('DD.MM.YYYY ')}{moment(rowData.date).format('LT')}</p>
      },
        { title: 'Duration', field: 'duration', type: 'numeric' },
        {
          title: 'Customer',
          field: 'customer.lastname',
          render: rowData => <p>{rowData.customer.firstname} {rowData.customer.lastname}</p>
          
         
        },
      ]
     }
    >
      
    </TrainingList>
   </div>
  );
}

export default App;
