import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import FullScreen from './FullScreen';
import Overlay from './Overlay';

import './client.scss';

function renderAvatar(user) {
  const props = user
    ? { src: user.image }
    : {
      icon:
      <FontIcon
        style={{ fontSize: 96 }}
        className="material-icons"
      >
        {'perm_identity'}
      </FontIcon>
    }

  return <Avatar size={160} {...props} />
}

function fullName(user) {
  return user ? `${user.name} ${user.lastName}` : 'Connexion ?'
}

export default ({ children, user }) => (
  <FullScreen>
    <div className="ContentWrapper">
      <div className="Center">
        <div className="Content">
          <div className="Relative">
            <div className="Sticky">
              <div className="AvatarWrapper">
                <img src="logo_chanel.svg" />
                <Link to="/user">
                  { renderAvatar(user) }
                </Link>
                <p className="UserName"> { fullName(user) } </p>
              </div>
            </div>
          </div>
          { children }
        </div>
      </div>
    </div>
    <FullScreen>
      <Overlay
        opacity={0.4}
        background="#212121"
      />
    </FullScreen>
  </FullScreen>
)
