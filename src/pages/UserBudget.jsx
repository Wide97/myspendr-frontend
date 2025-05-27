import React, { useState, useEffect } from "react";
import { setBudget, getBudget, getTuttiIBudget } from "../utils/budget";
import Button from "../components/Button";
import InfoCard from "../components/InfoCard";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import BudgetBarChart from "../components/BudgetBarChart";
import "./UserBudget.scss";
import UserNavbar from "./UserNavbar";

const categorie = [
    "CIBO", "TRASPORTI", "AFFITTO", "SHOPPING", "SIGARETTE", "STIPENDIO",
    "TORNEI", "SERATE", "DIVERTIMENTO", "BEAUTY", "SALUTE", "INVESTIMENTI", "ALTRO"
];

const mesi = [
    "Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"
];

const UserBudget = () => {
    const [categoria, setCategoria] = useState("SHOPPING");
    const [limite, setLimite] = useState("");
    const [mese, setMese] = useState(new Date().getMonth() + 1);
    const [anno, setAnno] = useState(new Date().getFullYear());
    const [budgetInfo, setBudgetInfo] = useState(null);
    const [budgetTotale, setBudgetTotale] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const fetchBudget = async () => {
        try {
            setLoading(true);
            const res = await getBudget(categoria, mese, anno);
            setBudgetInfo(res);
        } catch (err) {
            setToast({ message: "Errore nel caricamento", type: "error" });
        } finally {
            setLoading(false);
        }
    };

    const fetchTuttiIBudget = async () => {
        try {
            const res = await getTuttiIBudget(mese, anno);
            setBudgetTotale(res);
        } catch (err) {
            setToast({ message: "Errore nei dati del grafico", type: "error" });
        }
    };

    const handleSalva = async () => {
        try {
            await setBudget({ categoria, limite: parseFloat(limite), mese, anno });
            setToast({ message: "✅ Budget salvato con successo", type: "success" });
            fetchBudget();
            fetchTuttiIBudget();
        } catch (err) {
            setToast({ message: "❌ Errore nel salvataggio", type: "error" });
        }
    };

    useEffect(() => {
        fetchBudget();
        fetchTuttiIBudget();
    }, [categoria, mese, anno]);

    return (
        <>
            <UserNavbar />
            <div className="container user-budget">
                <h2 className="text-center">Budget Mensile</h2>

                <div className="form-section">
                    <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                        {categorie.map(c => <option key={c}>{c}</option>)}
                    </select>

                    <select value={mese} onChange={e => setMese(Number(e.target.value))}>
                        {mesi.map((m, i) => <option key={i + 1} value={i + 1}>{m}</option>)}
                    </select>

                    <input
                        type="number"
                        placeholder="Limite €"
                        value={limite}
                        onChange={e => setLimite(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Anno"
                        value={anno}
                        onChange={e => setAnno(Number(e.target.value))}
                    />

                    <Button onClick={handleSalva}>Salva Budget</Button>
                </div>

                {loading ? <Loader /> : budgetInfo && (
                    <div className="budget-summary">
                        <InfoCard label="Speso" value={budgetInfo.speso} icon="💸" />
                        <InfoCard label="Limite" value={budgetInfo.limite} icon="📊" />
                        <div className="progress-bar">
                            <div
                                className={`bar-fill ${budgetInfo.superato ? "bar-over" : ""}`}
                                style={{ width: `${Math.min(100, (budgetInfo.speso / budgetInfo.limite) * 100)}%` }}
                            />
                        </div>
                        <p className={`budget-residuo ${budgetInfo.superato ? "over" : "ok"}`}>
                            {budgetInfo.superato
                                ? `⚠️ Hai superato il budget di ${Math.abs(budgetInfo.residuo).toFixed(2)} €`
                                : `💰 Ti restano ${budgetInfo.residuo.toFixed(2)} € da spendere`}
                        </p>
                    </div>
                )}

                {budgetTotale.length > 0 && (
                    <div className="budget-bar-chart-wrapper">
                        <h3>Grafico Riepilogo Spese per Categoria</h3>
                        <BudgetBarChart data={budgetTotale} />
                    </div>
                )}

                {toast && <Toast {...toast} onClose={() => setToast(null)} />}
            </div>
        </>
    );
};

export default UserBudget;
