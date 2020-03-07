import React, { useState, useEffect } from "react";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import TrainingList from './components/TrainingList'
import CustomerList from './components/CustomerList'
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
  const [customers, setCustomers] = useState([]);
  

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
  


  const saveTraining = (training) => {
    
    const trainings = {
      "date":  `${training.date}T${training.time}:00.000+0000`,
    
      "activity": training.activity,
      "duration": training.duration,
      "customer": training.customer
    }

    console.log(trainings, 'trainings')
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
     deleteTraining={deleteTraining}
     
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
    <CustomerList
     data={customers}
     deteleCustomer={deleteCustomer}
     saveTraining={saveTraining}
     createCustomer={createCustomer}
     deleteCustomer={deleteCustomer}
     editCustomer={editCustomer}
     
    >
      
    </CustomerList>
   </div>
  );
}

export default App;
