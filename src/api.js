const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {
  const token = window.localStorage.getItem("token");

  const url = `${baseurl}${endpoint}`;

  const options = {
    headers: {}
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url);

  // kannski ekki hafa thetta svona
  if (response.status >= 400) {
    throw response.status;
  }
  const data = await response.json();
  return data;
}

/* todo aðrar aðgerðir */

export default {
  get
};
