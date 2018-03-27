import React from 'react';
import Paper from 'material-ui/Paper';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

import './client.scss';

const getCardTitleStyle = () => ({
  display: 'flex',
  alignItems: 'center'
})

export default ({ chatroom, onEnter }) => (
  <Paper
    style={{ maxWidth: 500, marginBottom: 40 }}
    zDepth={5}
  >
    <div className="wrapper" onClick={onEnter}>
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              title={chatroom.name}
              style={getCardTitleStyle()}
            />
          }
        >
          <img height="100%" src={chatroom.image} alt="" />
        </CardMedia>
      </Card>
    </div>
  </Paper>
)
