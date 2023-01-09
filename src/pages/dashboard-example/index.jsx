import Card from './Card';
import Grid from './Grid';
import Widgets, { WIDGETS } from './Widgets';
import { useState, useCallback } from 'react';
import '../../index.scss';
import { AppMenu } from '../../components/Menu';

export const DashboardExample = () => {
  const [widgets, setWidgets] = useState([]);
  const [isEditDashboard, setIsEditDashboard] = useState(false);

  const handleEditDashboard = useCallback(() => {
    setIsEditDashboard(!isEditDashboard);
  }, [isEditDashboard]);

  return (
    <>
      <div className='header'>
        <AppMenu handleEditDashboard={handleEditDashboard} />
      </div>
      <Widgets isEditDashboard={isEditDashboard} />
      <Grid setWidgets={setWidgets} isEditDashboard={isEditDashboard}>
        {actions =>
          widgets.map(widget => {
            const { component: Widget, label } = WIDGETS[widget.type];

            return (
              Widget && (
                <Card
                  key={widget.id}
                  actions={actions}
                  title={label}
                  isEditDashboard={isEditDashboard}
                  {...widget}
                >
                  <Widget />
                </Card>
              )
            );
          })
        }
      </Grid>
    </>
  );
};
