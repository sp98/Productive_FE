import { SHOW_MODALS, HIDE_MODALS } from './types';

export const showModals = (modalType) => {
  console.log(`Inside SHOW MODALS action creator ---> ${modalType}`);
  return ({
    type: SHOW_MODALS,
    payload: modalType
  });
};


export const hideModals = () => {
  console.log('Inside HIDE MODALS action creator');
  return ({
    type: HIDE_MODALS
  });
};
