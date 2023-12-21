import { createContext } from "react";

export const authContext = createContext(null);
const AuthProvider = ({children}) => {
    const useInfo = {
        name: 'Mursalin Mir'
    }
    return (
        <authContext.Provider value={useInfo}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;