import React, { useState, useEffect } from 'react';

const SchemeContext = React.createContext();

export const SchemeProvider = ({children}) => {
    const temp = "devarshee"
    return <SchemeContext.Provider value={{temp}}>{children}</SchemeContext.Provider>

}

export const useSchemeContext = () => {
    return React.useContext(SchemeContext)
}

export {SchemeContext}
