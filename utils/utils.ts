import { z } from "zod";

// Schema para validar ecuaciones diferenciales
export const equationSchema = z.object({
  M: z
    .string()
    .min(1, { message: "La expresión M(x,y) es requerida" })
    .max(500, { message: "La expresión M(x,y) es demasiado larga" }),
  N: z
    .string()
    .min(1, { message: "La expresión N(x,y) es requerida" })
    .max(500, { message: "La expresión N(x,y) es demasiado larga" }),
});

export type EquationInput = z.infer<typeof equationSchema>;

// Función para transformar la notación de MathLive a formato SymPy
export const mathLiveToSympy = (expression: string): string => {
  // Estas transformaciones son básicas y se pueden ampliar según sea necesario
  return expression
    .replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1)/($2)") // Fracciones
    .replace(/\^/g, "**") // Exponentes
    .replace(/\\cdot/g, "*") // Multiplicación
    .replace(/\\times/g, "*") // Multiplicación
    .replace(/\\sqrt{([^}]*)}/g, "sqrt($1)") // Raíz cuadrada
    .replace(/\\pi/g, "pi") // Pi
    .replace(/\\sin/g, "sin") // Seno
    .replace(/\\cos/g, "cos") // Coseno
    .replace(/\\tan/g, "tan") // Tangente
    .replace(/\\ln/g, "log"); // Logaritmo natural
};

// Función para formatear los resultados
export const formatResult = (
  isHomogeneous: boolean,
  degree: number | null
): string => {
  if (isHomogeneous && degree !== null) {
    return `✅ Es homogénea de grado ${degree}`;
  }
  return "❌ No es homogénea";
};
