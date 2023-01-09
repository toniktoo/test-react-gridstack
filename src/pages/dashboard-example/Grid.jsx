import { useRef, useEffect } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/h5/gridstack-dd-native';
import 'gridstack/dist/gridstack.css';
import { ListCity } from '../../components/listCity';

let id = 1;
export default function Grid({ children, setWidgets, isEditDashboard }) {
  const gridRef = useRef();

  useEffect(() => {
    gridRef.current = GridStack.init({
      cellHeight: 74,
      minRow: 4, // don't collapse when empty
      margin: 4,
      resizable: {
        handles: 'all',
      },
      acceptWidgets: true,
      dragIn: '.droppable', // class that can be dragged from outside
      dragInOptions: {
        revert: 'invalid',
        scroll: false,
        appendTo: 'body',
        helper: 'clone',
      },
      float: true,
    });

    const grid = gridRef.current;
    if (grid) {
      grid.on('dropped', function (event, previousWidget, newWidget) {
        const { el, w, h, x, y } = newWidget;
        grid.removeWidget(el);
        setWidgets(items => {
          console.log('items', items);
          return [
            ...items,
            {
              id: id++,
              type: el.dataset.type,
              w,
              h,
              x,
              y,
            },
          ];
        });
      });
    }
  }, []);

  const handleAdd = el => {
    if (el && gridRef.current) {
      gridRef.current.makeWidget(el);
    }
  };
  const handleRemove = (el, actualRemove = true) => {
    if (el && gridRef.current) {
      gridRef.current.removeWidget(el, false);
      actualRemove &&
        setWidgets(items => items.filter(item => `${item.id}` !== el.id));
    }
  };
  const handleEnableMove = (flag = true) => {
    if (gridRef.current) {
      gridRef.current.enableMove(flag);
    }
  };

  return (
    <section
      style={{
        ...(isEditDashboard && {
          backgroundImage: `linear-gradient(#fff 8px, transparent 8px), linear-gradient(90deg, #fff 8px, transparent 8px)`,
        }),
      }}
    >
      <div className='grid-stack'>
        {children({
          handleAdd,
          handleRemove,
          handleEnableMove,
        })}

        {/* <div
          class='grid-stack-item'
          data-gs-x='0'
          data-gs-y='0'
          data-gs-width='4'
          data-gs-height='2'
        >
          <div class='grid-stack-item-content'>
            <input type='text' />
          </div>
        </div> */}
      </div>
    </section>
  );
}
