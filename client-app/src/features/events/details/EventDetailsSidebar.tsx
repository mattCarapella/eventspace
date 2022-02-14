import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function EventDetailsSidebar() {
  return (
    <>
      <Segment
        textAlign='center'
        style={{border: 'none'}}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        3 people going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{position: 'relative'}}>
            <Label 
              style={{position: 'absolute'}}
              color='orange'
              ribbon='right'
            >
              Host
            </Label>
            <Image src={`/assets/user.png`} size='tiny' />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <Link to={`#`}>[username]</Link>
              </Item.Header>
              <Item.Extra style={{color: 'orange'}}>Following</Item.Extra>
            </Item.Content>
          </Item>
          <Item style={{ position: 'relative' }}>
            <Image size='tiny' src={'/assets/user.png'} />
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <Link to={`#`}>Sally</Link>
              </Item.Header>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </>
  );
}