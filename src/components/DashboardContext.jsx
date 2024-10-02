import { createContext, useContext } from "react";

const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardContext;