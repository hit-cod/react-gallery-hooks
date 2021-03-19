function fetchPhotos(query, page) {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=20663127-62d3229d929679f587996a550&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => response.json());
}

const API = {
  fetchPhotos,
};

export default API;
