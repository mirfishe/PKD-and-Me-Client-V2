let API_URL = "";

switch (window.location.hostname) {
    case "localhost" || "127.0.0.1":
        API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
        break;
    case "pkd-and-me-server":
        API_URL = "https://pkd-and-me-server.herokuapp.com";
        break;
    case "pkd-and-me-client":
        API_URL = "https://pkd-and-me-server.herokuapp.com";
        break;
    case "pkd-and-me":
        API_URL = "https://pkd-and-me-server.herokuapp.com";
        break;
    case "pkd-and-me.herokuapp.com":
        API_URL = "https://pkd-and-me-server.herokuapp.com";
        break;
    default:
        API_URL = `http://localhost:${process.env.REACT_APP_SERVER_PORT}`;
};

export default API_URL;