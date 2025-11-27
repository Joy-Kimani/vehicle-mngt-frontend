import React from 'react'
import Footer from '../Footer'
import SideNav from './SideNav'

interface DashboardLayoutProps{
    children: React.ReactNode
}

const UserLayOut:React.FC<DashboardLayoutProps> = ({children}) => {
  return (
    <div>
    <div className='flex gap-8'>
        <SideNav/>
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

export default UserLayOut
