import services from "../services";
export default async function getFullName(setFullName: Function) {
  const userDetails = await services.authentication.getUserDetails(null);
  const full_name = userDetails?.data?.user?.user_metadata?.full_name;
  setFullName ? setFullName(full_name) : "";
  return full_name;
}
