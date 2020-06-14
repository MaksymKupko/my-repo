const debounce = (func, delay = 1000) => {
    let timeoutID = null;
    return (...args) => {
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => func(...args), delay);
    };
};