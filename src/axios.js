import axios from "axios";

const instance =axios.create({
    baseURL: '...' // the card function
});

export default instance;