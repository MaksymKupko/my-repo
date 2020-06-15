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
        const { Title, Poster, imdbID } = movie;
        const option = document.createElement("a");
        option.classList.add("dropdown-item");
        option.addEventListener("click", () => {
            dropdown.classList.remove("is-active");
            input.value = Title;
            onMovieSelect(imdbID);
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

const onMovieSelect = async (movieID) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            i: movieID,
        },
    });
    document.querySelector("#summary").innerHTML = movieTemplate(response.data);
    console.log(response.data);
    
};

const movieTemplate = (movieDetails) => {
    const { Poster, Title, Genre, Plot, Awards, BoxOffice,Metascore, imdbRating, imdbVotes } = movieDetails;

    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${Title}</h1>
                    <h4>${Genre}</h4>
                    <p>${Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
        
    `;
};
