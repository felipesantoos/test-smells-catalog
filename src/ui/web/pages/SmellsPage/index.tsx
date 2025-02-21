import {FC, useEffect, useState} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./styles.module.scss";
import smellsData from "./data";
import {MdDarkMode, MdOutlineDarkMode} from "react-icons/md";

const SmellsPage: FC = () => {
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleCategory = (index: number) => {
    setOpenCategories((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const openCategoryFromSidebar = (index: number) => {
    setOpenCategories((prev) => ({ ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), [index]: true }));
  };

  useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
          setIsDarkMode(savedTheme === "dark");
      }
  }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => {
            const newTheme = !prev;
            localStorage.setItem("theme", newTheme ? "dark" : "light");
            window.dispatchEvent(new CustomEvent("themeChange", { detail: newTheme }));
            return newTheme;
        });
    };


    return (
    <div className={`${styles.pageLayout} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
        <nav className={styles.sidebar}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: "1rem"
                }}
            >
                <h2 className={styles.sidebarTitle}>Navegação</h2>
                <button className={styles.themeButton} onClick={toggleTheme}
                        aria-label={`Ativar ${isDarkMode ? "light mode" : "dark mode"}`}>
                    {isDarkMode ? <MdDarkMode size={28} color="white"/> : <MdOutlineDarkMode size={28} color="black"/>}
                </button>
            </div>
            <ul className={styles.sidebarList}>
                {smellsData.map((category, index) => (
                    <li key={index}>
                        <a
                            href={`#category-${index}`}
                            className={styles.sidebarLink}
                            onClick={() => openCategoryFromSidebar(index)}
                        >
                            {category.category}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
        <div className={styles.content}>
            <h1 className={styles.heading}>Categorias de Smells em Testes BDD</h1>
            {smellsData.map((category, index) => (
          <div key={index} id={`category-${index}`} className={styles.categorySection}>
            <button className={styles.categoryTitle} onClick={() => toggleCategory(index)}>
              {category.category}
              {openCategories[index] ? (
                <ChevronUp className={styles.toggleIcon} size={20} />
              ) : (
                <ChevronDown className={styles.toggleIcon} size={20} />
              )}
            </button>
            <div className={`${styles.categoryContent} ${openCategories[index] ? styles.open : styles.closed}`}>
              {openCategories[index] && (
                <div>
                  {category.items.map((smell, smellIndex) => (
                    <div key={smellIndex} className={styles.smellWrapper}>
                      <h3 className={styles.smellTitle}>{smell.title}</h3>
                      <h4 className={styles.sectionTitle}>Descrição</h4>
                      <p className={styles.smellDescription}>{smell.description}</p>
                      <h4 className={styles.sectionTitle}>Consequências</h4>
                      <ul className={styles.smellConsequences}>
                        {smell.consequences.map((consequence, consequenceIndex) => (
                          <li key={consequenceIndex}>{consequence}</li>
                        ))}
                      </ul>
                      <h4 className={styles.sectionTitle}>Exemplo</h4>
                      <div className={styles.imageContainer}>
                        <img src={smell.image} alt={smell.title} className={styles.image} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmellsPage;
