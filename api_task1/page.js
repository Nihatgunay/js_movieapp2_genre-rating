let cardsContainer = document.getElementById("cards");
const url = "https://api.tvmaze.com/shows";
let showsData = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(show => {
            const card = document.createElement("div");
            card.className = 'card';
            card.style.width = '290px';
            card.style.marginTop = '20px';
            
            card.innerHTML = `
                <img src="${show.image.medium}" class="card-img-top" alt="${show.name}">
                <div class="card-body">
                    <h5 class="card-title">${show.name}</h5>
                    <p class="card-text">Genre: ${show.genres}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Premiere: ${show.premiered}</li>
                    <li class="list-group-item">Rating: ${show.rating.average}</li>
                    <li class="list-group-item">Status: ${show.status}</li>
                </ul>
                <div class="card-body">
                    <a href="${show.officialSite}" class="btn btn-primary" >go to website</a>
                    <a href="./page2.html?id=${show.id}" class="btn btn-success" style="margin-left: 10px;">go to detail</a>
                </div>`;
            
            cardsContainer.append(card);
        });
    })
    


fetch(url)
    .then(response => response.json())
    .then(data => {
        showsData = data;
        displayShows(showsData);
    });

let searchInput = document.getElementById("search");
let searchForm = document.getElementById("searchform");

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        const filteredShows = showsData.filter(show => show.name.toLowerCase().includes(searchTerm));
        displayShows(filteredShows);
    } else {
        displayShows(showsData); 
    }
});

function displayShows(shows) {
    cardsContainer.innerHTML = "";
    shows.forEach(show => {
        const card = document.createElement("div");
        card.className = 'card';
        card.style.width = '290px';
        card.style.marginTop = '20px';
        
        card.innerHTML = `
            <img src="${show.image.medium}" class="card-img-top" alt="${show.name}">
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">Genre: ${show.genres}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Premiere: ${show.premiered}</li>
                <li class="list-group-item">Rating: ${show.rating.average}</li>
                <li class="list-group-item">Status: ${show.status}</li>
            </ul>
            <div class="card-body">
                <a href="${show.officialSite}" class="btn btn-primary">Go to website</a>
                <a href="./page2.html?id=${show.id}" class="btn btn-success" style="margin-left: 10px;">Go to detail</a>
            </div>`;
        
        cardsContainer.append(card);
    });
}


let selectGenre = document.getElementById("genreselect");
let moviesArray = [];
let allgenresArray = [];

fetch(url)
    .then(response => response.json())
    .then(data => {
        moviesArray = data;
        moviesArray.forEach(movies => {
            movies.genres.forEach(genre => {
                allgenresArray.push(genre)
            })
        })

        var uniquegenres = allgenresArray.filter((value, index, array) => array.indexOf(value) === index);
        CreateOption(uniquegenres)

        displayShows(moviesArray)
    })

selectGenre.addEventListener("change", function() {
    let value = selectGenre.value;
    if (selectGenre.value != "") {
        let filteredgenre = moviesArray.filter(movie => movie.genres.includes(value))
        displayShows(filteredgenre);
    }
    else{
        displayShows(showsData);
    }
})

function CreateOption(options) {
    options.forEach(uniquegenre => {
        let option = document.createElement("option");
        option.value = uniquegenre;
        option.innerText = uniquegenre;
        selectGenre.appendChild(option)
    })
}

// let ratingSelect = document.getElementById("imdbrating");
// let ratingArray = [];

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         moviesArray = data;
//         moviesArray.rating.average.forEach(ratings => {
//             ratings.forEach(rating => {
//                 ratingArray.push(rating)
//             })
//         })
//     })

// ratingSelect.addEventListener("change", function() {
//     let value2 = ratingSelect.value;
//     if (ratingSelect.value2 == "5to6rating") {
//         let ratingfrom5to6 = moviesArray.filter(movie => movie.rating.average > 5 && movie.rating.average < 6)
//         displayShows(ratingfrom5to6);
//     }
//     else{
//         displayShows(showsData);
//     }
// })



let ratingSelect = document.getElementById("imdbrating");
let filteredShows = [];

ratingSelect.addEventListener("change", function() {
    let value = ratingSelect.value;

    switch (value) {
        case "5to6rating":
            filteredShows = showsData.filter(show => show.rating.average >= 5 && show.rating.average < 6);
            break;
        case "6to7rating":
            filteredShows = showsData.filter(show => show.rating.average >= 6 && show.rating.average < 7);
            break;
        case "7to8rating":
            filteredShows = showsData.filter(show => show.rating.average >= 7 && show.rating.average < 8);
            break;
        case "8to9rating":
            filteredShows = showsData.filter(show => show.rating.average >= 8 && show.rating.average < 9);
            break;
        case "9to10rating":
            filteredShows = showsData.filter(show => show.rating.average >= 9 && show.rating.average <= 10);
            break;
        default:
            filteredShows = showsData;
    }

    displayShows(filteredShows);
});
