export const API_KEY = '39df0852-d588-4c24-a0a9-3db9f64882d8'
export const BASE_URL = "https://api.thecatapi.com/v1"
export const API_RANDOM = `${BASE_URL}/images/search?limit=12`;
export const API_FAVOURITES = `${BASE_URL}/favourites`;
export const API_FAVOURITES_DELETE = (id) => `${BASE_URL}/favourites/${id}`;
export const API_UPLOAD = `${BASE_URL}/images/upload`

