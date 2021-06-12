import React from 'react';
import './Button.css';

type Props = {
  type?: 'primary' | 'default';
  size?: 'large' | 'small';
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ children, type, size, ...other }) => {
  return (
    <button {...other} className={`btn ${type ? `btn-${type}` : ''} ${size === 'large' ? 'btn-lg' : ''}`}>
      {children}
    </button>
  )
}

export default Button;
