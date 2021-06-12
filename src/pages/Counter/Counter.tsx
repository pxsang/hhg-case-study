import { useState, useCallback } from 'react'
import Button from '../../components/Button/Button';
import './Counter.css';

export default function Counter() {
  let [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const reset = useCallback(() => {
    if (!window.confirm('Are you sure to reset?')) return;

    setCount(0);
  }, []);

  return (
    <div className="counter-page">
        <h1 className="title">Counter</h1>
      <div className="counter-container">
        <span className="counter">{count}</span>
      </div>
      <div className="counter-action-container">
        <Button
          size="large"
          disabled={!count}
          onClick={reset}>
          Reset
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={increment}>
          Increase
        </Button>
      </div>
    </div>
  )
}
