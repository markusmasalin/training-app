import React from "react";
import MaterialTable from 'material-table'

import Search from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear';
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import moment from 'moment'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableSortLabel from '@material-ui/core/TableSortLabel';





const TrainingList = ({
   data, 
   deleteTraining
  
  }) => {


  
  
  if(!data) {
    return (
      <div>
        ..loading
      </div>
    )
  }
  const columns = [
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
 
    
  return (
    <MaterialTable
      title="Training list"
      columns={columns}
      data={data}
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
          Delete: DeleteIcon,
          SortArrow: TableSortLabel 
       
      }}
      options={{
        sorting: true,
        search: true
      }}
      editable={{
        
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => { 
              
                deleteTraining(oldData)
              resolve()
            }, 1000)
          }),
      }}        
      
    />
  )
}
        

export default TrainingList;