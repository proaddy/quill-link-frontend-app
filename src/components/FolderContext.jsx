import { createContext, useContext } from "react";

const FolderContext = createContext();
export const useFolderContext = () => useContext(FolderContext);

export default FolderContext;