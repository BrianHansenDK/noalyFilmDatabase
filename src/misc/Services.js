export const mainUrl = 'https://api.themoviedb.org/3/';
export const apiKey = 'api_key=d666b35262d11f32e0795ef9aeebf982';
export const lang = 'language=da-DK';

export const getApi = (url) => {
    const response = fetch(url).then((r) => r.json());
    return response;
};

export const getMovie = (id) => {
    const response = getApi(`${mainUrl}movie/${id}?${apiKey}&${lang}`);
    return response;
};

export const getMovieLink = (id) => {
    return `${mainUrl}movie/${id}?${apiKey}&${lang}`;
};

export const getSimilarLink = (id) => {
    return `${mainUrl}movie/${id}/similar?${apiKey}&${lang}&page=1`;
};

export const getImagesLink = (id) => {
    return `${mainUrl}movie/${id}/images?${apiKey}`;
};

export const getCastLink = (id) => {
    return getApi(`${mainUrl}movie/${id}/credits?${apiKey}&${lang}`);
};

export const getMovieVideoLink = (id) => {
    return getApi(`${mainUrl}movie/${id}/videos?${apiKey}&language=en-US`);
};

export const getSimilar = (id) => {
    const response = getApi(`${mainUrl}movie/${id}/similar?${apiKey}&${lang}&page=1`);
    return response;
};


export const getMovieVideo = (id) => {
    const response = getApi(`${mainUrl}movie/${id}/videos?${apiKey}&language=en-US`);
    return response;
};

export const searchMovie = (query) => {
    const response = getApi(`${mainUrl}search/movie?${apiKey}&${lang}&query=${query}&page=3&include_adult=false`);
    return response;
};

export const getCast = (id) => {
    const response = getApi(`${mainUrl}movie/${id}/credits?${apiKey}&${lang}`);
    return response;
};

export const getImages = (id) => {
    const response = getApi(`${mainUrl}movie/${id}/images?${apiKey}`);
    return response;
};

export const getPerson = (id) => {
    const response = getApi(`${mainUrl}person/${id}?${apiKey}&${lang}`);
    return response;
};



export const getPopularMoviesUrl = `${mainUrl}movie/popular?${apiKey}&${lang}&page=1`;
export const getUpcomingMoviesUrl = `${mainUrl}movie/upcoming?${apiKey}&${lang}&page=1`;
export const getFamilyMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=10751&${lang}&page=1`;
export const getDocuMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=99&${lang}&page=1`;
export const getCrimeMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=80&${lang}&page=1`;
export const getActionMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=28&${lang}&page=1`;
export const getAdventureMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=12&${lang}&page=1`;
export const getRomanceMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=10749&${lang}&page=1`;
export const getAnimatedMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=16&${lang}&page=1`;
export const getComedyMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=35&${lang}&page=1`;
export const getDramaMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=18&${lang}&page=1`;
export const getFantasyMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=14&${lang}&page=1`;
export const getHistoryMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=36&${lang}&page=1`;
export const getHorrorMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=27&${lang}&page=1`;
export const getMusicMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=10402&${lang}&page=1`;
export const getMysteryMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=9648&${lang}&page=1`;
export const getScienceMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=878&${lang}&page=1`;
export const getThrillerMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=53&${lang}&page=1`;
export const getWesternMoviesUrl = `${mainUrl}discover/movie?${apiKey}&with_genres=37&${lang}&page=1`;


export const getPopularTvUrl = `${mainUrl}tv/popular?${apiKey}&${lang}&page=1`;
