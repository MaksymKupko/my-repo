const fetchData = async () => {
    const response = await axios.get("http://www.omdbapi.com", {
        params: {
            apikey: "a19cdc15",
            s: "avengers"
        },
    });
    console.log(response);
    
};
fetchData()