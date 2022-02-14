import { Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { Item, Segment, Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';

export default observer(function EventList() {

  const {eventStore} = useStore();
  const {eventsByDateGroup} = eventStore;
  
  return (
    <>
      {eventsByDateGroup.map(([group, events]) => (
        <Fragment key={group}>
          <Header sub color='grey'>{group}</Header>
          <Segment>
            <Item.Group divided>
              {events.map(event => (
                <EventListItem key={event.id} event={event} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
});