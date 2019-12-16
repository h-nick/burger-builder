import React from 'react';
import Classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = React.memo((props) => {
  return (
    <>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={Classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </>
  );
}, (prevProps, newProps) => {
  return prevProps.show === newProps.show && newProps.children === prevProps.children;
});

export default Modal;