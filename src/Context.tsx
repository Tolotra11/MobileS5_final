import React, { useState } from "react";

type Props = {
    children: React.ReactNode
 }
 
export const Context = React.createContext<any>(undefined);

export const UIProvider: React.FC<Props> = ({ children }) => {
    const [showTabs, setShowTabs] = useState(true);
    let state = {
        showTabs,
        setShowTabs,
    };
    return <Context.Provider value={state}>{children}</Context.Provider>
};
export default Context;