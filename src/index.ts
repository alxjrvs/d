import { RollLog } from './rollLog'
import { RollModifier } from './types'
import { generateTotal, random } from './utils'

// tslint:disable-next-line: class-name
export class D {
  public readonly sides: number
  public readonly log: RollLog[] = []
  public readonly persist: boolean

  constructor(sides: number, persist = false) {
    this.sides = sides
    this.persist = persist
  }

  public roll = (num = 1, modifier?: RollModifier) => {
    const results = Array.from(Array(num)).map(this.singleRoll)
    const total = generateTotal(results, modifier)
    if (this.persist) {
      this.log.push(new RollLog(total, results, modifier))
    }
    return { total, results }
  }

  private singleRoll = () => {
    return random(this.sides)
  }
}

export const [D4, D6, D8, D10, D12, D20, D100] = [4, 6, 8, 10, 12, 20, 100].map(
  sides => new D(sides),
)
