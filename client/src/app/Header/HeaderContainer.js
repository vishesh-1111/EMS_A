
import Link from 'next/link'
 import   {useRouter} from 'next/navigation';
import { Avatar, Dropdown, Layout, Badge, Button } from 'antd';

// import Notifications from '@/components/Notification';

import { LogoutOutlined, ToolOutlined, UserOutlined,UploadOutlined } from '@ant-design/icons';

import useLanguage from '../../components/uselanguage';
import { useEffect, useState } from 'react';

export default function HeaderContent({user}) {
  const { Header } = Layout;
  const navigate = useRouter();
  
  
  const translate = useLanguage();

  const ProfileDropdown = () => {
    return (
      <div className="profileDropdown" onClick={() => navigate.push('/profile')}>
        <Avatar
          size="large"
          className="last"
          src={user?.photo ? FILE_BASE_URL + user?.photo : undefined}
          style={{
            color: '#f56a00',
            backgroundColor: user?.photo ? 'none' : '#fde3cf',
            boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 6px 1px',
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div className="profileDropdownInfo">
          <p>
            {user.name}
          </p>
          <p>{user?.email}</p>
        </div>
      </div>
    );
  };

  const DropdownMenu = ({ text }) => {
    return <span style={{}}>{text}</span>;
  };

  const items = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <UserOutlined />,
      key: 'settingProfile',
      label: (
        <Link href={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    
    {
      icon: <ToolOutlined />,
      key: 'settingApp',
      label: <Link href={'/settings'}>{translate('app_settings')}</Link>,
    },

    {
      type: 'divider',
    },

    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link href={'/logout'}>{translate('logout')}</Link>,
    },
  ];
  const guestitems = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <UserOutlined />,
      key: 'settingProfile',
      label: (
        <Link href={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    
    {
      type: 'divider',
    },

  ];

  const adminitems = [
    {
      label: <ProfileDropdown className="headerDropDownMenu" />,
      key: 'ProfileDropdown',
    },
    {
      type: 'divider',
    },
    {
      icon: <UserOutlined />,
      key: 'settingProfile',
      label: (
        <Link href={'/profile'}>
          <DropdownMenu text={translate('profile_settings')} />
        </Link>
      ),
    },
    
      {
        icon: <UploadOutlined />,
        key: 'create-event',
        label: (
          <Link href={'/create-event'}>
          <DropdownMenu text={translate('Create Event')} />
        </Link>
      ),
    },
    {
      icon: <ToolOutlined />,
      key: 'settingApp',
      label: <Link href={'/settings'}>{translate('app_settings')}</Link>,
    },

    {
      type: 'divider',
    },

    {
      icon: <LogoutOutlined />,
      key: 'logout',
      label: <Link href={'/logout'}>{translate('logout')}</Link>,
    },
  ];

  return (
    <Header
      style={{
        padding: '20px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        gap: ' 15px',
      }}
    >
    
        
        <Dropdown
        menu={
          user.name === 'guest'
            ? { items: guestitems }
            : user.role === 'user'
            ? { items: items }
            : { items: adminitems }
        }
        trigger={['click']}
        placement="bottomRight"
        stye={{ width: '280px', float: 'right' }}
        >
      
        {/* <Badge dot> */}
        <Avatar
          className="last"
          src={user?.photo ? FILE_BASE_URL + user?.photo : undefined}
          style={{
            color: '#f56a00',
            backgroundColor: user?.photo ? 'none' : '#fde3cf',
            boxShadow: 'rgba(150, 190, 238, 0.35) 0px 0px 10px 2px',
            float: 'right',
            cursor: 'pointer',
          }}
          size="large"
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        {/* </Badge> */}
      </Dropdown>

 

     
    </Header>
  );
}

