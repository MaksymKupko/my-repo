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

const root = document.querySelector(".autocomplete");
root.innerHTML = `
    <label><b>Search For A Movie</b></label>
    <input class="input">
    <div class="dropdown">
    <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
    </div>
    </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

const onInput = async ({ target }) => {
    const movies = await fetchData(target.value);

    if (!movies.length) {
        dropdown.classList.remove("is-active");
        return;
    }

    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");

    const moviesArr = movies.map((movie) => {
        const { Title, Poster } = movie;
        const option = document.createElement("a");
        option.classList.add("dropdown-item");
        option.addEventListener("click", () => {
            dropdown.classList.remove("is-active");
            input.value = Title;
        });

        const imgSRC = Poster === "N/A" ? "" : Poster;
        option.innerHTML = `
                    <img src="${imgSRC}">
                    ${Title}
        `;

        return option;
    });

    resultsWrapper.append(...moviesArr);
};

input.addEventListener("input", debounce(onInput, 500));

document.addEventListener("click", ({ target }) => {
    if (!root.contains(target)) {
        dropdown.classList.remove("is-active");
    }
});
