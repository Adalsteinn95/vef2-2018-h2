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

  /* todo framkvæma get */
}

/* todo aðrar aðgerðir */

async function login(username, password) {
  /* dummy account */
  const user = {
    name: "Admin",
    password: "admin",
    token: "awesometoken",
  };

  if (username === "error") {
    return {
      error: "Big error"
    };
  }

  if (username === "Admin" && password === "admin") {
    return {
      loggedIn: true,
      user
    };
  }

  if (username !== "Admin") {
    return {
      loggedIn: false,
      error: "Wrong username"
    };
  }

  return {
    loggedIn: false,
    error: "Wrong password"
  };
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

    if (json.errors) {
      console.info(json.errors);
    }
  } catch (error) {
    console.error(error);
  }
}

export default {
  get,
  login,
  register
};
