const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            s: searchTerm,
        },
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

const root = document.querySelector("#root");

const onInput = async ({ target }) => {
    const movies = await fetchData(target.value);
    const html = movies
        .map(({ Title, Poster }) => {
            return `
        <img src="${Poster}">
        <h1>${Title}</h1>
        `;
        })
        .join("");
    root.insertAdjacentHTML("beforeend", html)
};

const input = document.querySelector("input");
input.addEventListener("input", debounce(onInput, 500));
