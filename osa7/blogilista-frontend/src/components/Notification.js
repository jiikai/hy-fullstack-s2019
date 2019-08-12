import React from 'react';
import {connect} from 'react-redux';
import {StyledNotification} from '../styled';

const Notification = ({notification}) => {
  return (
    <StyledNotification inactive={!!notification} type={!notification ? '' : notification.msgClass}>
      {notification ? notification.msg : ''}
    </StyledNotification>
  );
};

const mapStateToProps = (state) => ({
  notification: state.notification
});

export default connect(mapStateToProps, null)(Notification);