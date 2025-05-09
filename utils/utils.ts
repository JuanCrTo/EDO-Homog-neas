import nerdamer from 'nerdamer'
import 'nerdamer/Calculus'
import 'nerdamer/Algebra'

export function isHomogeneous(M: string, N: string): boolean {
  try {
    const t = 't'
    const x = 'x'
    const y = 'y'

    const substituteExpr = (expr: string) =>
      nerdamer(expr)
        .sub(x, `${t}*${x}`)
        .sub(y, `${t}*${y}`)
        .expand()
        .toString()

    const factorDegree = (original: string, substituted: string): number | null => {
      const ratio = nerdamer(`(${substituted})/(${original})`).expand().toString()
      const match = ratio.match(/^t\^(\d+)$/)
      return match ? parseInt(match[1]) : null
    }

    const M_sub = substituteExpr(M)
    const N_sub = substituteExpr(N)

    const degM = factorDegree(M, M_sub)
    const degN = factorDegree(N, N_sub)

    return degM !== null && degM === degN
  } catch (err) {
    console.error('Error al verificar homogeneidad:', err)
    return false
  }
}
