function fillKey(value, span, symbols, symbolsOnShift) {
  const caseDown = span.querySelector('.caseDown')
  const caseUp = span.querySelector('.caseUp')
  const caps = span.querySelector('.caps')
  const shiftCaps = span.querySelector('.shiftCaps')

  caseDown.textContent = value
  if (symbols.includes(value)) {
    caseUp.textContent = symbolsOnShift[symbols.indexOf(value)]
    caps.textContent = value
    shiftCaps.textContent = symbolsOnShift[symbols.indexOf(value)]
  } else {
    caseUp.textContent = value.toUpperCase()
    caps.textContent = value.toUpperCase()
    shiftCaps.textContent = value
  }
}

function getLangSpan(lang = 'eng', hidden = true) {
  if (!hidden) localStorage.setItem('display', lang)

  const span = document.createElement('span')
  span.className = lang
  if (hidden) span.classList.add('hidden')
  span.innerHTML = `
    <span class="caseDown"></span>
    <span class="caseUp hidden"></span>
    <span class="caps hidden"></span>
    <span class="shiftCaps hidden"></span>
  `
  return span
}

export default class Key {
  value = null

  specials = [
    'Tab',
    'CapsLock',
    'Backspace',
    'Del',
    'Enter',
    'ShiftLeft',
    'ShiftRight',
    'CtrlLeft',
    'CtrlRight',
    'Win',
    'AltLeft',
    'AltRight',
    'Space',
    '▲',
    '▼',
    '◀',
    '▶',
  ]

  symbols = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '`',
    '-',
    '=',
    '[',
    ']',
    '\\',
    ',',
    "'",
    ',',
    '.',
    '/',
  ]

  symbolsOnShift = [
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '~',
    '_',
    '+',
    '{',
    '}',
    '|',
    ':',
    '"',
    '<',
    '>',
    '?',
  ]

  symbolsRu = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    '\\',
    '.',
  ]

  symbolsOnShiftRu = [
    '!',
    '"',
    '№',
    ';',
    '%',
    ':',
    '?',
    '*',
    '(',
    ')',
    '_',
    '+',
    '/',
    ',',
  ]

  constructor(value, valueRu = null, width = 40) {
    this.fillKey = fillKey.bind(this)
    this.getLangSpan = getLangSpan.bind(this)

    const key = document.createElement('div')
    key.className = 'keyboard--key'
    if (this.specials.includes(value)) {
      key.classList.add('black')
      let temp = value
      if (value === 'ShiftLeft' || value === 'ShiftRight') temp = 'Shift'
      else if (value === 'CtrlLeft' || value === 'CtrlRight') temp = 'Ctrl'
      else if (value === 'AltLeft' || value === 'AltRight') temp = 'Alt'
      else if (value === 'Space') temp = ''
      key.textContent = temp
    } else {
      const lang = localStorage.getItem('display')
      let span1 = this.getLangSpan('eng', false)
      let span2 = this.getLangSpan('ru')
      if (lang === 'ru') {
        span1 = this.getLangSpan('eng')
        span2 = this.getLangSpan('ru', false)
      }
      this.fillKey(value, span1, this.symbols, this.symbolsOnShift)
      this.fillKey(valueRu, span2, this.symbolsRu, this.symbolsOnShiftRu)
      key.append(span1)
      key.append(span2)
    }
    key.style.width = `${width}px`
    this.value = key
  }

  getKey() {
    return this.value
  }
}
