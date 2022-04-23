/* Get Celebrities */
function celebrities()
{
    // Actors array
    const actors = [
        "https://swapi.dev/api/people/1/", 
        "https://swapi.dev/api/people/7/",
        "https://swapi.dev/api/people/4/", 
    ]
    var x = 1;
    for (let i = 0; i < actors.length; i++) {
        x++;
        // Select Celebrities Div
        const celebDiv = document.getElementById("celebrities");
        // Create Div to Display Actor Image Using DOM
        const actorsImgDiv = document.createElement("div");
        actorsImgDiv.className = 'col-lg-2 col-md-2 col-sm-4';
        actorsImgDiv.id = 'actors-img'+i;
        celebDiv.appendChild(actorsImgDiv);
        // Create Div to Display Actors Information Using DOM
        const actorsInfo = document.createElement("div");
        actorsInfo.className = 'col-lg-2 col-md-2 col-sm-8';
        actorsInfo.id = 'actors-info'+i;
        celebDiv.appendChild(actorsInfo);
        // Create Div to Display Actor Movies Using DOM
        const actorsMovie = document.createElement("div");
        actorsMovie.className = 'col-lg-4 col-md-4 col-sm-12 movie-link';
        actorsMovie.id = 'actors-movie'+i;
        celebDiv.appendChild(actorsMovie);
        // Create Div to Display Actor Movie Details Using DOM
        const actorsMovieDetails = document.createElement("div");
        actorsMovieDetails.className = 'col-lg-4 col-md-4 col-sm-12 align-top';
        actorsMovieDetails.id = 'actors-movie-detail'+i;
        celebDiv.appendChild(actorsMovieDetails);
        // Call JS Select Data Using JS Fetch API
        getData(actors[i], i);
        // Remove HR Tag from Last Element
        if(x <= actors.length){
            const hr = document.createElement("hr");
            hr.className = 'my-3 px-2';
            celebDiv.appendChild(hr);
        }
    } 
}

/* Get Data Using JS Fetch API */
async function getData(url, counter) {
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // Call Create HTML Elements and Display Data
            displayData(data, counter)
        })
        .catch((error) => console.error("ERROR:", error));
}

/* Create HTML Elements and Display Data */
function displayData(data, counter) {
    // Select Actor Image Div
    const actorsImgDiv = document.getElementById("actors-img"+counter);
    // Actor Image
    const actorImg = document.createElement("img");
    actorImg.src = 'images/actors.jpg';
    actorImg.width = '150';
    actorImg.height = '250';
    actorImg.className = 'img img-thumbnail rounded';
    actorsImgDiv.appendChild(actorImg);
    // Select Actor Info Div
    const actorsInfo = document.getElementById("actors-info"+counter);
    // Actor Name
    const actorName = document.createElement("h5");
    actorName.innerHTML = data.name;
    actorName.className = 'mb-0 font-title-custom';
    actorsInfo.appendChild(actorName);
    // Display Profession
    const profession = document.createElement("span");
    profession.innerHTML = 'Actor';
    profession.className = 'text-muted text-small font-small';
    actorsInfo.appendChild(profession);
    // Actor Birth Year
    const actorBirthYear = document.createElement("span");
    actorBirthYear.className = 'd-block font-custom mt-2';
    actorBirthYear.innerHTML = 'Birth Year: '+data.birth_year;
    actorsInfo.appendChild(actorBirthYear);
    // Actor Height
    const actorHeight = document.createElement("span");
    actorHeight.className = 'd-block font-custom';
    actorHeight.innerHTML = 'Height: '+data.height;
    actorsInfo.appendChild(actorHeight);
    // Skin Color
    const actorSkin = document.createElement("span");
    actorSkin.className = 'd-block font-custom';
    actorSkin.innerHTML = 'Skin: '+data.skin_color;
    actorsInfo.appendChild(actorSkin);
    // Eye Color
    const actorEye = document.createElement("span");
    actorEye.className = 'd-block font-custom';
    actorEye.innerHTML = 'Eye: '+data.eye_color;
    actorsInfo.appendChild(actorEye);
    // Hair Color
    const actorHair = document.createElement("span");
    actorHair.className = 'd-block font-custom';
    actorHair.innerHTML = 'Hair: '+data.hair_color;
    actorsInfo.appendChild(actorHair);
    // Select Movie Div to Display Movies
    const movies = document.getElementById("actors-movie"+counter);
    let moviesList = data.films;
    console.log(moviesList);
    // Create Div
    const mainDivTag = document.createElement("div");
    mainDivTag.className = 'row'
    movies.appendChild(mainDivTag);
    // Loop Movies
    for (var i=0; i < moviesList.length; i++) {
        // Create Div to Display Movies
        const movieDivTag = document.createElement("div");
        movieDivTag.className = 'col-lg-3 col-md-3 col-sm-6'
        movieDivTag.id = 'movies-list-'+i+'-'+counter;
        mainDivTag.appendChild(movieDivTag);
        // Movie Poster
        const moviePoster = document.createElement("img");
        moviePoster.src = 'images/film.jpg';
        moviePoster.width = '110';
        moviePoster.height = '200';
        moviePoster.className = 'img img-thumbnail rounded';
        movieDivTag.appendChild(moviePoster);
        // Create Break Tag
        const breakTag = document.createElement("br");
        movieDivTag.appendChild(breakTag);
        // Call Function to Select Movie Name by Movie Link
        getMovieName(moviesList[i], 'movies-list-'+i+'-'+counter,counter);

    }
}

