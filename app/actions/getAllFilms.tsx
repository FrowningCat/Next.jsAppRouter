export function getAllFilms(): Promise<FilmsResponse> {
    return fetch('https://www.swapi.tech/api/films').then((res) => res.json());
}
