import React from 'react'
import { Link, useLocation } from 'react-router'
import { DollarSignIcon, LayoutDashboardIcon, LogOut, Settings, Ticket, ToolCase} from 'lucide-react'

const AdminSideNav:React.FC = () => {
  const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const navigationItems = [
        {
            name: 'My Dashboard',
            path: '/admin-dashboard',
            icon: <LayoutDashboardIcon className="w-5 h-5" />
            
        },
        {
            name: 'Bookings management and Details',
            path: '/admin-dashboard/bookings',
            icon: <Ticket className="w-5 h-5" />
        },
        {
            name: 'My Payment History',
            path: '/admin-dashboard/payments',
            icon: <DollarSignIcon className="w-5 h-5" />
        },
        
        {
            name: 'My Profile and Settings',
            path: '/admin-dashboard/settings',
            icon: <Settings className="w-5 h-5" />
        },
        {
            name: 'Back to site',
            path: '/',
            icon:< LogOut className="w-5 h-5" />
        }
    ]
  return  (
    <aside className="flex flex-col h-screen w-64 bg-zinc-900 border-r border-zinc-500 shrink-0 sticky top-0">
            {/* Navigation Menu */}
            <nav className="flex-1 flex flex-col gap-1 p-4">
                <div className="mb-2 text-md font-semibold text-zinc-400 uppercase px-3">
                    Menu
                </div>
                
                {navigationItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group
                                ${active 
                                    ? 'bg-amber-500 text-brown-600 font-medium shadow-sm' 
                                    : 'text-gray-600 hover:bg-zinc-900 hover:text-amber-900'
                                }
                            `}
                        >
                           
                            <span className={`${active ? 'text-brown-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                {item.icon}
                            </span>
                            <span className="text-sm">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>          
           
        </aside>
    )
}

export default AdminSideNav