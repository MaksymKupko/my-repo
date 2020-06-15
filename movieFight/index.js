const autompleteConfig = {
    renderOption(movie) {
        const { Title, Poster, Year } = movie;
        const imgSRC = Poster === "N/A" ? "" : Poster;
        return `
        <img src="${imgSRC}">
        ${Title} (${Year})
        `;
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
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
    },
};

createAutoComplete({
    ...autompleteConfig,
    root: document.querySelector("#left-automplete"),
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#left-summary"));
    },
});
createAutoComplete({
    ...autompleteConfig,
    root: document.querySelector("#right-automplete"),
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#right-summary"));
    },
});

const onMovieSelect = async ({ imdbID }, summaryElem) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            i: imdbID,
        },
    });
    summaryElem.innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetails) => {
    const { Poster, Title, Genre, Plot, Awards, BoxOffice, Metascore, imdbRating, imdbVotes } = movieDetails;

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
