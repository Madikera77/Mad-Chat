import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';

import Overlay from './Overlay';

import './client.scss';

export default class Chatroom extends React.Component {
  constructor(props, context) {
    super(props, context)

    const { chatHistory } = props

    this.state = {
      chatHistory,
      input: ''
    }

    this.onInput = this.onInput.bind(this)
    this.onSendMessage = this.onSendMessage.bind(this)
    this.onMessageReceived = this.onMessageReceived.bind(this)
    this.updateChatHistory = this.updateChatHistory.bind(this)
    this.scrollChatToBottom = this.scrollChatToBottom.bind(this)
  }

  componentDidMount() {
    this.props.registerHandler(this.onMessageReceived)
    this.scrollChatToBottom()
  }

  componentDidUpdate() {
    this.scrollChatToBottom()
  }

  componentWillUnmount() {
    this.props.unregisterHandler()
  }

  onInput(e) {
    this.setState({
      input: e.target.value
    })
  }

  onSendMessage() {
    if (!this.state.input)
      return

    this.props.onSendMessage(this.state.input, (err) => {
      if (err)
        return console.error(err)

      return this.setState({ input: '' })
    })
  }

  onMessageReceived(entry) {
    console.log('onMessageReceived:', entry)
    this.updateChatHistory(entry)
  }

  updateChatHistory(entry) {
    this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
  }

  scrollChatToBottom() {
    this.panel.scrollTo(0, this.panel.scrollHeight)
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div className='chatWindow'>
          <div className='header'>
            <p className="title">
              {this.props.chatroom.name}
            </p>
            <RaisedButton
              primary
              icon={
                <FontIcon
                  style={{ fontSize: 24 }}
                  className="material-icons"
                >
                  {'close'}
                </FontIcon>
              }
              onClick={this.props.onLeave}
            />
          </div>
          <div className="chatPanel">
            <div className="scrollable" ref={(panel) => { this.panel = panel; }}>
              <List>
                {
                  this.state.chatHistory.map(
                    ({ user, message, event }, i) => [
                      <div className="NoDots">
                        <ListItem
                          key={i}
                          style={{ color: '#fafafa' }}
                          leftAvatar={<Avatar src={user.image} />}
                          primaryText={`${user.name} ${event || ''}`}
                          secondaryText={
                            message &&
                            <div className="OutputText">
                              {message}
                            </div>
                          }
                        />
                      </div>,
                      <Divider inset />
                    ]
                  )
                }
              </List>
            </div>
            <div className="InputPanel">
              <TextField
                textareaStyle={{ color: '#fafafa' }}
                hintStyle={{ color: '#fafafa' }}
                floatingLabelStyle={{ color: '#fafafa' }}
                hintText="Rédigez un message."
                floatingLabelText="Rédigez un message."
                multiLine
                rows={4}
                rowsMax={4}
                onChange={this.onInput}
                value={this.state.input}
                onKeyPress={e => (e.key === 'Enter' ? this.onSendMessage() : null)}
              />
              <FloatingActionButton
                onClick={this.onSendMessage}
                style={{ marginLeft: 20 }}
              >
                <FontIcon
                  style={{ fontSize: 32 }}
                  className="material-icons"
                >
                  {'chat_bubble_outline'}
                </FontIcon>
              </FloatingActionButton>
            </div>
          </div>
          <Overlay
            background="#C08772"
          />
        </div>
      </div>
    )
  }
}
