import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AddTraining = (props) => {

  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
      date: '', activity: '', duration: '', customer: ''
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value, customer: props.customer })
    
  }

  const addTraining = () => {
      props.saveTraining();
      handleClose()
  }

    return (
        <div>
          <Button style={{margin: 10 }}variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Training
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>
          
            <TextField
                autoFocus
                margin="dense"
                name="date"
                value={training.date}
                label="Date"
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
        </div>
    )
}

export default AddTraining;