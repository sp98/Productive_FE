import React from 'react';

export const notifyError = (props) => {
  return (
    <div style={styles.notifyStyle}>
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
  notifyStyle: {
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
  }
};
