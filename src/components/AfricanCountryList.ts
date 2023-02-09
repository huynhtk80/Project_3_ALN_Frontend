import { ImgHTMLAttributes } from 'react';

interface AfricanCountries {
  [key: string]: {
    Quadrant: string;
    CountryAbbrv: string;
    CountryName: string;
    AreaCode: number;
    OfficialLanguage: string;
    Capital: string;
    Currency: string;
    Flag: any;
    //  futureConnections  =  "Internet users" All sourced from https://datareportal.com/ - search by country for the year 2022.
    FutureConnections: Number;
    PopulationSize: Number;
    ColonizationHistory: string;
    //WikiLink:  URL;
  };
}
//<img src =  `${https://flagsapi.com/${AfricanCountryList.CountryAbbrv}/flat/64.png>}`</img>;

//North Africa_(1-8)
//East Africa_(9-28)
//South Africa_(29-33)
//West Africa_(34-50)
//Central Africa_(51-59)

const AfricanCountryList: AfricanCountries = {
  //North Africa__(1-8)_________________________________________________________________________________________________________________________
  DZ: {
    Quadrant: 'North',
    CountryAbbrv: 'DZ',
    CountryName: 'Algeria',
    AreaCode: 213,
    OfficialLanguage: 'Arabic',
    Capital: 'Algiers',
    Currency: 'Algerian dinar',
    Flag: "https://flagsapi.com/DZ/flat/64.png",
    FutureConnections: 27280000,
    PopulationSize: 44903225,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  EG: {
    Quadrant: 'North',
    CountryAbbrv: 'EG',
    CountryName: 'Egypt',
    AreaCode: 20,
    OfficialLanguage: 'Arabic',
    Capital: 'Cairo',
    Currency: 'Egyptian Pound',
    Flag: 'https://flagsapi.com/EG/flat/64.png',
    FutureConnections: 75660000,
    PopulationSize: 102880000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  LY: {
    Quadrant: 'North',
    CountryAbbrv: 'LY',
    CountryName: 'Libya',
    AreaCode: 218,
    OfficialLanguage: 'Arabic',
    Capital: 'Tripoli',
    Currency: 'Libyan dinar',
    Flag: 'https://flagsapi.com/LY/flat/64.png',
    FutureConnections: 3470000,
    PopulationSize: 6812341,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  MA: {
    Quadrant: 'North',
    CountryAbbrv: 'MA',
    CountryName: 'Morocco',
    AreaCode: 212,
    OfficialLanguage: 'Arabic',
    Capital: 'Rabat',
    Currency: 'Moroccan dirham',
    Flag: 'https://flagsapi.com/MA/flat/64.png',
    FutureConnections: 31590000,
    PopulationSize: 36400000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  TN: {
    Quadrant: 'North',
    CountryAbbrv: 'TN',
    CountryName: 'Tunisia',
    AreaCode: 216,
    OfficialLanguage: 'Arabic',
    Capital: 'Tunis',
    Currency: 'Tunisian dinar',
    Flag: 'https://flagsapi.com/TN/flat/64.png',
    FutureConnections: 8000000,
    PopulationSize: 12356117,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SD: {
    Quadrant: 'North',
    CountryAbbrv: 'SD',
    CountryName: 'Sudan',
    AreaCode: 249,
    OfficialLanguage: 'Arabic',
    Capital: 'Khartoum',
    Currency: 'Sudanese Pound',
    Flag: 'https://flagsapi.com/SD/flat/64.png',
    FutureConnections: 14030000,
    PopulationSize: 46874204,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  EH: {
    Quadrant: 'North',
    CountryAbbrv: 'EH',
    CountryName: 'Western Sahara',
    AreaCode: 212,
    OfficialLanguage: 'Arabic',
    Capital: 'Laayoune',
    Currency: 'Sahrawi peseta, Moroccan dirham',
    Flag: 'https://flagsapi.com/EH/flat/64.png',
    FutureConnections: 379300,
    PopulationSize: 619000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ES: {
    Quadrant: 'North',
    CountryAbbrv: 'ES-CN',
    CountryName: 'Spain / Canary Islands',
    AreaCode: 928 || 828 || 922 || 822,
    OfficialLanguage: 'Spanish',
    Capital: 'Las Palmas de Gran Canaria and Santa Cruz de Tenerife',
    Currency: 'Euro',
    Flag: 'https://flagsapi.com/IC/flat/64.png',
    FutureConnections: 0,
    PopulationSize: 2252465,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  //East Africa___(9-28)_______________________________________________________________________________________________________
  BI: {
    Quadrant: 'East',
    CountryAbbrv: 'BI',
    CountryName: 'Burundi',
    AreaCode: 257,
    OfficialLanguage: 'Kirundi',
    Capital: 'Bujumbura',
    Currency: 'Burundi franc',
    Flag: 'https://flagsapi.com/BI/flat/64.png',
    FutureConnections: 1820000,
    PopulationSize: 12889576,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  KM: {
    Quadrant: 'East',
    CountryAbbrv: 'KM',
    CountryName: 'Comoros',
    AreaCode: 269,
    OfficialLanguage: 'Arabic',
    Capital: 'Moroni',
    Currency: 'Comorian franc',
    Flag: 'https://flagsapi.com/KM/flat/64.png',
    FutureConnections: 76100000,
    PopulationSize: 836774,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  DJ: {
    Quadrant: 'East',
    CountryAbbrv: 'DJ',
    CountryName: 'Djibouti',
    AreaCode: 253,
    OfficialLanguage: 'French',
    Capital: 'Djibouti (city)',
    Currency: 'Djiboutian franc',
    Flag: 'https://flagsapi.com/DJ/flat/64.png',
    FutureConnections: 595400,
    PopulationSize: 1120849,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ER: {
    Quadrant: 'East',
    CountryAbbrv: 'ER',
    CountryName: 'Eritrea',
    AreaCode: 291,
    OfficialLanguage: 'Afar',
    Capital: 'Asmara',
    Currency: 'Eritrean nakfa',
    Flag: 'https://flagsapi.com/ER/flat/64.png',
    FutureConnections: 290500,
    PopulationSize: 3630000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ET: {
    Quadrant: 'East',
    CountryAbbrv: 'ET',
    CountryName: 'Ethiopia',
    AreaCode: 251,
    OfficialLanguage: 'Amharic',
    Capital: 'Addis Ababa',
    Currency: 'Ethiopian birr',
    Flag: 'https://flagsapi.com/ET/flat/64.png',
    FutureConnections: 29830000,
    PopulationSize: 123000000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  KE: {
    Quadrant: 'East',
    CountryAbbrv: 'KE',
    CountryName: 'Kenya',
    AreaCode: 254,
    OfficialLanguage: 'English',
    Capital: 'Nairobi',
    Currency: 'Kenyan shilling',
    Flag: 'https://flagsapi.com/KE/flat/64.png',
    FutureConnections: 23350000,
    PopulationSize: 54027487,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  MG: {
    Quadrant: 'East',
    CountryAbbrv: 'MG',
    CountryName: 'Madagascar',
    AreaCode: 261,
    OfficialLanguage: 'French',
    Capital: 'Antananarivo',
    Currency: 'Malagasy ariary',
    Flag: 'https://flagsapi.com/MG/flat/64.png',
    FutureConnections: 6430000,
    PopulationSize: 29611714,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  MW: {
    Quadrant: 'East',
    CountryAbbrv: 'MW',
    CountryName: 'Malawi',
    AreaCode: 265,
    OfficialLanguage: 'Chichewa',
    Capital: 'Lilongwe',
    Currency: 'Malawian kwacha',
    Flag: 'https://flagsapi.com/MW/flat/64.png',
    FutureConnections: 4030000,
    PopulationSize: 20405317,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  MU: {
    Quadrant: 'East',
    CountryAbbrv: 'MU',
    CountryName: 'Mauritius',
    AreaCode: 230,
    OfficialLanguage: 'Creole',
    Capital: 'Port Louis',
    Currency: 'Mauritian rupee',
    Flag: 'https://flagsapi.com/MU/flat/64.png',
    FutureConnections: 826900,
    PopulationSize: 1262523,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  MZ: {
    Quadrant: 'East',
    CountryAbbrv: 'MZ',
    CountryName: 'Mozambique',
    AreaCode: 258,
    OfficialLanguage: 'Emakhuwa',
    Capital: 'Maputo',
    Currency: 'Mozambican metical',
    Flag: 'https://flagsapi.com/MZ/flat/64.png',
    FutureConnections: 7540000,
    PopulationSize: 32969518,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  RW: {
    Quadrant: 'East',
    CountryAbbrv: 'RW',
    CountryName: 'Rwanda',
    AreaCode: 250,
    OfficialLanguage: 'Kinyarwanda',
    Capital: 'Kigali',
    Currency: 'Rwandan franc',
    Flag: 'https://flagsapi.com/RW/flat/64.png',
    FutureConnections: 3540000,
    PopulationSize: 13776698,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SC: {
    Quadrant: 'East',
    CountryAbbrv: 'SC',
    CountryName: 'Seychelles',
    AreaCode: 248,
    OfficialLanguage: 'Creole',
    Capital: 'Victoria',
    Currency: 'Seychellois rupee',
    Flag: 'https://flagsapi.com/SC/flat/64.png',
    FutureConnections: 78300,
    PopulationSize: 107341,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SO: {
    Quadrant: 'East',
    CountryAbbrv: 'SO',
    CountryName: 'Somalia',
    AreaCode: 252,
    OfficialLanguage: 'Somali',
    Capital: 'Mogadishu',
    Currency: 'Somali shilling',
    Flag: 'https://flagsapi.com/SO/flat/64.png',
    FutureConnections: 2270000,
    PopulationSize: 17597511,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SS: {
    Quadrant: 'East',
    CountryAbbrv: 'SS',
    CountryName: 'South Sudan',
    AreaCode: 211,
    OfficialLanguage: 'Arabic',
    Capital: 'Juba',
    Currency: 'South Sudanese Pound',
    Flag: 'https://flagsapi.com/SS/flat/64.png',
    FutureConnections: 1250000,
    PopulationSize: 10913164,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  TZ: {
    Quadrant: 'East',
    CountryAbbrv: 'TZ',
    CountryName: 'Tanzania',
    AreaCode: 255,
    OfficialLanguage: 'Kiswahili or Swahili',
    Capital: 'Dodoma',
    Currency: 'Tanzanian shilling',
    Flag: 'https://flagsapi.com/TZ/flat/64.png',
    FutureConnections: 15600000,
    PopulationSize: 65497748,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  UG: {
    Quadrant: 'East',
    CountryAbbrv: 'UG',
    CountryName: 'Uganda',
    AreaCode: 256,
    OfficialLanguage: 'English',
    Capital: 'Kampala',
    Currency: 'Ugandan shilling',
    Flag: 'https://flagsapi.com/UG/flat/64.png',
    FutureConnections: 13920000,
    PopulationSize: 47249585,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ZM: {
    Quadrant: 'East',
    CountryAbbrv: 'ZM',
    CountryName: 'Zambia',
    AreaCode: 260,
    OfficialLanguage: 'English',
    Capital: 'Lusaka',
    Currency: 'Zambian kwacha',
    Flag: 'https://flagsapi.com/ZM/flat/64.png',
    FutureConnections: 5470000,
    PopulationSize: 20017675,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ZW: {
    Quadrant: 'East',
    CountryAbbrv: 'ZW',
    CountryName: 'Zimbabwe',
    AreaCode: 263,
    OfficialLanguage: 'English',
    Capital: 'Harare',
    Currency: 'United States Dollar',
    Flag: 'https://flagsapi.com/ZW/flat/64.png',
    FutureConnections: 4650000,
    PopulationSize: 15100000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  RE: {
    Quadrant: 'East',
    CountryAbbrv: 'RE',
    CountryName: 'Réunion Island',
    AreaCode: 262,
    OfficialLanguage: 'French',
    Capital: 'Saint-Denis',
    Currency: 'Euro',
    Flag: 'https://flagsapi.com/RE/flat/64.png',
    FutureConnections: 373500,
    PopulationSize: 874400,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  YT: {
    Quadrant: 'East',
    CountryAbbrv: 'YT',
    CountryName: 'Mayotte',
    AreaCode: 262,
    OfficialLanguage: 'French',
    Capital: 'Mamoudzou',
    Currency: 'Euro',
    Flag: 'https://flagsapi.com/YT/flat/64.png',
    FutureConnections: 65700,
    PopulationSize: 282900,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  //South Africa_(29-33)___________________________________________________________________________________________________________________________
  BW: {
    Quadrant: 'South',
    CountryAbbrv: 'BW',
    CountryName: 'Botswana',
    AreaCode: 267,
    OfficialLanguage: 'Setswana',
    Capital: 'Gaborone',
    Currency: 'Botswana pula',
    Flag: 'https://flagsapi.com/BW/flat/64.png',
    FutureConnections: 1480000,
    PopulationSize: 2630296,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  LS: {
    Quadrant: 'South',
    CountryAbbrv: 'LS',
    CountryName: 'Lesotho',
    AreaCode: 266,
    OfficialLanguage: 'Sesotho',
    Capital: 'Maseru',
    Currency: 'Lesotho loti',
    Flag: 'https://flagsapi.com/LS/flat/64.png',
    FutureConnections: 1130000,
    PopulationSize: 2305825,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  NA: {
    Quadrant: 'South',
    CountryAbbrv: 'NA',
    CountryName: 'Namibia',
    AreaCode: 264,
    OfficialLanguage: 'Unknown',
    Capital: 'Windhoek',
    Currency: 'Namibian Dollar',
    Flag: 'https://flagsapi.com/NA/flat/64.png',
    FutureConnections: 1330000,
    PopulationSize: 2567012,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ZA: {
    Quadrant: 'South',
    CountryAbbrv: 'ZA',
    CountryName: 'South Africa',
    AreaCode: 27,
    OfficialLanguage: 'IsiZulu',
    Capital: 'Pretoria / Cape Town',
    Currency: 'South African rand',
    Flag: 'https://flagsapi.com/ZA/flat/64.png',
    FutureConnections: 41190000,
    PopulationSize: 60600000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SZ: {
    Quadrant: 'South',
    CountryAbbrv: 'SZ',
    CountryName: 'Eswatini',
    AreaCode: 268,
    OfficialLanguage: 'English',
    Capital: 'Mbabane',
    Currency: 'Swazi lilangeni',
    Flag: 'https://flagsapi.com/SZ/flat/64.png',
    FutureConnections: 553900,
    PopulationSize: 1180000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  //West Africa__(34-50)_______________________________________________________________________________________________________________________________
  BJ: {
    Quadrant: 'West',
    CountryAbbrv: 'BJ',
    CountryName: 'Benin',
    AreaCode: 229,
    OfficialLanguage: 'French',
    Capital: 'Porto-Novo',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/BJ/flat/64.png',
    FutureConnections: 3660000,
    PopulationSize: 13712828,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  BF: {
    Quadrant: 'West',
    CountryAbbrv: 'BF',
    CountryName: 'Burkina Faso',
    AreaCode: 226,
    OfficialLanguage: 'French',
    Capital: 'Ouagadougou',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/BF/flat/64.png',
    FutureConnections: 5950000,
    PopulationSize: 22673762,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  CV: {
    Quadrant: 'West',
    CountryAbbrv: 'CV',
    CountryName: 'Cabo Verde',
    AreaCode: 238,
    OfficialLanguage: 'Portuguese',
    Capital: 'Praia',
    Currency: 'Cape Verdean escudo',
    Flag: 'https://flagsapi.com/CV/flat/64.png',
    FutureConnections: 349800,
    PopulationSize: 593149,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  CI: {
    Quadrant: 'West',
    CountryAbbrv: 'CI',
    CountryName: "Cote D'Ivoire",
    AreaCode: 225,
    OfficialLanguage: 'French',
    Capital: 'Yamoussoukro',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/CI/flat/64.png',
    FutureConnections: 9940000,
    PopulationSize: 27720000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  GH: {
    Quadrant: 'West',
    CountryAbbrv: 'GH',
    CountryName: 'Ghana',
    AreaCode: 233,
    OfficialLanguage: 'English',
    Capital: 'Accra',
    Currency: 'Ghanaian cedi',
    Flag: 'https://flagsapi.com/GH/flat/64.png',
    FutureConnections: 16990000,
    PopulationSize: 33475870,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  GM: {
    Quadrant: 'West',
    CountryAbbrv: 'GM',
    CountryName: 'Gambia',
    AreaCode: 220,
    OfficialLanguage: 'English',
    Capital: 'Banjul',
    Currency: 'Dalasi',
    Flag: 'https://flagsapi.com/GM/flat/64.png',
    FutureConnections: 1290000,
    PopulationSize: 2705992,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  GN: {
    Quadrant: 'West',
    CountryAbbrv: 'GN',
    CountryName: 'Guinea',
    AreaCode: 224,
    OfficialLanguage: 'French',
    Capital: 'Conakry',
    Currency: 'Guinean franc',
    Flag: 'https://flagsapi.com/GN/flat/64.png',
    FutureConnections: 3150000,
    PopulationSize: 13859341,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  GW: {
    Quadrant: 'West',
    CountryAbbrv: 'GW',
    CountryName: 'Guinea-Bissau',
    AreaCode: 245,
    OfficialLanguage: 'Portuguese',
    Capital: 'Bissau',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/GW/flat/64.png',
    FutureConnections: 571000,
    PopulationSize: 2110000,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  LR: {
    Quadrant: 'West',
    CountryAbbrv: 'LR',
    CountryName: 'Liberia',
    AreaCode: 231,
    OfficialLanguage: 'English',
    Capital: 'Monrovia',
    Currency: 'Liberian Dollar',
    Flag: 'https://flagsapi.com/LR/flat/64.png',
    FutureConnections: 1150000,
    PopulationSize: 5302681,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ML: {
    Quadrant: 'West',
    CountryAbbrv: 'ML',
    CountryName: 'Mali',
    AreaCode: 223,
    OfficialLanguage: 'French',
    Capital: 'Bamako',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/ML/flat/64.png',
    FutureConnections: 6330000,
    PopulationSize: 22593590,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  MR: {
    Quadrant: 'West',
    CountryAbbrv: 'MR',
    CountryName: 'Mauritania',
    AreaCode: 222,
    OfficialLanguage: 'Arabic',
    Capital: 'Nouakchott',
    Currency: 'Mauritanian ouguiya',
    Flag: 'https://flagsapi.com/MR/flat/64.png',
    FutureConnections: 1730000,
    PopulationSize: 4736139,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  NE: {
    Quadrant: 'West',
    CountryAbbrv: 'NE',
    CountryName: 'Niger',
    AreaCode: 227,
    OfficialLanguage: 'French',
    Capital: 'Niamey',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/NE/flat/64.png',
    FutureConnections: 3720000,
    PopulationSize: 26207977,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  NG: {
    Quadrant: 'West',
    CountryAbbrv: 'NG',
    CountryName: 'Nigeria',
    AreaCode: 234,
    OfficialLanguage: 'English',
    Capital: 'Abuja',
    Currency: 'Nigerian naira',
    Flag: 'https://flagsapi.com/NG/flat/64.png',
    FutureConnections: 109200000,
    PopulationSize: 218541212,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SN: {
    Quadrant: 'West',
    CountryAbbrv: 'SN',
    CountryName: 'Senegal',
    AreaCode: 221,
    OfficialLanguage: 'French',
    Capital: 'Dakar',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/SN/flat/64.png',
    FutureConnections: 8010000,
    PopulationSize: 17316449,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SL: {
    Quadrant: 'West',
    CountryAbbrv: 'SL',
    CountryName: 'Sierra Leone',
    AreaCode: 232,
    OfficialLanguage: 'English',
    Capital: 'Freetown',
    Currency: 'Sierra Leonean leone',
    Flag: 'https://flagsapi.com/SL/flat/64.png',
    FutureConnections: 2670000,
    PopulationSize: 8605718,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  TG: {
    Quadrant: 'West',
    CountryAbbrv: 'TG',
    CountryName: 'Togo',
    AreaCode: 228,
    OfficialLanguage: 'French',
    Capital: 'Lomé',
    Currency: 'West African CFA franc',
    Flag: 'https://flagsapi.com/TG/flat/64.png',
    FutureConnections: 2230000,
    PopulationSize: 8848699,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  SH: {
    Quadrant: 'West',
    CountryAbbrv: 'SH',
    CountryName: 'Saint Helena, Ascension and Tristan da Cunha',
    AreaCode: 290,
    OfficialLanguage: 'English',
    Capital: 'Jamestown',
    Currency: 'Saint Helena pound & pound sterling',
    Flag: 'https://flagsapi.com/GB/flat/64.png',
    FutureConnections: 2294,
    PopulationSize: 6135,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  //Central Africa__(51-59)________________________________________________________________________________________________________________________
  AO: {
    Quadrant: 'Central',
    CountryAbbrv: 'AO',
    CountryName: 'Angola',
    AreaCode: 244,
    OfficialLanguage: 'Portuguese',
    Capital: 'Luanda',
    Currency: 'Angolan kwanza',
    Flag: 'https://flagsapi.com/AO/flat/64.png',
    FutureConnections: 12410000,
    PopulationSize: 35588987,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  CM: {
    Quadrant: 'Central',
    CountryAbbrv: 'CM',
    CountryName: 'Cameroon',
    AreaCode: 237,
    OfficialLanguage: 'Major African languages',
    Capital: 'Yaoundé',
    Currency: 'Central African CFA franc',
    Flag: 'https://flagsapi.com/CM/flat/64.png',
    FutureConnections: 10050000,
    PopulationSize: 27914536,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  CF: {
    Quadrant: 'Central',
    CountryAbbrv: 'CF',
    CountryName: 'Central African Republic',
    AreaCode: 236,
    OfficialLanguage: 'French',
    Capital: 'Bangui',
    Currency: 'Central African CFA franc',
    Flag: 'https://flagsapi.com/CF/flat/64.png',
    FutureConnections: 355100,
    PopulationSize: 5579144,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  TD: {
    Quadrant: 'Central',
    CountryAbbrv: 'TD',
    CountryName: 'Chad',
    AreaCode: 235,
    OfficialLanguage: 'French',
    Capital: "N'Djamena",
    Currency: 'Central African CFA franc',
    Flag: 'https://flagsapi.com/TD/flat/64.png',
    FutureConnections: 3260000,
    PopulationSize: 17723315,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  CD: {
    Quadrant: 'Central',
    CountryAbbrv: 'CD',
    CountryName: 'Democratic Republic of the Congo',
    AreaCode: 243,
    OfficialLanguage: 'French',
    Capital: 'Kinshasa',
    Currency: 'Congolese franc',
    Flag: 'https://flagsapi.com/CD/flat/64.png',
    FutureConnections: 16500000,
    PopulationSize: 99010212,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  CG: {
    Quadrant: 'Central',
    CountryAbbrv: 'CG',
    CountryName: 'Republic of the Congo',
    AreaCode: 242,
    OfficialLanguage: 'French',
    Capital: 'Brazzaville',
    Currency: 'Central African CFA franc',
    Flag: 'https://flagsapi.com/CG/flat/64.png',
    FutureConnections: 1450000,
    PopulationSize: 5884363,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  GQ: {
    Quadrant: 'Central',
    CountryAbbrv: 'GQ',
    CountryName: 'Equatorial Guinea',
    AreaCode: 240,
    OfficialLanguage: 'Spanish',
    Capital: 'Malabo',
    Currency: 'Central African CFA franc',
    Flag: 'https://flagsapi.com/GQ/flat/64.png',
    FutureConnections: 386500,
    PopulationSize: 1530098,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  GA: {
    Quadrant: 'Central',
    CountryAbbrv: 'GA',
    CountryName: 'Gabon',
    AreaCode: 241,
    OfficialLanguage: 'French',
    Capital: 'Libreville',
    Currency: 'Central African CFA franc',
    Flag: 'https://flagsapi.com/GA/flat/64.png',
    FutureConnections: 1430000,
    PopulationSize: 2388992,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },

  ST: {
    Quadrant: 'Central',
    CountryAbbrv: 'ST',
    CountryName: 'Sao Tome And Principe',
    AreaCode: 239,
    OfficialLanguage: 'Portuguese',
    Capital: 'São Tomé',
    Currency: 'Sao Tome and Principe dobra',
    Flag: 'https://flagsapi.com/ST/flat/64.png',
    FutureConnections: 72200,
    PopulationSize: 227380,
    ColonizationHistory: '',
    //WikiLink:  `href =""`,
  },
};

export default AfricanCountryList;
