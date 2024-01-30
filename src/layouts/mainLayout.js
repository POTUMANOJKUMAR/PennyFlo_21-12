import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { ThemeProvider, createTheme } from "@mui/material";
import { mainLayoutStyle } from "./styles";
import "./layout.scss";
import Header from "../components/header";
import { useSelector } from "react-redux";

export function MainLayout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
const screensPush=useSelector((state)=>state.hamberger.headerToggle)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [theme, setTheme] = useState({
    palette: {
      primary: {
        main: "#101010",
      },
      secondary: {
        main: "#FBFBFB",
      },
    },
  });

  const muiTheme = createTheme(theme, {
    setTheme,
  });

  const classes = mainLayoutStyle();

  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <div className={`${classes.Root} mb-5`}>
          <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />

          <main id={!screensPush?"main":"pushmain"} className={`${classes.Content}`}>
            <Header onToggle={toggleSidebar} />
            {props.children}
          </main>
        </div>
      </ThemeProvider>
    </>
  );
}

export default MainLayout;
