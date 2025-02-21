import "./App.css";
import { useEffect, useState } from "react";
import SmellsPage from "./ui/web/pages/SmellsPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    const handleThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail);
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange as EventListener);
    };
  }, []);

  return (
      <div
          style={{
            backgroundColor: isDarkMode ? "#24292e" : "#ffffff",
            minHeight: "100vh",
          }}
      >
        <SmellsPage />
      </div>
  );
}

export default App;
