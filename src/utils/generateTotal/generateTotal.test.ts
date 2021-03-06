import { generateTotal, sum } from '..'

const RESULTS = [1, 2, 3]
const LOWEST_ROLL = RESULTS[0] // 1
const HIGHEST_ROLL = RESULTS[2] // 3
const TOTAL = sum(RESULTS) // 6

describe('generateTotal', () => {
  test('when not provided a modifier, sums the results and returns the total', () => {
    expect(generateTotal(RESULTS)).toEqual(TOTAL)
  })

  test('when provided a modifier function, passes in results to that fn and returns the return value of the fn', () => {
    const modifier = (results: number[]) => results.length
    expect(generateTotal(RESULTS, modifier)).toBe(RESULTS.length)
  })

  describe('when provided a modifier object', () => {
    test('with a plus property, adds the provided amount to the total', () => {
      const modifier = { plus: 2 }
      expect(generateTotal(RESULTS, modifier)).toEqual(TOTAL + modifier.plus)
    })

    describe('with a drop.highest property', () => {
      test('with a boolean value, it removes the highest roll and sums the rest', () => {
        const modifier = { drop: { highest: true } }
        expect(generateTotal(RESULTS, modifier)).toEqual(TOTAL - HIGHEST_ROLL)
      })

      test('with a number value n, it removes the n highest roll and sums the rest', () => {
        const modifier = { drop: { highest: 2 } }
        expect(generateTotal(RESULTS, modifier)).toEqual(LOWEST_ROLL)
      })
    })

    describe('with a drop.lowest property', () => {
      test('with a boolean value, it removes the lowest roll and sums the rest', () => {
        const modifier = { drop: { lowest: true } }
        expect(generateTotal(RESULTS, modifier)).toEqual(TOTAL - LOWEST_ROLL)
      })

      test('with a number value n, it removes the n lowest roll and sums the rest', () => {
        const modifier = { drop: { lowest: 2 } }
        expect(generateTotal(RESULTS, modifier)).toEqual(HIGHEST_ROLL)
      })
    })

    describe('with a minus property', () => {
      test('that is positive, subtracts the value', () => {
        const modifier = { minus: 2 }
        expect(generateTotal(RESULTS, modifier)).toEqual(TOTAL - modifier.minus)
      })

      test('that is negative, adds the value', () => {
        const modifier = { minus: -2 }
        expect(generateTotal(RESULTS, modifier)).toEqual(TOTAL + modifier.minus)
      })
    })
  })
})
