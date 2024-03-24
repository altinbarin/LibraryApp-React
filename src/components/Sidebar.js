// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined,UserOutlined,CalendarOutlined,FontColorsOutlined, CopyOutlined, ItalicOutlined  } from '@ant-design/icons';

const items = [
  {
    label: 'Kütüphanem',
    key: 'sub1',
    icon: <HomeOutlined />,
    type: 'group',
    children: [
      { label: 'Anasayfa', key: '1', route: '/' },
    ]
  },
  {
    label: 'Kitap İşlemleri',
    key: 'sub2',
    icon: <CopyOutlined />,
    type: 'group',
    children: [
      { label: 'Kitap Listesi', key: '2', route: '/books' },
      { label: 'Kitap Ekle', key: '3', route: '/add-book' },
    ]
  },
  {
    label: 'Ödünç Verilen Kitaplar',
    key: 'sub8',
    icon: <CalendarOutlined />,
    type: 'group',
    children: [
      { label: 'Ödünç Verilen Kitaplar Listesi', key: '14', route: '/borrowedbooks' },
      { label: 'İade Alınmış Kitaplar', key: '15', route: '/returnedbooks' },
    ]
  },
  {
    label: 'Yayınevi İşlemleri',
    key: 'sub3',
    icon: <FontColorsOutlined />,
    type: 'group',
    children: [
      { label: 'Yayınevi Listesi', key: '4', route: '/publishers' },
      { label: 'Yayınevi Ekle', key: '5', route: '/add-publisher' },
    ]
  },
  {
    label: 'Yazar İşlemleri',
    key: 'sub4',
    icon: <ItalicOutlined />,
    type: 'group',
    children: [
      { label: 'Yazar Listesi', key: '6', route: '/authors' },
      { label: 'Yazar Ekle', key: '7', route: '/add-author' },
    ]
  },
  {
    label: 'Tür İşlemleri',
    key: 'sub5',
    icon: <AppstoreOutlined />,
    type: 'group',
    children: [
      { label: 'Tür Listesi', key: '8', route: '/genres' },
      { label: 'Tür Ekle', key: '9', route: '/add-genre' },
    ]
  },
  {
    label: 'Üye İşlemleri',
    key: 'sub6',
    icon: <UserOutlined />,
    type: 'group',
    children: [
      { label: 'Üye Ekle', key: '11', route: '/add-member' },
      { label: 'Üye Listesi', key: '10', route: '/members' },
      { label: 'Silinmiş Üyeler', key: '12', route: '/deleted-member' },
    ]
  },
  {
    type: 'divider',
  },
  {
    label: 'Ayarlar',
    key: 'sub7',
    icon: <SettingOutlined />,
    children: [
      { label: 'Option 10', key: '13' },
    ]
  },
];

const Sidebar = () => {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
    >
      {items.map(item => (
        <React.Fragment key={item.key}>
          {item.type === 'group' && (
            <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
              {item.children.map(child => (
                <Menu.Item key={child.key}>
                  <Link to={child.route}>{child.label}</Link>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          )}
          {item.type === 'divider' && <Menu.Divider />}
        </React.Fragment>
      ))}
    </Menu>
  );
};

export default Sidebar;
