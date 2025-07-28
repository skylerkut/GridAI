import React, { createContext, useEffect, useState } from "react";
import fetchIcons from "./Icons/fetchIcons";

export const AppContext = createContext({
    currentFile: null,
    toggleCurrentFile: () => {},
    graphSelectOpen: null,
    toggleGraphSelect: () => {},
    iconArray: null, 
    toggleIconArray: () => {},
  });

// Provider component
export const AppProvider = ({ children }) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [graphSelectOpen, setGraphSelectOpen] = useState(true);
  const [iconArray, setIconArray] = useState(null);

  const toggleCurrentFile = (newFile) => {setCurrentFile(newFile);}
  const toggleGraphSelect = () => {setGraphSelectOpen(!graphSelectOpen);}
  const toggleIconArray = (newIcons) => {setIconArray(newIcons);}

  const loadIcons = async () => {
    const iconArr = await fetchIcons();
    toggleIconArray(iconArr);
    console.log("Global Icons", iconArr);
  };

  // Fetch icons once when the app starts
  useEffect(() => {
    loadIcons();
  }, []); 


  return (
    <AppContext.Provider value={{ currentFile, toggleCurrentFile, graphSelectOpen, toggleGraphSelect, iconArray, toggleIconArray }}>
      {children}
    </AppContext.Provider>
  );
};

