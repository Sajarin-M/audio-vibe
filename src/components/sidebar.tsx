import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className='bg-dark-9 w-[300px] shrink-0 rounded-md py-6 px-6 flex flex-col gap-5'>
      <SideBarItem to='/' icon='i-tabler-home' title='Home' />
      <SideBarItem to='/tracks' icon='i-tabler-music' title='Top Tracks' />
      <SideBarItem to='/artists' icon='i-tabler-user' title='Top Artists' />
    </div>
  );
}

type SidebarItemProps = {
  to: string;
  icon: string;
  title: string;
};

function SideBarItem({ to, icon, title }: SidebarItemProps) {
  return (
    <NavLink to={to} className='text-inherit decoration-none'>
      {({ isActive }) => (
        <div
          className={`flex gap-sm items-center cursor-pointer ${
            isActive ? '' : 'text-gray-4'
          } hover:text-inherit transition-colors duration-400`}
        >
          <div className={`${icon} text-2xl`} />
          <div className='font-bold mt-[0.3rem]'>{title}</div>
        </div>
      )}
    </NavLink>
  );
}
