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

    dropdown.classList.add("is-active");
    const html = movies
        .map(({ Title, Poster }) => {
            return `
                <a class="dropdown-item">
                    <img src="${Poster}">
                    ${Title}
                </a>
        `;
        })
        .join("");
    resultsWrapper.insertAdjacentHTML("beforeend", html);
};

input.addEventListener("input", debounce(onInput, 500));
