import React from 'react'
import AdminTicket from './AdminTicket'
import AdminUser from './AdminUser'

const AdminPanel = (props) => {
    

    return (
        <div className='space-y-20'>
            <AdminUser  setProgress={props.setProgress} mode={props.mode}  showAlert={props.showAlert}/>
            
            <AdminTicket setProgress={props.setProgress} mode={props.mode} showAlert={props.showAlert} />

        </div>
    )
}

export default AdminPanel
