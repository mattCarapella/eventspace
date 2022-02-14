import React from 'react';
import {Segment, Header, Comment, Form, Button} from 'semantic-ui-react'

export default function EventDetailsComments() {
  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{border: 'none'}}
      >
        <Header>Comments</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src='/assets/user.png'/>
            <Comment.Content>
              <Comment.Author as='a'>HitlerDidNothingWrong1488</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>niggerfaggot</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <Comment>
            <Comment.Avatar src='/assets/user.png'/>
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Who got da honks?</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
          <Form reply>
            <Form.TextArea/>
            <Button
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>

    </>
  );
}