/* Get Movie Name by Movie Link */
function getMovieName(url, id, counter){
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // Call Function to Display Movie Name
            setMovieName(data, id, counter);
        })
        .catch((error) => console.error("ERROR:", error));      
}

/* Set Movie Name  */
function setMovieName(data, id, counter) {
    // Select Movie Div
    const movieDiv = document.getElementById(id);
    // Movie Title
    const moviesLink = document.createElement("span");
    moviesLink.className = 'movie-link';
    moviesLink.innerHTML = ellipsify(data.title);
    movieDiv.appendChild(moviesLink);
    // More Button
    const visitLink = document.createElement("button");
    visitLink.href = '#';
    visitLink.addEventListener("click", function(){ movieDetails(data.url, counter); });
    visitLink.className = 'btn btn-outline-primary btn-sm d-block btn-rounded';
    visitLink.innerHTML = 'More...';
    movieDiv.appendChild(visitLink);
}

/* Display Part of Text */
function ellipsify (str) {
    if (str.length > 10) {
        return (str.substring(0, 15) + "...");
    }
    else {
        return str;
    }
}

/* Get Movie Details */
function movieDetails(url, counter){
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {
            // Call Display Movie Details
            displayMovieDetails(data, counter);
        })
        .catch((error) => console.error("ERROR:", error));
}

/* Display Movie Details */
function displayMovieDetails(data, counter) {
    // Select Movie Details Div
    const movieDetails = document.getElementById('actors-movie-detail'+counter);
    movieDetails.style.borderLeft = '1px solid #bbb';
    // Empty Div Content
    movieDetails.innerHTML = '';
    // Greate Div
    const movieDetailContent = document.createElement("div");
    movieDetailContent.className = 'row';
    movieDetails.appendChild(movieDetailContent)
    // Create Div and Display Movie Poster
    const moviePosterDetailsDiv = document.createElement("div");
    moviePosterDetailsDiv.className = 'col-lg-4 col-md-4 col-sm-12';
    movieDetailContent.appendChild(moviePosterDetailsDiv)
    // Movie Poster
    const moviePosterDetails = document.createElement("img");
    moviePosterDetails.src = 'images/film.jpg';
    moviePosterDetails.width = '100';
    moviePosterDetails.height = '140';
    moviePosterDetails.className = 'rounded';
    moviePosterDetailsDiv.appendChild(moviePosterDetails)
    // Create Div to Display Movie Title
    const movieTitleDiv = document.createElement("div");
    movieTitleDiv.className = 'col-lg-8 col-md-8 col-sm-12';
    movieDetailContent.appendChild(movieTitleDiv)
    // Movie Title
    const movieTitle = document.createElement("span");
    movieTitle.className = 'movie-link';
    movieTitle.innerHTML = data.title;
    movieTitleDiv.appendChild(movieTitle);
    // Create Break Tag 
    const breakTagTitle = document.createElement("br");
    // Apply Break Tag
    movieTitle.appendChild(breakTagTitle);
    // Directed By
    const movieDirectedBy = document.createElement("span");
    movieDirectedBy.className = 'font-small';
    movieDirectedBy.innerHTML = 'Directed By: '+data.director;
    movieTitleDiv.appendChild(movieDirectedBy);
    // Create Break Tag 
    const breakTagDirectedBy = document.createElement("br");
    // Apply Break Tag
    movieDirectedBy.appendChild(breakTagDirectedBy);
    // Produced By
    const movieProducedBy = document.createElement("span");
    movieProducedBy.className = 'font-small';
    movieProducedBy.innerHTML = 'Produced By: '+data.producer;
    movieTitleDiv.appendChild(movieProducedBy);
    // Create Break Tag 
    const breakTagProducedBy = document.createElement("br");
    // Apply Break Tag
    movieProducedBy.appendChild(breakTagProducedBy);
    // Release Date
    const movieReleaseDate = document.createElement("span");
    movieReleaseDate.className = 'font-small';
    movieReleaseDate.innerHTML = 'Produced By: '+data.release_date;
    movieTitleDiv.appendChild(movieReleaseDate);
    // Opening Crawl
    const description = document.createElement("span");
    description.className = 'font-small text-justify';
    description.innerHTML = data.opening_crawl;
    movieDetailContent.appendChild(description);
}