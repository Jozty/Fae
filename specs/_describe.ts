export { expect } from 'https://deno.land/x/expect/expect.ts'

interface It {
  desc: string
  passed: boolean
  error?: Error
}

interface TestSuit {
  name: string
  it: It[]
}


export class Tests {
  static instance: Tests
  public totalTestSuits: number
  public passedTestSuits: number
  public failedTestSuits: number
  public totalTest: number
  public passedTest: number
  public failedTest: number
  public beforeEachs: Function[]
  public afterEachs: Function[]
  public beforeAlls: Function[]
  public afterAlls: Function[]
  public stats: TestSuit[]
  public currentTestSuit: TestSuit
  constructor() {
    this.totalTestSuits = 0
    this.passedTestSuits = 0
    this.failedTestSuits = 0
    this.totalTest = 0
    this.passedTest = 0
    this.failedTest = 0
    this.beforeEachs = []
    this.afterEachs = []
    this.beforeAlls = []
    this.afterAlls = []
    this.stats = []
    this.currentTestSuit = {
      name: '',
      it: []
    }
  }
  static getInstance() {
    if(!this.instance) this.instance = new Tests()
    return this.instance
  }

}

//@ts-ignore
globalThis.tests = globalThis.tests || Tests.getInstance()
//@ts-ignore
const tests: Tests = globalThis.tests

export const beforeEach = (fn: Function) => tests.beforeEachs.push(fn)
export const afterEach = (fn: Function) => tests.afterEachs.push(fn)
export const beforeAll = (fn: Function) => tests.beforeAlls.push(fn)
export const afterAll = (fn: Function) => tests.afterAlls.push(fn)

export function describe(desc: string, func: Function) {
  // @ts-ignore
  tests.currentTestSuit = {
    name: desc,
    it: []
  }
  tests.beforeEachs = []
  tests.afterEachs = []
  tests.beforeAlls = []
  tests.afterAlls = []
  tests.totalTestSuits++

  tests.beforeAlls.forEach(b => b())
  func()
  tests.afterAlls.forEach(b => b())
  
  let isTestsPassed = tests.currentTestSuit.it.every(a => a.passed === true)
  if(isTestsPassed) tests.passedTestSuits++
  else tests.failedTestSuits++
  showTestSuit()
}

export function it(desc: string, func: Function) {
  tests.totalTest++
  tests.beforeEachs.forEach(b => b())
  try {
    func()
    if(tests.afterEachs.length) tests.afterEachs.forEach(b => b())
    tests.currentTestSuit.it.push({
      desc,
      passed: true
    })
    tests.passedTest++
  } catch (error) {
    tests.currentTestSuit.it.push({
      desc,
      passed: false,
      error,
    })
    tests.failedTest++
  }
}

function showTestSuit() {
  tests.stats.push(tests.currentTestSuit)
}
