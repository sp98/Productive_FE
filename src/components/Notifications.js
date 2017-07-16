import React from 'react';

export const NotifyError = (props) => {
  const { notifyErrorStyle } = styles;
  return (
    <div style={notifyErrorStyle}>
      <div>
      {props.title}
      </div>
      <div>
      {props.message}
      </div>
      <div onClick={props.onCancel}>
       Close
      </div>
    </div>
  );
};

export const NotifySuccess = (props) => {
  const { notifySuccessStyle } = styles;
  return (
    <div style={notifySuccessStyle}>
      <div>
      {props.title}
      </div>
      <div>
      {props.message}
      </div>
      <div onClick={props.onCancel}>
       Close
      </div>
    </div>
  );
};

const styles = {
  notifyErrorStyle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '10px 10px 10px 10px',
    padding: '10px 10px 10px 10px',
    border: '2px solid',
    background: 'tomato',
    borderRadius: '5px',
    alignContent: 'center',
  },

  notifySuccessStyle: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '10px 10px 10px 10px',
    padding: '10px 10px 10px 10px',
    border: '2px solid',
    background: 'green',
    borderRadius: '5px',
    alignContent: 'center',
  }
};
