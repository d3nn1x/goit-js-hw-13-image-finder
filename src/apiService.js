const ref = {
  API_KEY: '18956456-bd9c7bc8d47963449f9d8046d',
  URL: `https://pixabay.com/api/`,

  page: 0,
  search: '',

  fetchApi(name) {
    return fetch(
      `${ref.URL}/?image_type=photo&orientation=horizontal&q=${name}&page=${ref.page}&per_page=12&key=${ref.API_KEY}`,
    ).then(res => res.json());
  },
};

export default ref;
