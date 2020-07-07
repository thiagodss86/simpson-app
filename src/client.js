import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

export const getAllSimpsons = () => 
    fetch('api/simpsons').then(checkStatus);

export const addNewSimpsonCharacter = simpsonCharacter =>
    fetch('api/simpsons', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(simpsonCharacter)
    })
    .then(checkStatus);

export const updateSimpsonCharacter = (simpsonId, simpsonCharacter) => 
    fetch(`api/simpsons/${simpsonId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(simpsonCharacter)
    })
    .then(checkStatus);

export const deleteSimpsonCharacter = simpsonId =>
    fetch(`api/simpsons/${simpsonId}`, {
        method: 'DELETE'
    })
    .then(checkStatus);