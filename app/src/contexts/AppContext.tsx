import { createContext, useState } from "react";
import { IPath } from "../types";

type AppContextType = {
    boardFunctions?: {
        setPaths: (paths: IPath[]) => void;
        getImage: () => Promise<any>;
    }
    setContextValue?: (value: AppContextType) => void;
}

export const AppContext = createContext<AppContextType>({});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [contextValue, setContextValue] = useState<AppContextType>({} as AppContextType);
    return <AppContext.Provider value={{ ...contextValue, setContextValue }}>{children}</AppContext.Provider>;
};

export default AppProvider;