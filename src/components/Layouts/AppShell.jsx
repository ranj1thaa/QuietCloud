import React from "react";
import NavBaar from "../Navbar/NavBaar";

const AppShell = ({ children }) => {
  return (
    <div className="qc-app-shell">
      <NavBaar />

      <main className="qc-app-main">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
