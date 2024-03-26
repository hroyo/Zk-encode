import { createContext, useContext, useEffect, useState } from "react";
import { initialize } from "zokrates-js";

const ZokratesContext = createContext(undefined);

export default function ZokratesProvider({ children }) {
  const [zk, setZk] = useState();
  
  useEffect(() => {
    initialize().then((zk) => {
      setZk(zk);
    });
  }, []);

  return <ZokratesContext.Provider value={zk}>{children}</ZokratesContext.Provider>;
}

export const useZokrates = () => {
  return useContext(ZokratesContext);
};
