import { describe, it } from './_describe.ts'
import { trim, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('trim', () => {
  const str1 = `
  sdfdsfd d      sdfdsfds sdfsdf
  
  
  `
  const str2 = '!!!Hey!!!'
  const str3 = '[[Hello]]]'
  const trim1 = trim(str1)
  const trim2 = trim(str2)
  const trim3 = trim(str3)
  it('should work fine', () => {
    eq(trim1(''), str1.trim())
    eq(trim1('a'), str1)
    eq(trim1('!!!'), str1)

    eq(trim2('!!!'), 'Hey')
    eq(trim2('!!'), '!Hey!')
    eq(trim2('!'), 'Hey')
    eq(trim2(''), str2)
    eq(trim2('abc'), str2)

    eq(trim3('['), 'Hello]]]')
    eq(trim3('[['), 'Hello]]]')
    eq(trim3('[[['), '[[Hello]]]')
    eq(trim3(']]]'), '[[Hello')
    eq(trim3(']]'), '[[Hello]')
    eq(trim3(''), str3)
    eq(trim3('abc'), str3)
  })

  it('should work with curried versions', () => {
    eq(trim('!!!abcabc!!', '!!'), '!abcabc')
    eq(trim('!!!abcabc!!')('!!'), '!abcabc')
    eq(trim(_, '!!')('!!!abcabc!!'), '!abcabc')
  })
})
