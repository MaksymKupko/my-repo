const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            s: searchTerm,
        },
    });
    console.log(response);
};

const debounce = (func, delay = 1000) => {
    let timeoutID = null;
    return (...args) => {
        console.log(args)
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        timeoutID = setTimeout(() => func(...args), delay);
    };
};

const onInput = ({ target }) => {
    fetchData(target.value);
};

const input = document.querySelector("input");
input.addEventListener("input", debounce(onInput, 500));