import React, { useState } from "react";
import MathInput from "../components/MathInput";
import EquationDisplay from "../components/EquationDisplay";

const Home: React.FC = () => {
  const [latex, setLatex] = useState("");
  const [resultado, setResultado] = useState<{
    homogenea: boolean;
    grado: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verificarHomogeneidad = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/verificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equation: latex }),
      });
      const data = await response.json();
      if (response.ok) {
        setResultado(data);
        setError(null);
      } else {
        setError(data.error || "Error al verificar la ecuación.");
        setResultado(null);
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
      setResultado(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">
        Verificador de Homogeneidad de EDO
      </h1>
      <MathInput onChange={setLatex} />
      <EquationDisplay latex={latex} />
      <button
        onClick={verificarHomogeneidad}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Verificar Homogeneidad
      </button>
      {resultado && (
        <div className="mt-4">
          {resultado.homogenea ? (
            <p>La ecuación es homogénea </p>
          ) : (
            <p>La ecuación no es homogénea.</p>
          )}
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Home;
