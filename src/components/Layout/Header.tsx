import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon, BellIcon } from '@heroicons/react/24/outline';
import { authService } from '../../lib/auth';

interface HeaderProps {
  user: any;
  college: any;
}

export default function Header({ user, college }: HeaderProps) {
  const handleSignOut = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          {college && (
            <div className="flex items-center space-x-3">
              {college.logo_url && (
                <img
                  src={college.logo_url}
                  alt={college.name}
                  className="h-8 w-8 rounded"
                />
              )}
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {college.name}
                </h1>
                <p className="text-xs text-gray-500">{college.short_name}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <BellIcon className="h-5 w-5" />
          </button>

          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="font-medium">{user?.full_name}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleSignOut}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}