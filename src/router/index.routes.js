import { Movies } from "../views/Movies.js"

const root = document.getElementById('root')

const router = (route) => {
    root.innerHTML = ""
    const url = new URLSearchParams(window.location.search)
    const page = url.get('page') ? url.get('page') : 1 
    root.appendChild(Movies(page))
}

export {router};