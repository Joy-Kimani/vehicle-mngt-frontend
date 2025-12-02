import React from 'react'
import Footer from '../Footer'
import AdminSideNav from './AdminSideNav'


interface DashboardLayoutProps{
    children: React.ReactNode
}

const AdminLayout:React.FC<DashboardLayoutProps> = ({children}) => {
  return (
    <div>
    <div className='flex gap-8'>
        <AdminSideNav/>
        <main>
            <div>
                {children}
            </div>
        </main>
    </div>
    <Footer />
    </div>
  )
}

export default AdminLayout
