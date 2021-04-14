import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onAfterOpen, onRequestClose, style, contentLabel, component, title }) => (
  <ReactModal
    isOpen={isOpen}
    onAfterOpen={onAfterOpen}
    onRequestClose={onRequestClose}
    style={style}
    contentLabel={contentLabel}
  >
    <div>
      <div className="d-flex cursor-pointer">
        <h1>{title}</h1>
        <span aria-hidden="true" onClick={onRequestClose}>
          <i className="fas fa-times" />
        </span>
      </div>
      {component}
    </div>
  </ReactModal>
);

Modal.propTypes = {
  isOpen: PropTypes.any.isRequired,
  onAfterOpen: PropTypes.func,
  onRequestClose: PropTypes.func.isRequired,
  style: PropTypes.object,
  contentLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired,
};

export default Modal;
