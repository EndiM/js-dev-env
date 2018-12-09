import axios from "axios";
import getBaseUrl from "./baseUrl";

const baseUrl = getBaseUrl();

export function getUsers() {
  return get("users");
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return axios.get(baseUrl + url)
    .then(onSuccess)
    .catch(onError)
}
function del(url) {
  axios.delete(baseUrl + url)
    .then(onSuccess)
    .catch(onError)
}

function onSuccess(response) {
  return response.data;
}

function onError(error) {
  console.log(error); // eslint-disable-line
}
