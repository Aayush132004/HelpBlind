import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [highContrast, setHighContrast] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        language,
        setLanguage,
        highContrast,
        setHighContrast,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};


const useGlobal = () => useContext(GlobalContext);
export default useGlobal;
