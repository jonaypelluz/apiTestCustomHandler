export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(sessionStorage.getItem("user"));

  return user && user.access_token ? { Authorization: "Bearer " + user.access_token } : {};
}
