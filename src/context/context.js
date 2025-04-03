import { useContext, createContext, useState, useEffect } from "react";

export const Context = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.id = theme || "light";
  }, [theme]);

  return (
    <Context.Provider value={{ theme, setTheme, tasks, setTasks }}>
      {children}
    </Context.Provider>
  );
};

export const UseGlobalContext = () => {
  return useContext(Context);
};
