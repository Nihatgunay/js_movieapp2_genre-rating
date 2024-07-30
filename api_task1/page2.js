document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const showId = urlParams.get('id');

    const url = `https://api.tvmaze.com/shows/${showId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const maindiv = document.getElementById("maindiv2");
            const showDiv = document.createElement("div");
            showDiv.classList.add("d-flex");

            showDiv.innerHTML = `
            <div style="margin-left: 50px; margin-top: 40px;" class="div1">
                <img style="width: 1000px;" src="${data.image.original}" alt="${data.name}" class="img-fluid">
            </div>
            <div style="margin-left: 50px; margin-top: 50px;" class="div2 card-body">
                <h5 style="font-size: 50px;" class="card-title">${data.name}</h5>
                <p class="card-text">${data.summary}</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">IMDB Point: ${data.rating.average}</li>
                    <li class="list-group-item">Language: ${data.language}</li>
                    <li class="list-group-item">Genre: ${data.genres}</li>
                    <li class="list-group-item">Premiered: ${data.premiered}</li>
                    <li class="list-group-item">Ended: ${data.ended}</li>
                </ul>
                <div class="card-body">
                    <a href="${data.officialSite}" class="btn btn-success">Go to website</a>
                    <a href="./page.html" class="btn btn-primary ms-2">Go Back</a>
                </div>    
            </div>`;
            
        maindiv.append(showDiv);
        })
});


