import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

export default function userInfo() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const store = fbContext.store;

  const [about, setAbout] = useState('');
  const [firstName, setFirstName]= useState("");

  const onChangeHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAbout(e.target.value);
  };

  const onClickSaveHandle = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const docRef = doc(db, 'userInfo', user.uid);
    await setDoc(docRef, {
      about, firstName
    });
  };

  return (
    <>
      <div>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Profile
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form action='#' method='POST'>
              <div className='shadow sm:overflow-hidden sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-3 sm:col-span-2'></div>
                  </div>

                  <div>
                    <label
                      htmlFor='about'
                      className='block text-sm font-medium text-gray-700'
                    >
                      About
                    </label>
                    <div className='mt-1'>
                      <textarea
                        id='about'
                        name='about'
                        rows={3}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='you@example.com'
                        defaultValue={''}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Photo
                    </label>
                    <div className='mt-1 flex items-center'>
                      <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100'>
                        <svg
                          className='h-full w-full text-gray-300'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      </span>
                      <button
                        type='button'
                        className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Cover photo
                    </label>
                    <div className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex text-sm text-gray-600'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
                          >
                            <span>Upload a file</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              className='sr-only'
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Personal Information
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form action='#' method='POST'>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='bg-white px-4 py-5 sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        First name
                      </label>
                      <input
                        type='text'
                        name='first-name'
                        id='first-name'
                        autoComplete='given-name'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='last-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Last name
                      </label>
                      <input
                        type='text'
                        name='last-name'
                        id='last-name'
                        autoComplete='family-name'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-4'>
                      <label
                        htmlFor='email-address'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Email address
                      </label>
                      <input
                        type='text'
                        name='email-address'
                        id='email-address'
                        autoComplete='email'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Country
                      </label>
                      <select
                        id='country'
                        name='country'
                        autoComplete='country-name'
                        className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      >
                        <option>Choose</option>
                        <option>Afghanistan AF</option>
                        <option>Åland Islands AX</option>
                        <option>Albania AL</option>
                        <option>Algeria DZ</option>
                        <option>American Samoa AS</option>
                        <option>Andorra AD</option>
                        <option>Angola AO</option>
                        <option>Anguilla AI</option>
                        <option>Antigua and Barbuda AG</option>
                        <option>Argentina AR</option>
                        <option>Armenia AM</option>
                        <option>Aruba AW</option>
                        <option>Australia AU</option>
                        <option>Austria AT</option>
                        <option>Azerbaijan AZ</option>
                        <option>Bahamas BS</option>
                        <option>Bahrain BH</option>
                        <option>Bangladesh BD</option>
                        <option>Barbados BB</option>
                        <option>Belarus BY</option>
                        <option>Belgium BE</option>
                        <option>Belize BZ</option>
                        <option>Benin BJ</option>
                        <option>Bermuda BM</option>
                        <option>Bhutan BT</option>
                        <option>Bolivia, Plurinational State of BO</option>
                        <option>Bonaire, Sint Eustatius and Saba BQ</option>
                        <option>Bosnia and Herzegovina BA</option>
                        <option>Botswana BW</option>
                        <option>Bouvet Island BV</option>
                        <option>Brazil BR</option>
                        <option>British Indian Ocean Territory IO</option>
                        <option>Brunei Darussalam BN</option>
                        <option>Bulgaria BG</option>
                        <option>Burkina Faso BF</option>
                        <option>Burundi BI</option>
                        <option>Cambodia KH</option>
                        <option>Cameroon CM</option>
                        <option>Canada CA</option>
                        <option>Cape Verde CV</option>
                        <option>Cayman Islands KY</option>
                        <option>Central African Republic C</option>F
                        <option>Chad TD</option>
                        <option>Chile CL</option>
                        <option>China CN</option>
                        <option>Christmas Island CX</option>
                        <option>Cocos (Keeling) Islands CC</option>
                        <option>Colombia CO</option>
                        <option>Comoros KM</option>
                        <option>Congo CG</option>
                        <option>
                          Congo, the Democratic Republic of the CD
                        </option>
                        <option>Cook Islands CK</option>
                        <option>Costa Rica CR</option>
                        <option>Côte d'Ivoire CI</option>
                        <option>Croatia HR</option>
                        <option>Cuba CU</option>
                        <option>Curaçao CW</option>
                        <option>Cyprus CY</option>
                        <option>Czech Republic CZ</option>
                        <option>Denmark DK</option>
                        <option>Djibouti DJ</option>
                        <option>Dominica DM</option>
                        <option>Dominican Republic DO</option>
                        <option>Ecuador EC</option>
                        <option>Egypt EG</option>
                        <option>El Salvador SV</option>
                        <option>Equatorial Guinea GQ</option>
                        <option>Eritrea ER</option>
                        <option>Estonia EE</option>
                        <option>Ethiopia ET</option>
                        <option>Falkland Islands (Malvinas) FK</option>
                        <option>Faroe Islands FO</option>
                        <option>Fiji FJ</option>
                        <option>Finland FI</option>
                        <option>France FR</option>
                        <option>French Guiana GF</option>
                        <option>French Polynesia PF</option>
                        <option>French Southern Territories TF</option>
                        <option>Gabon GA</option>
                        <option>Gambia GM</option>
                        <option>Georgia GE</option>
                        <option>Germany DE</option>
                        <option>Ghana GH</option>
                        <option>Gibraltar GI</option>
                        <option>Greece GR</option>
                        <option>Greenland GL</option>
                        <option>Grenada GD</option>
                        <option>Guadeloupe GP</option>
                        <option>Guam GU</option>
                        <option>Guatemala GT</option>
                        <option>Guernsey GG</option>
                        <option>Guinea GN</option>
                        <option>Guinea-Bissau GW</option>
                        <option>Guyana GY</option>
                        <option>Haiti HT</option>
                        <option>Heard Island and McDonald Islands HM</option>
                        <option>Holy See (Vatican City State) VA</option>
                        <option>Honduras HN</option>
                        <option>Hong Kong HK</option>
                        <option>Hungary HU</option>
                        <option>Iceland IS</option>
                        <option>India IN</option>
                        <option>Indonesia ID</option>
                        <option>Iran, Islamic Republic of IR</option>
                        <option>Iraq IQ</option>
                        <option>Ireland IE</option>
                        <option>Isle of Man IM</option>
                        <option>Israel IL</option>
                        <option>Italy IT</option>
                        <option>Jamaica JM</option>
                        <option>Japan JP</option>
                        <option>Jersey JE</option>
                        <option>Jordan JO</option>
                        <option>Kazakhstan KZ</option>
                        <option>Kenya KE</option>
                        <option>Kiribati KI</option>
                        <option>
                          Korea, Democratic People's Republic of KP
                        </option>
                        <option>Korea, Republic of KR</option>
                        <option>Kuwait KW</option>
                        <option>Kyrgyzstan KG</option>
                        <option>Lao People's Democratic Republic LA</option>
                        <option>Latvia LV</option>
                        <option>Lebanon LB</option>
                        <option>Lesotho LS</option>
                        <option>Liberia LR</option>
                        <option>Libya LY</option>
                        <option>Liechtenstein LI</option>
                        <option>Lithuania LT</option>
                        <option>Luxembourg LU</option>
                        <option>Macao MO</option>
                        <option>
                          Macedonia, the Former Yugoslav Republic of MK
                        </option>
                        <option>Madagascar MG</option>
                        <option>Malawi MW</option>
                        <option>Malaysia MY</option>
                        <option>Maldives MV</option>
                        <option>Mali ML</option>
                        <option>Malta MT</option>
                        <option>Marshall Islands MH</option>
                        <option>Martinique MQ</option>
                        <option>Mauritania MR</option>
                        <option>Mauritius MU</option>
                        <option>Mayotte YT</option>
                        <option>Mexico MX</option>
                        <option>Micronesia, Federated States of FM</option>
                        <option>Moldova, Republic of MD</option>
                        <option>Monaco MC</option>
                        <option>Mongolia MN</option>
                        <option>Montenegro ME</option>
                        <option>Montserrat MS</option>
                        <option>Morocco MA</option>
                        <option>Mozambique MZ</option>
                        <option>Myanmar MM</option>
                        <option>Namibia NA</option>
                        <option>Nauru NR</option>
                        <option>Nepal NP</option>
                        <option>Netherlands NL</option>
                        <option>New Caledonia NC</option>
                        <option>New Zealand NZ</option>
                        <option>Nicaragua NI</option>
                        <option>Niger NE</option>
                        <option>Nigeria NG</option>
                        <option>Niue NU</option>
                        <option>Norfolk Island NF</option>
                        <option>Northern Mariana Islands MP</option>
                        <option>Norway NO</option>
                        <option>Oman OM</option>
                        <option>Pakistan PK</option>
                        <option>Palau PW</option>
                        <option>Palestine, State of PS</option>
                        <option>Panama PA</option>
                        <option>Papua New Guinea PG</option>
                        <option>Paraguay PY</option>
                        <option>Peru PE</option>
                        <option>Philippines PH</option>
                        <option>Pitcairn PN</option>
                        <option>Poland PL</option>
                        <option>Portugal PT</option>
                        <option>Puerto Rico PR</option>
                        <option>Qatar QA</option>
                        <option>Réunion RE</option>
                        <option>Romania RO</option>
                        <option>Russian Federation RU</option>
                        <option>Rwanda RW</option>
                        <option>Saint Barthélemy BL</option>
                        <option>
                          Saint Helena, Ascension and Tristan da Cunha SH
                        </option>
                        <option>Saint Kitts and Nevis KN</option>
                        <option>Saint Lucia LC</option>
                        <option>Saint Martin (French part) MF</option>
                        <option>Saint Pierre and Miquelon PM</option>
                        <option>Saint Vincent and the Grenadines VC</option>
                        <option>Samoa WS</option>
                        <option>San Marino SM</option>
                        <option>Sao Tome and Principe ST</option>
                        <option>Saudi Arabia SA</option>
                        <option>Senegal SN</option>
                        <option>Serbia RS</option>
                        <option>Seychelles SC</option>
                        <option>Sierra Leone SL</option>
                        <option>Singapore SG</option>
                        <option>Sint Maarten (Dutch part) SX</option>
                        <option>Slovakia SK</option>
                        <option>Slovenia SI</option>
                        <option>Solomon Islands SB</option>
                        <option>Somalia SO</option>
                        <option>South Africa ZA</option>
                        <option>
                          South Georgia and the South Sandwich Islands GS
                        </option>
                        <option>South Sudan SS</option>
                        <option>Spain ES</option>
                        <option>Sri Lanka LK</option>
                        <option>Sudan SD</option>
                        <option>Suriname SR</option>
                        <option>Svalbard and Jan Mayen SJ</option>
                        <option>Swaziland SZ</option>
                        <option>Sweden SE</option>
                        <option>Switzerland CH</option>
                        <option>Syrian Arab Republic SY</option>
                        <option>Taiwan, Province of China TW</option>
                        <option>Tajikistan TJ</option>
                        <option>Tanzania, United Republic of TZ</option>
                        <option>Thailand TH</option>
                        <option>Timor-Leste TL</option>
                        <option>Togo TG</option>
                        <option>Tokelau TK</option>
                        <option>Tonga TO</option>
                        <option>Trinidad and Tobago TT</option>
                        <option>Tunisia TN</option>
                        <option>Turkey TR</option>
                        <option>Turkmenistan TM</option>
                        <option>Turks and Caicos Islands TC</option>
                        <option>Tuvalu TV</option>
                        <option>Uganda UG</option>
                        <option>Ukraine UA</option>
                        <option>United Arab Emirates AE</option>
                        <option>United Kingdom GB</option>
                        <option>United States US</option>
                        <option>United States Minor Outlying Islands UM</option>
                        <option>Uruguay UY</option>
                        <option>Uzbekistan UZ</option>
                        <option>Vanuatu VU</option>
                        <option>Venezuela, Bolivarian Republic of VE</option>
                        <option>Viet Nam VN</option>
                        <option>Virgin Islands, British VG</option>
                        <option>Virgin Islands, U.S. VI</option>
                        <option>Wallis and Futuna WF</option>
                        <option>Western Sahara EH</option>
                        <option>Yemen YE</option>
                        <option>Zambia ZM</option>
                        <option>Zimbabwe</option>
                      </select>
                    </div>

                    <div className='col-span-6'>
                      <label
                        htmlFor='street-address'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Street address
                      </label>
                      <input
                        type='text'
                        name='street-address'
                        id='street-address'
                        autoComplete='street-address'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium text-gray-700'
                      >
                        City
                      </label>
                      <input
                        type='text'
                        name='city'
                        id='city'
                        autoComplete='address-level2'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='region'
                        className='block text-sm font-medium text-gray-700'
                      >
                        State / Province
                      </label>
                      <input
                        type='text'
                        name='region'
                        id='region'
                        autoComplete='address-level1'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='postal-code'
                        className='block text-sm font-medium text-gray-700'
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type='text'
                        name='postal-code'
                        id='postal-code'
                        autoComplete='postal-code'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='hidden sm:block' aria-hidden='true'>
        <div className='py-5'>
          <div className='border-t border-gray-200' />
        </div>
      </div>

      <div className='mt-10 sm:mt-0'>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Interests
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Decide which topics interest you.
              </p>
            </div>
          </div>
          <div className='mt-5 md:col-span-2 md:mt-0'>
            <form>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                  <fieldset>
                    <legend className='contents text-base font-medium text-gray-900'>
                      Interests
                    </legend>
                    <p className='text-sm text-gray-500'>Choose your top 3</p>
                    <div className='mt-4 space-y-4'>
                      <div className='flex items-center'>
                        <input
                          id='travel'
                          name='travel-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='travel'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Travel
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='music'
                          name='music-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='music'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Music
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='current-events'
                          name='current-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='current-events'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Current Events
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='investment'
                          name='investment-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='investment'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Investment Opportunities
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='fullLength'
                          name='fullLength-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='fullLength'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Full-Length Movies
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='documentaries'
                          name='documentaries-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='documentaries'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Documentaries
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='short-films'
                          name='short-films-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='short-films'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Short Films
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='networking'
                          name='networking-interests'
                          type='radio'
                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                          htmlFor='networking'
                          className='ml-3 block text-sm font-medium text-gray-700'
                        >
                          Networking
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                  <button
                    className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    onClick={onClickSaveHandle}
                  >
                    Save Me
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
