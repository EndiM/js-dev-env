import { getUsers, deleteUser } from "./api/userApi";
import "mini.css";
import "./index.scss";

export function getTableMarkup(caption) {
  return `<table>
  <caption>${caption}</caption>
  <thead>
    <th>&nbsp;</th>
    <th>Id</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
  </thead>
  <tbody id="users">
  </tbody>
</table>`
}

function render() {
  let tableNode = new DOMParser().parseFromString(getTableMarkup("Pied Piper"), "text/html").body.firstChild;

  global.document.getElementById("mainContent").appendChild(tableNode);

  getUsers()
    .then(result => {
      let usersBody = "";
      result.forEach(user => {
        usersBody += `<tr>
    <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</td>
    <td>${user.id}</td>
    <td>${user.firstName}</td>
    <td>${user.lastName}</td>
    <td>${user.email}</td>
    </tr>`
      });

      global.document.getElementById("users").innerHTML = usersBody;

      const deleteLinks = global.document.getElementsByClassName("deleteUser");

      Array.from(deleteLinks, link => {
        link.onclick = function (event) {
          const element = event.target;
          event.preventDefault();
          deleteUser(element.attributes["data-id"].value);
          const row = element.parentNode.parentNode;
          row.parentNode.removeChild(row);
        }
      })
    })
    .catch(error => console.log(error)); // eslint-disable-line

}
render();

if (module.hot) {
  module.hot.accept("./api/userApi", function () {
    render();
  });
}
