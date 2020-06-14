const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            s: searchTerm,
        },
    });
    console.log(response);
};
const input = document.querySelector("input");

let timeoutID = null;
input.addEventListener("input", ({ target }) => {
    if (timeoutID) {
        clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => fetchData(target.value), 500);
});
