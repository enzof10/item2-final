const API_KEY = '052ab590ffacf9a4152647f0564e9d04'

export const fetchMovies = async (page, limit = 4) => {
    let pageReal = 0
    for (let index = 0; index < page; index += 5) {
        pageReal++
    }
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-AR&page=${pageReal}&limit=${limit}`
    const data = await fetch(url)
    return data.json()
}
