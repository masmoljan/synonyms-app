const API_URL = import.meta.env.VITE_SERVER_API_URL;

if(!API_URL) {
  console.error("Server API url is not defined!");
}

export default API_URL