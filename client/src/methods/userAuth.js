import { useContext } from "react";
const useAuth = () => {
  const { user } = useContext(UserContext);
  return user && user.loginIn;
};

export default useAuth;
