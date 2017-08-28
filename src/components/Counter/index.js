import React from 'react';
import { Button } from 'antd';
import styles from './style.scss';


const Counter = props => {
    const { counter, increment, decrement, incrementIfOdd, incrementAsync } = props;
    return (
        <div id={styles.counter}>
            <span> counter: { counter } </span>
            {' '}
            <button type="primary" onClick={increment}>increment</button>
            {' '}
            <button type="primary" onClick={decrement}>decrement</button>
            {' '}
            <button type="primary" onClick={incrementIfOdd}>incrementIfOdd</button>
            {' '}
            <button type="primary" onClick={incrementAsync}>incrementAsync</button>
        </div>
    )
};

export default Counter;