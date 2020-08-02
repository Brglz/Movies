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

async function register(username, password) {
    return (await fetch(host(endpoints.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json()
}

async function login(username, password) {
    const result = (await fetch(host(endpoints.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json()
    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.ObjectId);

    return result;
}

function logout() {
    const token = localStorage.getItem('userToken');

    fetch(host(endpoints.LOGOUT), {
        headers: {
            'user-token': token
        }
    });
}

// get all Movies

async function getMovies() {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
}
// get movie by ID

async function getMovieById(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();

}

// create movie

async function createMovie(movie) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
}

// edit movie

async function updateMovie(id, updatedProp) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID) + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProp)
    })).json();
}

// delete movie

async function deleteMovie(id) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIE_BY_ID) + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
}

// get movies by userID

async function getMoviesByOwner(ownerId) {
    const token = localStorage.getItem('userToken');

    return (await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'user-token': token
        }
    })).json();
}

// but ticket

async function buyTickets(movie) {
    const newTicket = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, { tickets: newTicket });

}