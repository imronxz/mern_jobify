import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';


const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'Semua Jobs',
    path: 'semua-pekerjaan',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'Tambah Jobs',
    path: 'tambah-pekerjaan',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'Profile',
    path: 'profile-pekerja',
    icon: <ImProfile />,
  },
];
export default links;
