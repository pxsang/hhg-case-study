import React from 'react';
import Button from '../Button/Button';
import './Modal.css';

type Props ={
  isVisible: boolean;
  title: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ title, isVisible, children, onOk, onCancel, okText, cancelText }) => {
  return (
    <div className={`modal ${isVisible ? 'show' : ''}`} onClick={() => onCancel && onCancel()}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <Button
            onClick={() => onCancel && onCancel()}
          >
            {cancelText}
          </Button>
          <Button
            type="primary"
            onClick={() => onOk && onOk()}
          >
            {okText}
          </Button>
        </div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  cancelText: 'Cancel',
  okText: 'OK',
}

export default Modal;