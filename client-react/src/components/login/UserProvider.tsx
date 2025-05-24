import React, { useReducer, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 
import { UserContext, UserReducer, initialUserState, user } from "../login/UserReducer";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(UserReducer, initialUserState);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedUser: user = jwtDecode(token);
        console.log("decoded", decodedUser);
        
        dispatch({ type: "ADD", data: decodedUser });
      } catch (err) {
        console.error("Invalid token", err);
        // אולי לנקות את הטוקן אם תקול
        sessionStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
