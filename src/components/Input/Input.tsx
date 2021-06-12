import React from 'react';
import './Input.css';

type Props ={
  title: string;
  value: string;
  name: string;
  onChange: (text: string) => void;
  error?: string;
}

const Input: React.FC<Props> = ({ title, value, name, onChange, error }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{title}:</label>
      <div className="input-container">
        <input
          id={name}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {error ? (
          <div className="input-error-container">
            <span className="input-error">{error}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Input;
