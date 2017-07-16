import React from 'react';
import ModalWrapper from './ModalWrapper';

const ConfirmModal = (props) => {
console.log('Inside Confirm modal');
return (
  <ModalWrapper
     {...props}
     title="Delete"
     width={400}
  >
  <div> Confirm Modal </div>
  </ModalWrapper>
);
};
export default ConfirmModal;
