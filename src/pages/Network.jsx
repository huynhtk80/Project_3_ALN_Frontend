import React from 'react';

function Network() {
  return (
    <>
      <h1 className='bg-slate-500 text-sm lg:text-2xl text-white text-center pt-20'>
        ALN COLOR THEME
      </h1>
      <div className='px-20 p-10 bg-slate-500 text-base-100 '>
        <div className='overflow-x-auto '>
          <div className='whitespace-nowrap '>
            <table className='text-black'>
              <thead>
                <tr>
                  <th></th>
                  <th>Color name + description</th>
                  <th>Required or optional for themes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-primary'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>primary</span> <br />{' '}
                    <span className='text-xs opacity-60'>Primary color</span>
                  </td>{' '}
                  <td>
                    <span className='badge'>required</span>
                  </td>
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-primary-focus'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>primary-focus</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Primary color when focused
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a darker tone of primary if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-primary-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>primary-content</span>{' '}
                    <br />
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on primary color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of primary if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td></td> <td></td> <td></td> <td></td>
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-secondary'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>secondary</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>Secondary color</span>
                  </td>{' '}
                  <td>
                    <span className='badge'>required</span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-secondary-focus'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>secondary-focus</span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Secondary color when focused
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a darker tone of secondary if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-secondary-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>
                      secondary-content
                    </span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on secondary color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of secondary if not specified
                    </span>
                  </td>
                </tr>{' '}
                <tr>
                  <td></td> <td></td> <td></td> <td></td>
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-accent'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>accent</span> <br />
                    <span className='text-xs opacity-60'>Accent color</span>
                  </td>{' '}
                  <td>
                    <span className='badge'>required</span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-accent-focus'></span>
                  </td>
                  <td>
                    <span className='font-mono font-bold'>accent-focus</span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Accent color when focused
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a darker tone of accent if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-accent-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>accent-content</span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on accent color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of accent if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td></td> <td></td> <td></td> <td></td>
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-neutral'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>neutral</span> <br />{' '}
                    <span className='text-xs opacity-60'>Neutral color</span>
                  </td>{' '}
                  <td>
                    <span className='badge'>required</span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-neutral-focus'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>neutral-focus</span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Neutral color when focused
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a darker tone of neutral if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-neutral-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>neutral-content</span>{' '}
                    <br />
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on neutral color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of neutral if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td></td> <td></td> <td></td> <td></td>
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-base-100'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>base-100</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Base color of page, used for blank backgrounds
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge'>required</span>
                  </td>{' '}
                </tr>
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-base-200'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>base-200</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Base color, a little darker
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a darker tone of base-100 if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-base-300'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>base-300</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Base color, even more darker
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a darker tone of base-200 if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-base-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>base-content</span>{' '}
                    <br />
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on base color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of base-100 if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td></td> <td></td> <td></td> <td></td>
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-info'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>info</span> <br />{' '}
                    <span className='text-xs opacity-60'>Info color</span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />
                    <span className='text-xs opacity-60'>
                      Will be a default blue color if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-info-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>info-content</span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on info color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of info if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-success'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>success</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>Success color</span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a default green color if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-success-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>success-content</span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on success color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of success if not specified
                    </span>
                  </td>{' '}
                </tr>
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-warning'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>warning</span> <br />{' '}
                    <span className='text-xs opacity-60'>Warning color</span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a default orange color if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-warning-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>warning-content</span>{' '}
                    <br />
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on warning color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of warning if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-error'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>error</span> <br />{' '}
                    <span className='text-xs opacity-60'>Error color</span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span>
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a default red color if not specified
                    </span>
                  </td>{' '}
                </tr>{' '}
                <tr>
                  <td>
                    <span className='badge relative top-4 bg-error-content'></span>
                  </td>{' '}
                  <td>
                    <span className='font-mono font-bold'>error-content</span>{' '}
                    <br />{' '}
                    <span className='text-xs opacity-60'>
                      Foreground content color to use on error color
                    </span>
                  </td>{' '}
                  <td>
                    <span className='badge badge-ghost'>optional</span> <br />{' '}
                    <span className='text-xs opacity-60'>
                      Will be a readable tone of error if not specified
                    </span>
                  </td>{' '}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='p-5 bg-gray-500 text-center'>
        <div className='bg-primary text-white'>Primary</div>
        <div className='bg-primary-focus text-white'>bg-primary-focus</div>
        <div className='bg-primary-content text-white'>primary-content</div>
        <div className='bg-secondary text-white'>secondary</div>
        <div className='bg-secondary-focus text-white'>secondary-focus</div>
        <div className='bg-secondary-content text-black'>secondary-content</div>
        <div className='bg-accent text-white'>accent</div>
        <div className='bg-accent-focus text-white'>accent-focus</div>
        <div className='bg-accent-content text-white'>accent-content</div>
        <div className='bg-neutral text-white'>neutral</div>
        <div className='bg-neutral-focus text-white'>neutral-focus</div>
        <div className='bg-neutral-content text-white'>neutral-content</div>
        <div className='bg-base-100'>base-100</div>
        <div className='bg-base-200'>base-200</div>
        <div className='bg-base-300'>base-300</div>
        <div className='bg-base-content text-white'>base-content</div>
        <div className='bg-info'>info</div>
        <div className='bg-info-content text-white'>info-content</div>
        <div className='bg-success'>success</div>
        <div className='bg-success-content'>success-content</div>
        <div className='bg-warning'>warning</div>
        <div className='bg-warning-content text-white'>warning-content</div>
        <div className='bg-error text-white'>error</div>
        <div className='bg-error-content'>error-content</div>
      </div>
    </>
  );
}

export default Network;
