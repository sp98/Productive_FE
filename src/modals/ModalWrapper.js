import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

class ModalWrapper extends React.Component {

  render() {
    const handleBackgroundClick = e => {
    console.log(e.target);
    if (e.target !== e.currentTarget) {
      console.log('clicked outside');
      this.props.showModals();
    }
  };

  const onOk = () => {
    this.props.onOk();
    this.props.showModals();
  };

  const okButton = this.props.showOk
    ? (
      <button
        onClick={onOk}
        disabled={this.props.okDisabled}
      >
        {this.props.okText}
      </button>
    ) : null;

    return (
      <div onClick={handleBackgroundClick} style={styles.modalWrapperStyle}>
      <header>

        <button onClick={this.props.showModals}>Close</button>
      </header>

      {this.props.children}

      {okButton}
    </div>
    );
  }
}

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string,
  showOk: PropTypes.bool,
  okText: PropTypes.string,
  okDisabled: PropTypes.bool,
  width: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,

  // methods
  hideModal: PropTypes.func,
  onOk: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: '',
  showOk: true,
  okText: 'OK',
  okDisabled: false,
  width: 600,
  onOk: () => {}
};

const styles = {
  modalWrapperStyle: {
    position: 'absolute',
    backgroundColor: 'grey',
    zIndex: '998',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400px',
    marginTop: '100px',
    marginleft: '100px'

  }
};

export default ModalWrapper;
