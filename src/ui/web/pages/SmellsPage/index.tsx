import { FC, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./styles.module.scss";
import smellsData from "./data";

const SmellsPage: FC = () => {
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});

  const toggleCategory = (index: number) => {
    setOpenCategories((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Categorias de Smells em Testes BDD</h1>
      {smellsData.map((category, index) => (
        <div key={index} className={styles.categorySection}>
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
  );
};

export default SmellsPage;
