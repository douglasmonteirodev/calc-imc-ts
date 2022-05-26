import { useState } from "react";
import styles from "./App.module.css";
import GridItem from "./components/GridItem";
import { levels, calculateImc, Level } from "./helpers/imc";
import leftArrowImage from "./assets/leftarrow.png";

const App = () => {
    const [heightField, setHeightField] = useState<number>(0);
    const [weightField, setWeightField] = useState<number>(0);
    const [toShow, setToShow] = useState<Level | null>(null);

    const handleCalculateButton = () => {
        if (heightField && weightField) {
            setToShow(calculateImc(heightField, weightField));
        } else {
            alert("Preencha todos os campos");
        }
    };
    const handleBackButton = () => {
        setToShow(null);
        setHeightField(0);
        setWeightField(0);
    };

    return (
        <div className={styles.main}>
            <header>
                <div className={styles.headerContainer}>
                    <div>
                        <span className={styles.logoImc}>IMC</span>
                        <span className={styles.poweredName}>powered by DMS</span>
                    </div>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.leftSide}>
                    <h1>Calcule o seu IMC.</h1>
                    <p>
                        IMC é a seigla para Índice de Massa Copórea, parâmetro
                        adotado pela Organização Mundial de saúde para calcular o
                        peso ideal de cada pessoa.
                    </p>
                    <input
                        type='number'
                        placeholder='Digite a sua altura. Ex: 1.8 (em metros) '
                        value={heightField > 0 ? heightField : ""}
                        onChange={(e) => setHeightField(Number(e.target.value))}
                        disabled={toShow ? true : false}
                    />
                    <input
                        type='number'
                        placeholder='Digite o seu peso. Ex: 45.4 (em kg) '
                        value={weightField > 0 ? weightField : ""}
                        onChange={(e) => setWeightField(Number(e.target.value))}
                        disabled={toShow ? true : false}
                    />
                    <button
                        onClick={handleCalculateButton}
                        disabled={toShow ? true : false}
                    >
                        Calcular
                    </button>
                </div>

                <div className={styles.rightSide}>
                    {!toShow && (
                        <div className={styles.grid}>
                            {levels.map((item, key) => (
                                <GridItem key={key} item={item} />
                            ))}
                        </div>
                    )}
                    {toShow && (
                        <div className={styles.rightBig}>
                            <div
                                className={styles.rightArrow}
                                onClick={handleBackButton}
                            >
                                <img src={leftArrowImage} alt='arrow' width={25} />
                            </div>
                            <GridItem item={toShow} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
