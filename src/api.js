import { loginUser } from "./actions/auth";

const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const url = `${baseurl}/${endpoint}`;

  const options = {
    headers: {}
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token.token}`;
  }

  /* todo framkvæma get */

  try {
    const response = await fetch(url, options);

    const data = await response.json();

    if (data.error === "expired token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw data.error;
    }
    return data;
  } catch (error) {
    throw error;
  }
}

async function update(name, pass) {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const url = `${baseurl}/users/me`;

  if (name === "") {
    name = null;
  }

  if (pass === "") {
    pass = null;
  }

  const options = {
    headers: {},
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: name, password: pass })
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token.token}`;
  }
  /* todo framkvæma get */

  let response;

  try {
    response = await fetch(url, options);

    const data = await response.json();

    if (data.error === "expired token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw data.error;
    }
    return data;
  } catch (e) {
    console.info(e);
    throw e;
  }
}

async function post(data, endpoint) {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const url = `${baseurl}${endpoint}`;
  let response;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token.token}`;
  }
  try {
    console.log(url, options);
    response = await fetch(url, options);
    console.log(response);
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}

async function postImage({ image } = {}, endpoint) {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const url = `${baseurl}${endpoint}`;

  console.info(image);
  var form = new FormData();
  form.append("profile", image);

  const options = {
    method: "POST",
    headers: {},
    body: form
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token.token}`;
  }

  let response;
  try {
    response = await fetch(url, options);

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}
export default {
  get,
  post,
  update,
  postImage
};
