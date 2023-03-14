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
    return element
}