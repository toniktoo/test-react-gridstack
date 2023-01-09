import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const items = [
  {
    key: '/',
    label: 'Пример 1 (Редактируемая доска)',
    icon: <SettingOutlined />,
    style: { paddingBottom: 6 },
  },
];

export const AppMenu = ({ handleEditDashboard = '' }) => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('link2');
  const onClick = e => {
    if (e.key === 'some-ref') {
      return;
    }
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={[
          ...items,
          {
            ...(true && {
              key: 'some-ref',
              label: (
                <a
                  href='https://gridstackjs.com/demo/index.html'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Еще примеры как можно релизовать функцонал
                </a>
              ),
              style: { paddingBottom: 6 },
            }),
          },
        ]}
        style={{ padding: 16, width: '100%' }}
      />
      {handleEditDashboard && (
        <Button
          onClick={handleEditDashboard}
          style={{ marginLeft: 8, marginRight: 8 }}
          type='primary'
        >
          Настроить доску
        </Button>
      )}
    </div>
  );
};
