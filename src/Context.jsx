// MyContext.js
import React, { createContext, useContext } from 'react';

// Create a context
const MyContext = createContext();

// Create a custom hook to access the context
export function useExplorerContext() {
  return useContext(MyContext);
}

export default MyContext;
