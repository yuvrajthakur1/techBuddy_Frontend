import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  Users,
  FileQuestion,
  BarChart3,
  FileText,
  Settings,
  PanelLeft,
  UserCircle2
} from 'lucide-react';
import { NavLink, Outlet, useNavigation } from 'react-router-dom';
import { RingLoader } from 'react-spinners';




// This component wraps around your pages to provide the consistent sidebar and header.
const AdminPanelLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [activePageKey, setActivePageKey] = useState('/');

  const menuItems = [
    { key: '/admin', IconComponent: BarChart3, label: 'Dashboard' },
    { key: '/users', IconComponent: Users, label: 'Users' },
    { key: '/attempts', IconComponent: FileText, label: 'Attempts' },
    { key: '/questions', IconComponent: FileQuestion, label: 'Questions' },
    { key: '/settings', IconComponent: Settings, label: 'Settings' },
  ];

    const navigation = useNavigation();
  
    if (navigation.state === "loading") {
      // pure page ka loader
      return (
        <div className="flex w-screen h-screen justify-center items-center bg-gray-950">
        <RingLoader

    color="#33d8dd"
    loading
  />
        </div>
      );
    }

  // This function determines which page to render based on the active key.
  // In a real application, this would be handled by a routing library like React Router.
 
  return (
  <div className="flex h-screen bg-gray-800 font-sans">
      {/* Sidebar */}
      <aside className={`bg-gray-950 text-white flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
        <div className="h-16 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
           {collapsed ? 'A' : 'Admin'}
        </div>
        <nav className="flex-1 px-4 py-4 bg-gray-950 space-y-2">
            {menuItems.map(item => (
                <button 
                  key={item.key}
                  onClick={() => setActivePageKey(item.key)}
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${activePageKey === item.key ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                >
                    <item.IconComponent className="w-5 h-5" />
                    {!collapsed && <span className="ml-4">{item.label}</span>}
                </button>
            ))}
        </nav>
      </aside>



      {/* Main Content */}
      <div className="flex-1 flex flex-col  overflow-hidden">
        {/* Header */}
        <header className=" py-2  bg-gray-800 shadow-md flex items-center justify-between px-6">
            <button onClick={() => setCollapsed(!collapsed)} className="text-gray-100 ">
                <PanelLeft />
            </button>
            

            {/* Profile Dropdown using Headless UI */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex items-center text-left rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">                 
                  <NavLink to="/profile"><UserCircle2  className="w-8 h-8 text-gray-100" /></NavLink>
                </Menu.Button>
              </div>
            </Menu>
        </header>





        {/*main section of dashboard*/}
        <main className='overflow-y-auto bg-gray-950'> 
             <Outlet/>
        </main>
      </div>
    </div>
  );
};


export default AdminPanelLayout;