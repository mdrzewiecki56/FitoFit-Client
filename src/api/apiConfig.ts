import axios from "axios";

const setupApi = () => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    const port = process.env.PORT ? process.env.PORT : 4000;
    switch (process.env.NODE_ENV) {
        case "development":
            axios.defaults.baseURL = `http://localhost:${port}`;
            break;
        default:
            axios.defaults.baseURL = `http://localhost:${port}`;
    };
};

export default setupApi;