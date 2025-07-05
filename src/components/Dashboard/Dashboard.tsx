import React, { useState, useEffect } from 'react';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalFaculty: number;
  totalSubjects: number;
  totalClassrooms: number;
  activeTimetables: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalFaculty: 0,
    totalSubjects: 0,
    totalClassrooms: 0,
    activeTimetables: 0
  });

  const statCards = [
    {
      name: 'Total Faculty',
      value: stats.totalFaculty,
      icon: UserGroupIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Subjects',
      value: stats.totalSubjects,
      icon: AcademicCapIcon,
      color: 'bg-emerald-500'
    },
    {
      name: 'Total Classrooms',
      value: stats.totalClassrooms,
      icon: BuildingOfficeIcon,
      color: 'bg-indigo-500'
    },
    {
      name: 'Active Timetables',
      value: stats.activeTimetables,
      icon: CalendarDaysIcon,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your institution's timetable management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${card.color}`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {card.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {card.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Add New Faculty</div>
              <div className="text-sm text-gray-500">Register a new faculty member</div>
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Create Subject</div>
              <div className="text-sm text-gray-500">Add a new subject to curriculum</div>
            </button>
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="font-medium text-gray-900">Generate Timetable</div>
              <div className="text-sm text-gray-500">Create optimized schedules</div>
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="text-sm text-gray-600">
                New faculty member added to Computer Science
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <div className="text-sm text-gray-600">
                Timetable generated for Semester 1
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              <div className="text-sm text-gray-600">
                Classroom capacity updated
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}