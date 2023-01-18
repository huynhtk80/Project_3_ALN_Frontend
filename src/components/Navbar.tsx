import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
// import "./Navbar.css";
import { Outlet } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import ALN_LOGO_3_47 from '../assets/ALN_LOGO-3-47.png';
import AvatarTemp from '../assets/avatar-temp.png';
import { LoginForm } from './LoginForm';
import Switcher from './ThemeSwitcher';
import LandingFooter from './LandingFooter';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { AuthContext } from '../providers/AuthProvider';

const navigation = [
  { name: 'Home', href: '/home' },
  { name: 'Baobab Community', href: '/home/network' },
  { name: 'Documentaries', href: '/home/videos' },
  { name: 'Movies', href: '/home/Movies' },
  { name: 'Podcasts', href: '/home/Podcasts' },
  { name: 'TV Series', href: '/home/TVSeries' },

  { name: 'Login', href: '/home/LoginForm' },
  { name: 'Upload Video', href: '/home/uploadvideo' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const logout = authContext.logout;

  return (
    <div className='bg-white dark:bg-slate-900 '>
      <Disclosure as='nav' className='bg-slate-900'>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex flex-shrink-0 items-center'>
                    <Link to='/'>
                      <img
                        className='block h-8 w-auto lg:hidden'
                        src={ALN_LOGO_3_47}
                        alt='African Network Live'
                      />
                      <img
                        className='hidden h-8 w-auto lg:block'
                        src={ALN_LOGO_3_47}
                        alt='African Network Live'
                      />
                    </Link>
                  </div>
                  <div className='hidden sm:ml-6 sm:block'>
                    <div className='flex space-x-4'>
                      {navigation.map((item) => (
                        <NavLink
                          end
                          key={item.name}
                          to={item.href}
                          className={({ isActive }) =>
                            ' px-3 py-2 rounded-md text-sm font-medium ' +
                            (isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white')
                          }
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <button
                    type='button'
                    className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  >
                    <span className='sr-only'>View notifications</span>

                    <BellIcon className='h-6 w-6' aria-hidden='true' />
                  </button>

                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src={AvatarTemp}
                          alt='Avatar'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to='/home/profile'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              end
                              to='/home/settings'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/home/logout'
                              onClick={logout}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className='h-6 w-6 m-1'>
                  <Switcher />
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden '>
              <div className='space-y-1 px-2 pt-2 pb-3'>
                {navigation.map((item) => (
                  <NavLink
                    to={item.href}
                    key={item.name}
                    className={({ isActive }) =>
                      ' block px-3 py-2 rounded-md text-base font-medium' +
                      (isActive
                        ? ' bg-gray-900 text-white '
                        : ' text-gray-300 hover:bg-gray-700 hover:text-white ')
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <LandingFooter />
    </div>
  );
}
