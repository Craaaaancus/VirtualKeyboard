import { Key } from "./Key.js"

export class Keyboard {
  keyboard = null
  keyboardIds = [
    [
      'Backquote',
      'Digit1',
      'Digit2',
      'Digit3',
      'Digit4',
      'Digit5',
      'Digit6',
      'Digit7',
      'Digit8',
      'Digit9',
      'Digit0',
      'Minus',
      'Equal',
      'Backspace',
    ],
    [
      'Tab',
      'KeyQ',
      'KeyW',
      'KeyE',
      'KeyR',
      'KeyT',
      'KeyY',
      'KeyU',
      'KeyI',
      'KeyO',
      'KeyP',
      'BracketLeft',
      'BracketRight',
      'Backslash',
      'Delete',
    ],
    [
      'CapsLock',
      'KeyA',
      'KeyS',
      'KeyD',
      'KeyF',
      'KeyG',
      'KeyH',
      'KeyJ',
      'KeyK',
      'KeyL',
      'Semicolon',
      'Quote',
      'Enter',
    ],
    [
      'ShiftLeft',
      'KeyZ',
      'KeyX',
      'KeyC',
      'KeyV',
      'KeyB',
      'KeyN',
      'KeyM',
      'Comma',
      'Period',
      'Slash',
      'ArrowUp',
      'ShiftRight',
    ],
    [
      'ControlLeft',
      'MetaLeft',
      'AltLeft',
      'Space',
      'AltRight',
      'ArrowLeft',
      'ArrowDown',
      'ArrowRight',
      'ControlRight',
    ],
  ]
  EngKeyboard = [
    [
      '`',
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
      'Backspace',
    ],
    [
      'Tab',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      '[',
      ']',
      '\\',
      'Del',
    ],
    [
      'CapsLock',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      ';',
      "'",
      'Enter',
    ],
    [
      'ShiftLeft',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '/',
      '▲',
      'ShiftRight',
    ],
    [
      'CtrlLeft',
      'Win',
      'AltLeft',
      'Space',
      'AltRight',
      '◀',
      '▼',
      '▶',
      'CtrlRight',
    ],
  ]
  RusKeyboard = [
    [
      'ё',
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
      'Backspace',
    ],
    [
      'Tab',
      'й',
      'ц',
      'у',
      'к',
      'е',
      'н',
      'г',
      'ш',
      'щ',
      'з',
      'х',
      'ъ',
      '\\',
      'Del',
    ],
    [
      'CapsLock',
      'ф',
      'ы',
      'в',
      'а',
      'п',
      'р',
      'о',
      'л',
      'д',
      'ж',
      'э',
      'Enter',
    ],
    [
      'ShiftLeft',
      'я',
      'ч',
      'с',
      'м',
      'и',
      'т',
      'ь',
      'б',
      'ю',
      '.',
      '▲',
      'ShiftRight',
    ],
    [
      'CtrlLeft',
      'Win',
      'AltLeft',
      'Space',
      'AltRight',
      '◀',
      '▼',
      '▶',
      'CtrlRight',
    ],
  ]
  constructor() {
    this.keyboard = document.createElement('div')
    this.keyboard.className = 'keyboard'
    for (let i = 0; i < 5; i++) {
      let row = document.createElement('div')
      row.className = 'keyboard--row'
      for (let j = 0; j < this.EngKeyboard[i].length; j++) {
        let obj = new Key(
          this.EngKeyboard[i][j],
          this.RusKeyboard[i][j],
          this.getWidth(this.EngKeyboard[i][j])
        )
        let key = obj.getKey()
        key.id = this.keyboardIds[i][j]
        row.append(key)
      }
      this.keyboard.append(row)
    }
  }
  
  getKeyboard() {
    return this.keyboard
  }

  getWidth(key) {
    switch (key) {
      case 'Backspace':
      case 'CapsLock':
      case 'ShiftLeft':
        return 100
      case 'Tab':
        return 50
      case 'Del':
        return 44
      case 'Enter':
      case 'ShiftRight':
        return 86
      case 'Space':
        return 330
      default:
        return 40
    }
  }
}
