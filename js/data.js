import { beginRequest, endRequest } from './controllers/notifications.js';

function host(endpoint) {
    return `https://api.backendless.com/902559B1-9C93-CD1C-FFE5-50A7670B6E00/A3CA4E66-F8CB-4043-805C-FD4D35E1777C/${endpoint}`
}

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
}

export async function register(username, password) {
    beginRequest();
    const result = (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json()

    endRequest();

    return result;
}

export async function login(username, password) {
    beginRequest();

    const result = await (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();
    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    endRequest();
    console.log(await result.username);

    return result;
}

export async function logout() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    localStorage.removeItem('userToken')

    const result = await fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    endRequest();

    return result;

}

// get all Movies

export async function getMovies() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}
// get movie by ID

export async function getMovieById(id) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();

    return result;

}

// create movie

export async function createMovie(movie) {
    const token = localStorage.getItem('userToken');
    beginRequest();

    const result = (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    endRequest();

    return result;
}

// edit movie

export async function updateMovie(id, updatedProp) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID) + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProp)
    })).json();

    endRequest();

    return result;
}

// delete movie

async function deleteMovie(id) {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoints.MOVIE_BY_ID) + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}

// get movies by userID

export async function getMoviesByOwner() {
    beginRequest();

    const token = localStorage.getItem('userToken');

    const ownerId = localStorage.getItem('userId')

    const result = (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'user-token': token
        }
    })).json();

    endRequest();

    return result;
}

// but ticket

export async function buyTickets(movie) {
    const newTicket = movie.tickets - 1;
    const movieId = movie.objectId;


    return updateMovie(movieId, { tickets: newTicket });

}