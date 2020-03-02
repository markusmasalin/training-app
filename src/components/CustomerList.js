import React from "react";
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




const CustomerList = ({
   data, 
   columns, 
  
  }) => {


  
  
  if(!data) {
    return (
      <div>
        ..loading
      </div>
    )
  }

    
  return (
    <MaterialTable
      title="Customer list"
      columns={columns}
      data={data}
      icons={{ 
       
          Check: Check,
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
          DeleteIcon: DeleteIcon,
          SortArrow: TableSortLabel 
       
      }}
      options={{
        sorting: true,
        search: true
      }}        
      actions={[
        {
          icon: EditIcon,
          tooltip: 'Edit User',
          onClick: (event, rowData) => alert("You saved " + rowData.activity)
        },
        {
          icon: DeleteIcon,
          tooltip: 'Delete User',
          onClick: (event, rowData) => window.confirm("You want to delete " + rowData.activity)
        }
      ]}
    />
  )
}
        

export default CustomerList;