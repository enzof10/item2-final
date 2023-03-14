const API_KEY = '052ab590ffacf9a4152647f0564e9d04'

export const fetchMovies = async (page, limit = 4) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-AR&page=${page}&limit=${limit}`
    
    const data = await fetch(url)
    return data.json()
}
