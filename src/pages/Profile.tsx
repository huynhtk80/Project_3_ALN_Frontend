import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { UserProfileProps } from './Signin';
import { MdLocationOn } from 'react-icons/md';
import { TfiVideoClapper } from 'react-icons/tfi';
import { CgOrganisation } from 'react-icons/cg';
import Documentaries from './Documentaries';

export default function profileData() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const [profileData, setProfileData] = useState<UserProfileProps>();

  useEffect(() => {
    console.log('loading infomation from doc', user.uid);

    const docRef = doc(db, 'userInfo', user.uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const userInfoData = {
          ...docSnap.data(),
          DOC_ID: docSnap.id,
        } as UserProfileProps;
        setProfileData(userInfoData);
      } else {
        console.log('No such document!');
      }
    });
    
    return unsubscribe;
   }, [user]);;

   

  return (
    <>
      <div className='pt-16'>
        <main className='profile-page'>
          <section className='relative block h-[500px]'>
            <div
              className='absolute top-0 w-full h-full bg-center bg-cover'
              style={{
                backgroundImage:
                  `url("${profileData?.coverPhoto}")`,
              }}
            >
              <span
                id='blackOverlay'
                className='w-full h-full absolute opacity-50 bg-black'
              />
            </div>
            <div
              className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px'
              style={{ transform: 'translateZ(0px)' }}
            >
              <svg
                className='absolute bottom-0 overflow-hidden'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='none'
                version='1.1'
                viewBox='0 0 2560 100'
                x={0}
                y={0}
              >
                <polygon
                  className='text-blueGray-200 fill-current'
                  points='2560 0 2560 100 0 100'
                />
              </svg>
            </div>
          </section>
          <section className='relative py-16 bg-blueGray-200'>
            <div className='container mx-auto px-4'>
              <div className='relative flex flex-col min-w-0 break-words slg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
                <div className='px-6'>
                  <div className='flex flex-wrap justify-center lg:flex-column'>
                    <div className='lg:w-3/12 px-4 lg:flex justify-center lg:mr-96'>
                      <img
                        alt='...'
                        src= {profileData?.photo}
                        className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]'
                      />
                    </div>
                    <div className='w-full mt-16 lg:w-4/12 px-4 lg:order-2 lg:mt-1 transition-all'>
                      <div className='flex justify-center py-4 lg:pt-4 pt-8'>
                        <div className='mr-4 p-3 text-center'>
                          <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                            22
                          </span>
                          <span className='text-sm text-blueGray-400'>
                            Friends
                          </span>
                        </div>
                        <div className='mr-4 p-3 text-center'>
                          <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                            10
                          </span>
                          <span className='text-sm text-blueGray-400'>
                            Videos
                          </span>
                        </div>
                        <div className='lg:mr-4 p-3 text-center'>
                          <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                            89
                          </span>
                          <span className='text-sm text-blueGray-400'>
                            Comments
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-0 lg:.order-xxl-5 lg:ml-[0%]'>
                      <iframe
                        src={profileData?.introVideo}
                        width='320'
                        height=''
                        frameBorder='0'
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className='flex flex-auto justify-center mt-4 lg:ml-5 lg:justify-start lg:mr-8 lg:-mt-20 transition-all'>
                    <button className='btn btn-sm btn-primary-content hover:btn-primary-focus rounded-md'>
                      Connect
                    </button>
                  </div>

                  <div className='text-center mt-8 lg:text-start lg:ml-5 transition-all'>
                    <h3 className='text-4xl font-semibold leading-normal text-blueGray-700 mb-2'>
                    {profileData?.firstName + " " + profileData?.lastName}
                    </h3>
                    <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                      {/* <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400' /> */}
                      <MdLocationOn size={'20px'} className='inline mr-2' />
                      {profileData?.country + ", " + profileData?.stateProvince + ", " + profileData?.city}
                    </div>
                    <div className='mb-2 text-blueGray-600 mt-2'>
                      {/* <i className='fas fa-briefcase mr-2 text-lg text-blueGray-400' /> */}
                      <TfiVideoClapper
                        size={'20px'}
                        className='inline py-auto mr-2'
                      />
                      Content Creator
                    </div>
                    <div className='mb-2 text-blueGray-600'>
                      {/* <i className='fas fa-university mr-2 text-lg text-blueGray-400' /> */}
                      {/* <CgOrganisation size={'20px'} className='inline  mr-2' /> */}
                      {profileData?.emailAddress}
                    </div>
                  </div>
                  <div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                    <div className='flex flex-wrap justify-center'>
                      <div className='w-full lg:w-9/12 px-4'>
                        <p className='mb-4 text-lg leading-relaxed text-blueGray-700'>
                            {profileData?.about}
                        </p>
                        <a href='#pablo' className='font-normal text-pink-500'>
                          Show more
                        </a>
                      </div>
                    </div>
                    <div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                      <div className='flex flex-wrap justify-center'>
                        <div className='w-full lg:w-9/12 px-4'>
                          <Documentaries></Documentaries>
                          <a
                            href='#pablo'
                            className='font-normal text-pink-500'
                          >
                            Show more
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
