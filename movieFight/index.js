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
        onMovieSelect(movie, document.querySelector("#left-summary"), "left");
    },
});
createAutoComplete({
    ...autompleteConfig,
    root: document.querySelector("#right-automplete"),
    onOptionSelect(movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#right-summary"), "right");
    },
});

let leftMovie = null;
let rightMovie = null;

const onMovieSelect = async ({ imdbID }, summaryElem, side) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            i: imdbID,
        },
    });
    summaryElem.innerHTML = movieTemplate(response.data);

    if (side === "left") {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if (leftMovie && rightMovie) {
        runComparison();
    }
};

const runComparison = () => {};

const movieTemplate = (movieDetails) => {
    const { Poster, Title, Genre, Plot, Awards, BoxOffice, Metascore, imdbRating, imdbVotes } = movieDetails;

    const dollars = parseInt(BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
    const metascore = parseInt(Metascore);
    const imdbRatingParsed = parseFloat(imdbRating);
    const imdbVotesParsed = parseInt(imdbVotes.replace(/,/g, ""));
    const awards = Awards.split(" ").reduce((prev, word) => {
        const value = parseInt(word);

        if (isNaN(value)) {
            return prev
        } else {
            return prev + value
        }
    }, 0);

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

        <article data-value=${awards} class="notification is-primary">
            <p class="title">${Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRatingParsed} class="notification is-primary">
            <p class="title">${imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotesParsed} class="notification is-primary">
            <p class="title">${imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
        
    `;
};
