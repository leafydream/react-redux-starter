
export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const incrementIfOdd = () => {
    return (dispatch, getState) => {
        const { counter } = getState();
        if( counter % 2 === 0 ) {
            return;
        }
        dispatch(increment());
    }
}

export const incrementAsync = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment());
        }, 1000);
    }
}