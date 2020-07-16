import axios from "axios";
export const apiBaseUrl = 'https://learn-server-api.herokuapp.com/api/'
//export const apiBaseUrl = process.env.REACT_APP_APIBASE_URL || 'http://localhost:5000/api/'

const call = axios.create({
  headers: {
    accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const callApiAsPromise = (method, url, params, body) => {
  return call({
    method: method,
    url:  url,
    params: params,
    data: body
  });
};
