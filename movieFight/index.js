const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            s: searchTerm,
        },
    });
    console.log(response);
};

const onInput = ({ target }) => {
    fetchData(target.value);
};

const input = document.querySelector("input");
input.addEventListener("input", debounce(onInput, 500));