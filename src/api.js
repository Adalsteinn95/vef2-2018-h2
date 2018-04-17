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
    const data = await response.json();
    console.log(data);
    if (data.error === "expired token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw data.error;
    }

    return data;
  } catch (error) {
    console.log("ping");
    console.error(error);
  }
}
async function patch(data, endpoint) {
  const token = JSON.parse(window.localStorage.getItem("token"));

  const url = `${baseurl}${endpoint}`;
  let response;
  const options = {
    method: "PATCH",
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
    const data = await response.json();
    if (data.error === "expired token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw data.error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function postImage({ image } = {}, endpoint) {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const url = `${baseurl}${endpoint}`;

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

    const data = await response.json();
    if (data.error === "expired token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw data.error;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteRead(id, endpoint) {
  const token = JSON.parse(window.localStorage.getItem("token"));
  const url = `${baseurl}${endpoint}/${id}`;

  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token.token}`;
  }

  let response;
  try {
    response = await fetch(url, options);
    const data = await response.json();
    if (data.error === "expired token") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw data.error;
    }
    return response;
  } catch (error) {
    console.error(error);
  }
}

export default {
  get,
  post,
  update,
  postImage,
  deleteRead,
  patch,
  postImage
};
