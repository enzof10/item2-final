export function Main() {
    let element = document.getElementById('root');
    console.log('element: ', element);
    window.document.title = 'Menú principal'

    let html = `
        <section class="main-menu">
            <div class="movies">
                <p>PELICULAS</p>
                <img src="https://image.tmdb.org/t/p/w500//moDLTCdLx38kMhN53KOTw0LdWMh.jpg" alt="Movies">
                
            </div>
        </section>
    `
    element.innerHTML = html

    const movies = element.querySelector('.movies')
    
    movies.onclick = function () {
        window.location.href = "http://127.0.0.1:5500/index.html#/peliculas?page=1"
    }


    return element
}