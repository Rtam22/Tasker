import React from "react";
import "./App.css";
import NavigationBar from "./components/navigation/navigationBar";
import { Outlet } from "react-router-dom";
import { TaskProvider } from "./context/taskContext";
import { BinProvider } from "./context/binContext";
import { NotificationProvider } from "./context/notificationContext";
import MobileNavigation from "./components/navigation/mobileNavigation";
function App() {
  return (
    <React.StrictMode>
      <BinProvider>
        <TaskProvider>
          <NotificationProvider>
            <div className="App">
              <div className="desktopNavigation">
                <NavigationBar />
              </div>

              <div className="content">
                <Outlet />
              </div>
            </div>
          </NotificationProvider>
        </TaskProvider>
      </BinProvider>
    </React.StrictMode>
  );
}

export default App;
