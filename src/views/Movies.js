import { router } from "../router/index.routes.js";
import { fetchMovies } from "../utils/functions.js";

function addPagination(quantity, paginationSize = 5) {
    const url = new URLSearchParams(window.location.search)
    const page = url.get('page') ? Number(url.get('page')) : 1
    function renderPaginationItems() {
        while (navigation.firstChild) {
            navigation.removeChild(navigation.firstChild);
        }

        for (const item of navItemsToShown) {
            const element = document.createElement("a");
            const url = new URLSearchParams(window.location.search)
            const page = url.get('page') ? url.get('page') : 1
            selected = item === Number(page)
            element.classList.add(`page_link`)
            if (selected) {
                element.classList.add("selected");
            }
            element.innerText = item;

            element.addEventListener("click", navItemClick);

            navigation.appendChild(element);
        }
    }
    let navItems = []
    for (let index = 1; index < Array(quantity).length + 1; index++) {
        navItems.push(index)
    }

    let pages = []
    let pagePagination = 0
    for (let index = 0; index < navItems.length + 1; index += paginationSize) {
        pages.push(navItems.slice(index, index + paginationSize))
        if (navItems.slice(index, index + paginationSize).includes(page)) {
            pagePagination = pages.length - 1
        }
    }


    let navItemsToShown = pages[pagePagination];
    let selected;
    const prev = document.querySelector(".previous_link");
    const next = document.querySelector(".next_link");
    const navigation = document.querySelector(".nvaigation_items");
    if (prev) {
        prev.removeEventListener("click", previousClick);
        prev.addEventListener("click", previousClick);
    }
    if (next) {
        next.removeEventListener("click", nextClick);
        next.addEventListener("click", nextClick);
    }

    function previousClick() {
        pagePagination = Math.max(0, pagePagination - 1)
        navItemsToShown = pages[pagePagination]
        renderPaginationItems();
    }

    function nextClick() {
        navItemsToShown = pages[pagePagination + 1]
        pagePagination++
        renderPaginationItems();
    }

    function navItemClick(e) {
        const url = new URL(location.href);
        url.searchParams.set("page", e.target.innerHTML);
        history.pushState(null, '', url);
        router()
    }

    renderPaginationItems();
}

/**
 * Movie data component
 * @returns A div element with the movies
 */
export function Movies(page) {
    let element = document.createElement('div');
    element.classList.add("peliculas")
    let actualPage
    window.document.title = 'Peliculas'


    async function getMovies() {
        try {

            const url = new URLSearchParams(window.location.hash.split('peliculas')[1])
            actualPage = page
            let data = await fetchMovies(actualPage)
            const totalPages = data.total_pages
            addPagination(totalPages)
            let html = ""
            for (let i = 0; i < data.results.length; i++) {
                const movie = data.results[i]
                const date = movie.release_date.split('-')[0]
                html += `
                    <section class="card-section" id="b${i}">
                        <img class="movie-img" src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" alt="${movie.title}">
                        <div class="description-div">
                            <div class="title">
                                <h1>${movie.title}</h1>
                            </div>
                            <h3>Valoración: ${movie.vote_average}</h3>
                        </div>
    
                        <div id="m${movie.id}" class="modal" >
    
                            <div class="modal-content" style="background-image:url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path});background-size:     cover;background-repeat:   no-repeat;background-position: center center;" >
                                <span id="close${movie.id}" class="close">&times;</span>
                                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                                <div class="description-div">
                                    <div class="modal-title">
                                        <h1>${movie.title} (${date})</h1>
                                        <h1>Fecha de lanzamiento: ${movie.release_date}</h1>
                                        <p>${movie.overview}</p>
                                    </div>
                                    <h3>Valoración${movie.vote_average}</h3>
                                </div>
                                </div>
                            </div>
    
                        </div>
                    </section>
                `
            }
            element.innerHTML = html

            for (let i = 0; i < data.results.length; i++) {
                const movie = data.results[i]

                let btn = element.querySelector(`#b${i}`)

                let modal = element.querySelector(`#m${movie.id}`);

                let span = element.querySelector(`#close${movie.id}`);

                btn.onclick = function () {
                    modal.style.display = "block";
                    window.document.title = `Peliculas | ${movie.title}`
                }

                span.onclick = function () {
                    modal.style.display = "none";
                }

                window.addEventListener('click', (e) => {
                    if (e.target == modal) {
                        modal.style.display = "none";
                        window.document.title = 'Peliculas'
                    }
                })
            }
        } catch (error) {
            console.error(`Hubo un error ${error}`)
        }
    }
    getMovies()
    return element
}






