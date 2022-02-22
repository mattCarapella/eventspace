import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
  // This was created in section 111
	return (
		<Segment placeholder>
			<Header icon>
				<Icon name='search' />
				Sorry. We've looked everywhere and can't find this.
			</Header>
			<Segment.Inline>
				<Button as={Link} to='/events' primary>
					Return to Events
				</Button>
			</Segment.Inline>
		</Segment>
	);
}