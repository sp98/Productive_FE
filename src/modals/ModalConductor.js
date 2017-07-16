import React from 'react';
import { connect } from 'react-redux';
import ConfirmModal from './ConfirmModal';
import * as actions from '../actions';

const ModalConductor = (props) => {
  switch (props.currentModal) {
    case 'CONFIRM_POPUP':
    console.log(`Modal Conductor type ${props.currentModal}`);
    return <ConfirmModal {...props} />;
    default:
    return null;
  }
};

export default ModalConductor;
