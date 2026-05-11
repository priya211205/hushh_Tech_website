import services from "../services";
export default async function isLoggedIn(setIsLoggedIn: Function | null) {
  const userDetails = await services.authentication.getUserDetails(null);
  setIsLoggedIn ? setIsLoggedIn(!(userDetails.data == null)) : "";
  return !(userDetails.data == null);
}
