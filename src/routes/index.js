import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import routes from "./routes";
import React, { useRef } from "react";
import { toCamelCase } from "../utils";
import Loader from "../components/loader";
import ChatModal from "../screens/chatModal";
import "../index.css";
import { NotificationContainer } from "react-notifications";

const AppRoutes = () => {
  const loaderRef = useRef(null);

  const getReactElement = (route) => {
    let screen = toCamelCase(route);
    return React.createElement(require(`../screens/${screen}`).default);
  };

  const getLayout = (route, screen) => {
    let layout = toCamelCase(route);
    const LayoutComponent = require(`../layouts/${layout}`).default;

    return <LayoutComponent>{getReactElement(screen)}</LayoutComponent>;
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map(
            (
              { layout = "", path, childrens, component = "", init = "" },
              index
            ) => {
              if (childrens) {
                return childrens.map(({ screen, childPath }, i) => {
                  return (
                    <Route
                      key={`${index}_${i}`}
                      path={`${path}${childPath}`}
                      element={getLayout(layout, screen)}
                    />
                  );
                });
              } else {
                return path === "*" ? (
                  <Route
                    key={"page_404"}
                    path={path}
                    element={getReactElement(component)}
                  />
                ) : (
                  <Route
                    key={"init"}
                    path={path}
                    element={<Navigate to={init} />}
                  />
                );
              }
            }
          )}
          <Route
                   path="/chat" element={<ChatModal/>} />
        </Routes>
      </Router>
      <NotificationContainer />
      <Loader ref={loaderRef} />
    </div>
  );
};

export default AppRoutes;
