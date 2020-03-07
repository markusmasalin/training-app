import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table'
import { SvgIconProps } from '@material-ui/core/SvgIcon'

import Search from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear';
import ViewColumn from '@material-ui/icons/ViewColumn'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Add from '@material-ui/icons/Add'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import AddTraining from './AddTraining'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const CustomerList = ({
   data, 
   createCustomer,
   saveTraining,
   deleteCustomer,
   editCustomer   
  }) => {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
      date: '',time: '', activity: '', duration: '', customer: ''
  })
    
  
  if(!data) {
    return (
      <div>
        ..loading
      </div>
    )
  }
  const columns= [
    { title: '', field: 'addTraining',
     render: rowData => <button onClick={() => handleClickOpen(rowData.links[0].href)}>Add training </button>
     },
     { title: 'First name', field: 'firstname' },
     { title: 'Last Name', field: 'lastname' },
     { title: 'Email', field: 'email' },
     { title: 'Phone', field: 'phone' },
     { title: 'Address', field: 'streetaddress'},
     { title: 'Postcode', field: 'postcode'},
     { title: 'City', field: 'city'},
     
   ]
  
    
  
   const handleClickOpen = (id) => {
    setTraining({...training, customer: id})
    setOpen(true);
  };


  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  
  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value})
    
  }

  const addTraining = () => {
    console.log('training', training)  
    saveTraining(training);
      handleClose()
  }
  
  const handleClick = () => {
    
    setOpen(true);
  
    
}
    
  return (
    <div>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Training</DialogTitle>
        <DialogContent>
        
        <TextField
            autoFocus
            margin="dense"
            name="date"
            type="date"
            value={training.date}
            label="Date"
            onChange={e => handleInputChange(e)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            name="time"
            type="time"
            value={training.time}
            label="Time"
            onChange={e => handleInputChange(e)}
            fullWidth
        />
        <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            label="Activity"
            onChange={e => handleInputChange(e)}
            fullWidth
        />
        <TextField
            margin="dense"
            name="duration"
        
            value={training.duration}
            label="Duration"
            onChange={e => handleInputChange(e)}
            fullWidth
        />
        
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={addTraining} color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>  
    
    <MaterialTable
      title="Customer list"
      columns={columns}
      data={data}
      
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              
                createCustomer(newData)
              
              resolve()
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              
                editCustomer(newData)
                resolve();
              
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(oldData)
                deleteCustomer(oldData)
              resolve()
            }, 1000)
          }),
      }}
      
      icons={{ 
       
          Check: Check,
          Clear: ClearIcon,
          ResetSearch: ClearIcon,
          DetailPanel: ChevronRight,
          Export: SaveAlt,
          Filter: FilterList,
          FirstPage: FirstPage,
          LastPage: LastPage,
          NextPage: ChevronRight,
          PreviousPage: ChevronLeft,
          Search: Search,
          ThirdStateCheck: Remove,
          EditIcon: EditIcon,
          Edit: EditIcon,
          DeleteIcon: DeleteIcon,
          Delete: DeleteIcon,
          SortArrow: TableSortLabel,
          Add: Add,
          AddTraining: () => 'Add Row'
       
      }}
     
        
        
      options={{
        sorting: true,
        search: true,
        
      }}
     
        
          
      
    />
    </div>

  )
}
        

export default CustomerList;