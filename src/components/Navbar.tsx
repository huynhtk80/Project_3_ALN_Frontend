import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useContext, useState } from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import ALN_LOGO_3_47 from '../assets/ALN_LOGO-3-47.png';
import ALN_LOGO_3_48 from '../assets/ALN_LOGO-3-48_sm.png';
import AvatarTemp from '../assets/avatar-temp.png';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import Footer from './Footer';
import SearchDropdown from './SearchBar';
import Switcher from './ThemeSwitcher';
// import Donate from '../pages/Donate';

const navigation = [
  { name: 'Browse All ➤', href: '/home/Category' },
  { name: '- Films ➤', href: '/home/Category/Film' },
  { name: '- Short Films ➤', href: '/home/Category/Short Film' },
  { name: '- Documentary ➤', href: '/home/Category/Documentary' },
  { name: '- Series ➤', href: '/home/Category/Series' },
  { name: '- Podcast ➤', href: '/home/Category/Podcast' },
  { name: 'African Roots ➤', href: '/home' },
  { name: 'Baobab Community ➤', href: '/home/network' },

  // { name: 'Upload Video ➤', href: '/home/uploadvideo' },
  // { name: 'Donate ➤', href: '/home/Donate' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ landing = false }: { landing?: boolean }) {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;
  const authContext = useContext(AuthContext);
  const { user, userRoles } = authContext;
  const logout = authContext.logout;
  const userDBContext = useContext(UserDBContext);
  const userProfile = userDBContext?.userProfile;

  const [isOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!isOpen);

  return (
    <>
      <div className=' '>
        <Disclosure
          as='nav'
          className='fixed flex-row justify-start bg-primary text-base-content bg-opacity-30 w-full z-50 px-2 shadow-md glass transition-all duration-500 ease-in-out'
        >
          {({ open }) => (
            <>
              <div className='relative flex h-16 items-center justify-between text-base-content '>
                {/* Mobile menu button*/}
                <div className='flex flex-row'>
                  {user && (
                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-base-content hover:bg-base-300 hover:text-white focus:outline-none transition-all duration-500 ease-in-out'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6 transition hover:rotate-180'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6 transition hover:rotate-90'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  )}

                  <div className='flex flex-1 items-center sm:items-stretch justify-start'>
                    <div className='flex flex-shrink-0 items-center p-2 cursor-pointer'>
                      <Link to='/'>
                        <img
                          className='h-8 w-auto drop-shadow-md drop-shadow-black hidden lg:block transition ease-in-out duration-300 hover:scale-110'
                          src={ALN_LOGO_3_47}
                          alt='ALN LOGO'
                        />
                      </Link>
                      <Link to='/'>
                        <img
                          className='block h-8 w-auto drop-shadow-md lg:hidden transition ease-in-out duration-300 hover:scale-110 hover:rotate-[360deg]'
                          src={ALN_LOGO_3_48}
                          alt='ALN LOGO'
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='mx-1'>{user && <SearchDropdown />}</div>
                {/* Right Menu and Switcher */}
                <div className='flex flex-row'>
                  <div className=''>
                    <Switcher />
                  </div>
                  {/* Profile dropdown */}
                  {user ? (
                    <Menu as='div' className='ml-1'>
                      <div>
                        <Menu.Button className='flex min-w-8 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                          <span className='sr-only'>Open user menu</span>
                          {userProfile?.photo ? (
                            <img
                              className='h-8 w-8 rounded-full'
                              src={userProfile.photo}
                              alt='avatar'
                            />
                          ) : (
                            <img
                              className='h-8 w-8 rounded-full'
                              src={AvatarTemp}
                              alt='avatar'
                            />
                          )}
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
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-base-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <p className='block px-4 py-2 text-sm base-content'>
                                Hi, {userProfile.firstName}{' '}
                                {userProfile.lastName}
                              </p>
                            )}
                          </Menu.Item>
                          <div className='divider  w-5/6 my-0 mx-auto '></div>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to={`/home/profile/${user.uid}`}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm base-content'
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          {userRoles.admin && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to='/home/admin'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-base-content'
                                  )}
                                >
                                  Admin
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          {(userRoles.admin || userRoles.creator) && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to='/home/uploadvideo'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-base-content'
                                  )}
                                >
                                  Upload Videos
                                </Link>
                              )}
                            </Menu.Item>
                          )}

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to='/home/settings'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-base-content'
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={logout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-base-content cursor-pointer'
                                )}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link to='/home/loginform'>
                      <button className='btn btn-sm ml-1 btn-primary'>
                        Login
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              {user && (
                <Disclosure.Panel className=''>
                  <div className='space-y-1 px-2 pt-2 pb-3'>
                    {navigation.map((item, index) => (
                      <Link key={index} to={item.href}>
                        <Disclosure.Button
                          key={item.name}
                          className='text-black transition ease-in-out duration-500 hover:text-primary-focus hover:scale-110 block px-3 py-2 rounded-md text-base font-medium'
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    ))}
                  </div>
                </Disclosure.Panel>
              )}
            </>
          )}
        </Disclosure>

        {!landing && (
          <>
            <div className='min-h-screen flex flex-col justify-between'>
              <Outlet />
              <Footer />
            </div>
          </>
        )}
      </div>
      {/* <Chat /> */}
    </>
  );
}
