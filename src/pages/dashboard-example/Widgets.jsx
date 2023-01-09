import { Button, InputNumber } from 'antd';
import Input from 'antd/es/input/Input';
import { AppInput } from '../../components/Input';
import { ListCity } from '../../components/listCity';
import { ListIntervals } from '../../components/listIntervals';

export const WIDGETS = {
  listCity: {
    type: 'table',
    component: () => <ListCity />,
    label: 'Список городов',
    height: 8,
    width: 8,
  },
  listIntervals: {
    type: 'table',
    component: () => <ListIntervals />,
    label: 'Список интервалов',
    height: 4,
    width: 4,
  },
  inputSearchCity: {
    type: 'input',
    component: () => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Input defaultValue='Москва' />
        <Button type='primary' style={{ marginLeft: 8 }}>
          Поиск
        </Button>
      </div>
    ),
    label: 'Поиск города',
    height: 1,
    width: 2,
  },
  inputNumberIntervals: {
    type: 'input',
    component: () => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <InputNumber defaultValue={2} />
        <InputNumber defaultValue={7} />
        <Button type='primary'>Установить</Button>
      </div>
    ),
    label: 'Интервалы для зон',
    height: 1,
    width: 3,
  },
  buttonDownloadFile: {
    type: 'button',
    component: () => <Button type='primary'>Скачать</Button>,
    label: 'Скачать файл',
    height: 1,
    width: 1,
  },
};

const groups = [
  { type: 'table', label: 'Таблицы' },
  { type: 'input', label: 'Поля ввода' },
  { type: 'button', label: 'Кнопки' },
];

const getItems = () => {
  const items = [];
  groups.forEach(group => {
    items.push(group.label);
    items.push(
      Object.entries(WIDGETS).filter(
        ([key, value]) => value.type === group.type
      )
    );
  });
  return items;
};

export default function Widgets({ isEditDashboard = false }) {
  const items = getItems();
  return (
    <aside
      style={{
        width: isEditDashboard ? 190 : 0,
        padding: isEditDashboard ? 16 : 0,
      }}
    >
      <p style={{ textAlign: 'center', marginBottom: 16 }}>
        Выберите компоненты, которые хотите добавить
      </p>
      {items.map(item => {
        if (typeof item === 'string') {
          return (
            <p key={item} className='grid-stack-item-title'>
              {`${item}:`}
            </p>
          );
        }

        return item.map(([key, value]) => {
          const width = value.width ? value.width : '6';
          const height = value.height ? value.height : '4';
          return (
            <div
              key={key}
              data-type={key}
              className='droppable grid-stack-item'
              gs-h={height}
              gs-w={width}
            >
              {value.label}
            </div>
          );
        });
      })}
    </aside>
  );
}
