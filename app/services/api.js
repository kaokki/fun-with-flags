const apiUrl = process.env.NEXT_PUBLIC_API_URL

const ApiClient = (baseUrl) => ({
  async get(endpoint) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`);

      if(!response.ok) {
        return [null, `HTTP error! Status: ${response.statusText}`]
      }

      const data = await response.json();
      return [data, null]
    } catch (error) {
      console.log(error)
      return [null, error.message]
    }
  }
})

const api = ApiClient(apiUrl)

const countriesApi = {
  getAll: () => api.get("/all?fields=name,flags,cca3,capital,region,population"),
  getCountry: (id) => api.get(`/alpha/${id}?fields=name,flags,cca3,capital,region,population,languages,currencies,tld,borders`)
}

export { countriesApi };

