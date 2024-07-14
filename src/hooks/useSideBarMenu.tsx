import { actionEnum } from '@/common/const/actionEnum';
import { AppSubjects } from '@/common/const/permession.type';
import { routesEnum } from '@/common/const/routesEnum';
import { selectAbilities } from '@/common/state/abilities.state';
import { ReactNode } from 'react';
import { FaCheck, FaKey, FaPowerOff, FaUser, FaUserTie } from 'react-icons/fa6';
import { MdPeople, MdLocalShipping, MdPrint } from 'react-icons/md';
import { BsHousesFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { PiOfficeChairFill } from 'react-icons/pi';
import { FaBlackTie } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';

interface Menu {
  label: string;
  path: AppSubjects;
  icon: ReactNode;
  search?: Record<string, any>;
  childMenu?: Menu[];
}

const search = { limit: 10, page: 1 };

const useSideBarMenu = () => {
  const abilities = useSelector(selectAbilities);
  const menu: Menu[] = [
    { label: 'tenants', path: routesEnum.tenants, icon: <BsHousesFill /> },
    {
      label: 'roles',
      path: routesEnum.roles,
      icon: <FaKey />,
      search,
    },
    {
      label: 'users',
      path: routesEnum.users,
      icon: <FaUser />,
      search,
      childMenu: [{ label: 'Approval List', path: 'approved', icon: <FaCheck /> }],
    },
    { label: 'employees', path: routesEnum.employees, icon: <FaUserTie />, search },
    { label: 'loans', path: routesEnum.loans, icon: <GiReceiveMoney />, search },
    { label: 'customers', path: routesEnum.customers, icon: <MdPeople />, search },
    { label: 'vendors', path: routesEnum.vendors, icon: <MdLocalShipping />, search },
    { label: 'products', path: routesEnum.products, icon: <MdPrint />, search },
    { label: 'department', path: routesEnum.departments, icon: <PiOfficeChairFill />, search },
    { label: 'hamada', path: routesEnum.users, icon: <FaPowerOff /> },
    { label: 'job title', path: routesEnum.jobTitles, icon: <FaBlackTie />, search },
  ];

  return { menu: menu.filter(({ path }) => abilities?.can(actionEnum.read, path as AppSubjects)) };
};

export default useSideBarMenu;
