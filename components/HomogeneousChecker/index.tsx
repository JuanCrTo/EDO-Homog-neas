import { useState } from 'react'
import { isHomogeneous } from '@/utils/utils'

export default function HomogeneousChecker() {
  const [M, setM] = useState('')
  const [N, setN] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const checkHomogeneity = () => {
    if (!M || !N) return setResult('❗ Debes ingresar M(x, y) y N(x, y)')
    const isHomo = isHomogeneous(M, N)
    setResult(isHomo ? '✅ Ecuación homogénea' : '❌ No es homogénea')
  }

  return (
    <div>
      <h2>Verificar Homogeneidad de EDO</h2>
      <input
        type="text"
        placeholder="M(x, y) = x^2 + y^2"
        value={M}
        onChange={(e) => setM(e.target.value)}
      />
      <input
        type="text"
        placeholder="N(x, y) = xy"
        value={N}
        onChange={(e) => setN(e.target.value)}
      />
      <button onClick={checkHomogeneity}>Verificar</button>
      {result && <p>{result}</p>}
    </div>
  )
}
