const baseurl = process.env.REACT_APP_SERVICE_URL;

async function get(endpoint) {
  const user = JSON.parse(window.localStorage.getItem("user"));

  const url = `${baseurl}/${endpoint}`;

  const options = {
    headers: {}
  };

  if (user) {
    options.headers["Authorization"] = `Bearer ${user.token}`;
  }

  /* todo framkvæma get */

  const response = await fetch(url, options);

  const data = await response.json();

  return data;
}

async function update(name) {
  const user = JSON.parse(window.localStorage.getItem("user"));

  const url = `${baseurl}/users/me`;
  
  const options = {
    headers: {},
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({name: name})
  };

  if (user) {
    options.headers["Authorization"] = `Bearer ${user.token}`;
  }
  /* todo framkvæma get */

  let response;
  try {
    response = await fetch(url, options);

    const data = await response.json();

    return data;
  } catch (e) {
    console.info(e);
  }
}

/* todo aðrar aðgerðir */

async function login(username, password) {
  const url = `${baseurl}/login`;

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
}
async function register(username, password, name) {
  const url = `${baseurl}/register`;

  const user = {
    username,
    password,
    name
  };

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

export default {
  get,
  login,
  register,
  update
};
