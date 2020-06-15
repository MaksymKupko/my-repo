const onMovieSelect = async ({imdbID}) => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            i: imdbID,
        },
    });
    document.querySelector("#summary").innerHTML = movieTemplate(response.data);
};

createAutoComplete({
    root: document.querySelector(".autocomplete"),
    renderOption(movie) {
        const { Title, Poster, Year } = movie;
        const imgSRC = Poster === "N/A" ? "" : Poster;
        return `
        <img src="${imgSRC}">
        ${Title} (${Year})
        `;
    },
    onOptionSelect(movie) {
        onMovieSelect(movie)
    },
    inputValue(movie) {
        return movie.Title
    },
    async fetchData(searchTerm){
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
    
})


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
