import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  HomeIcon, 
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  ClockIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Departments', href: '/departments', icon: BuildingOfficeIcon },
  { name: 'Faculty', href: '/faculty', icon: UserGroupIcon },
  { name: 'Subjects', href: '/subjects', icon: AcademicCapIcon },
  { name: 'Classrooms', href: '/classrooms', icon: BuildingOfficeIcon },
  { name: 'Time Slots', href: '/time-slots', icon: ClockIcon },
  { name: 'Timetable', href: '/timetable', icon: CalendarDaysIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Timetable Manager</h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon
              className="mr-3 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}