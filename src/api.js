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


    if(data.error === 'expired token') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
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

    if(data.error === 'expired token') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw data.error;
    }

    return data;

  } catch (e) {
    console.info(e);
    throw e;
  }
}

async function post(data = {}, endpoint) {
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
    response = await fetch(url, options);
    const json = await response.json();

    
    return json;
  } catch (error) {
    console.error(error);
  }
}

async function postImage(data = {}, endpoint) {

  const token = JSON.parse(window.localStorage.getItem("token"));
  const url = `${baseurl}${endpoint}`;

  var form = new FormData();
  form.append("profile", "/home/adalsteinn95/Pictures/Screenshot from 2018-03-10 20-31-29.png");

  let response;
  const options = {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    data: form,
    mimeType: "multipart/form-data",
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token.token}`;
  }
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
/*
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3000/users/me/profile",
  "method": "POST",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMsImlhdCI6MTUyMzcxNjk0NSwiZXhwIjoxNTIzNzI2OTQ1fQ.EyG20jnhcngFwQLAxeV6bzAVEbDkXUxDsi3VxIw4u2A",
    "Cache-Control": "no-cache",
    "Postman-Token": "7acf7734-3053-4262-9842-0992ce14f974"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}*/