import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

export default function Profile() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const store = fbContext.store;

  return (
    <>
      <div className='pt-16'>
        <main className='profile-page'>
          <section className='relative block h-500-px'>
            <div
              className='absolute top-0 w-full h-full bg-center bg-cover'
              style={{
                backgroundImage:
                  'url("https://www.borgenmagazine.com/wp-content/uploads/2014/03/9683990709_c3b8b246ea_b_opt.jpg")',
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
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64'>
                <div className='px-6'>
                  <div className='flex flex-wrap justify-center lg:flex-row'>
                    <div className='lg:w-3/12 px-4 lg:order-1 flex justify-center lg:mr-96'>
                      <img
                        alt='...'
                        src='https://static.wixstatic.com/media/abbd8f_4b1249582ec84028b486cfc3b2bb1c86~mv2_d_1972_2048_s_2.jpg/v1/fill/w_231,h_240,al_c,q_80,usm_0.66_1.00_0.01/abbd8f_4b1249582ec84028b486cfc3b2bb1c86~mv2_d_1972_2048_s_2.jpg'
                        className='shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px'
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
                    <div className='mt-4 lg:order-3 lg:ml-[55%]'>
                      <iframe
                        src='https://player.vimeo.com/video/591710704?h=3ff18ebd91'
                        width='320'
                        height=''
                        frameborder='0'
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowfullscreen
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
                      Chelsea Mansoff
                    </h3>
                    <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase'>
                      <i className='fas fa-map-marker-alt mr-2 text-lg text-blueGray-400' />
                      Diamond Valley, Alberta, Canada
                    </div>
                    <div className='mb-2 text-blueGray-600 mt-2'>
                      <i className='fas fa-briefcase mr-2 text-lg text-blueGray-400' />
                      Content Creator
                    </div>
                    <div className='mb-2 text-blueGray-600'>
                      <i className='fas fa-university mr-2 text-lg text-blueGray-400' />
                      InceptionU
                    </div>
                  </div>
                  <div className='mt-10 py-10 border-t border-blueGray-200 text-center'>
                    <div className='flex flex-wrap justify-center'>
                      <div className='w-full lg:w-9/12 px-4'>
                        <p className='mb-4 text-lg leading-relaxed text-blueGray-700'>
                          This is all about Chelsea
                        </p>
                        <a href='#pablo' className='font-normal text-pink-500'>
                          Show more
                        </a>
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
