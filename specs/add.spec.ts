import { describe, it, expect } from "./_describe.ts"
import { add } from '../mod.ts'


describe('add', () => {
    it('declared function correctly', () => {
        expect(add(10, 20)).toEqual(30)
    })
})
