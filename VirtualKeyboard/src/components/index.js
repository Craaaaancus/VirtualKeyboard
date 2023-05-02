import Keyboard from './Keyboard.js'

function CreateKeyboard() {
  const centralizer = document.createElement('div')
  centralizer.className = 'centralizer'

  const title = document.createElement('p')
  title.className = 'title'
  title.textContent = 'Virtual keyboard'
  const textarea = document.createElement('textarea')
  textarea.className = 'textarea'
  textarea.id = 'textarea'
  textarea.cols = 50
  textarea.rows = 5
  textarea.spellcheck = false
  const keyboard = new Keyboard().getKeyboard()
  const { keyboardIds } = new Keyboard()
  const description = document.createElement('p')
  description.className = 'description'
  description.textContent = 'Keyboard for Windows'
  const language = document.createElement('p')
  language.className = 'language'
  language.innerHTML = 'Keyboard shortcut for language translation: left <span>shift + alt</span>'

  centralizer.append(title)
  centralizer.append(textarea)
  centralizer.append(keyboard)
  centralizer.append(description)
  centralizer.append(language)

  const body = document.querySelector('body')
  const ru = document.getElementsByClassName('ru')
  const eng = document.getElementsByClassName('eng')
  const caps = document.getElementsByClassName('caps')
  const caseDown = document.getElementsByClassName('caseDown')
  const caseUp = document.getElementsByClassName('caseUp')
  const shiftCaps = document.getElementsByClassName('shiftCaps')
  const specialKeys = [
    'Tab',
    'CapsLock',
    'Backspace',
    'Delete',
    'Enter',
    'ShiftLeft',
    'ShiftRight',
    'ControlLeft',
    'ControlRight',
    'MetaLeft',
    'AltLeft',
    'AltRight',
    'Space',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
  ]

  function getCaretPos(obj) {
    obj.focus()
    if (obj.selectionStart !== false) return obj.selectionStart
    return 0
  }

  function addLangChange() {
    for (let i = 0; i < ru.length; i += 1) {
      ru[i].classList.toggle('hidden')
      eng[i].classList.toggle('hidden')
    }
    if (eng[0].classList.contains('hidden')) {
      localStorage.setItem('display', 'ru')
    } else {
      localStorage.setItem('display', 'eng')
    }
    if (document.getElementById('CapsLock').classList.contains('active')) {
      for (let i = 0; i < caps.length; i += 1) {
        caseDown[i]?.classList.add('hidden')
        caseDown[i + 1]?.classList.add('hidden')
        caps[i]?.classList.remove('hidden')
        caps[i + 1]?.classList.remove('hidden')
        caseUp[i]?.classList.add('hidden')
        caseUp[i + 1]?.classList.add('hidden')
        shiftCaps[i]?.classList.add('hidden')
        shiftCaps[i + 1]?.classList.add('hidden')
      }
    } else {
      for (let i = 0; i < caps.length; i += 1) {
        caseDown[i]?.classList.remove('hidden')
        caseDown[i + 1]?.classList.remove('hidden')
        caps[i]?.classList.add('hidden')
        caps[i + 1]?.classList.add('hidden')
        caseUp[i]?.classList.add('hidden')
        caseUp[i + 1]?.classList.add('hidden')
        shiftCaps[i]?.classList.add('hidden')
        shiftCaps[i + 1]?.classList.add('hidden')
      }
    }
  }

  function addToTextarea(key, code) {
    if (code === 'AltRight' || code === 'AltLeft' || code === 'ControlLeft' || code === 'ControlRight' || code === 'ShiftLeft' || code === 'ShiftRight' || code === 'CapsLock' || code === 'MetaLeft') return
    if (code === 'Backspace') {
      const caretPos = getCaretPos(textarea)
      if (caretPos === 0) {
        return
      }
      let n = caretPos - 1
      n = n < 0 ? 0 : n
      const slice = textarea.textContent.slice(0, n)
      const slice1 = textarea.textContent.slice(caretPos)
      textarea.textContent = slice + slice1
      if (caretPos === 1) return
      textarea.selectionStart = slice.length - 1
      textarea.selectionEnd = slice.length - 1
    }
    if (code === 'Delete') {
      const n = getCaretPos(textarea)
      const slice1 = textarea.textContent.slice(0, n)
      const startIndex = getCaretPos(textarea) + 1
      const slice2 = textarea.textContent.slice(startIndex, textarea.textContent.length)
      textarea.textContent = slice1 + slice2
      textarea.selectionStart = n
    } else {
      const caretPos = getCaretPos(textarea)
      let symbol = ''
      if (!specialKeys.includes(code)) {
        symbol = key.querySelector('span:not(.hidden)>span:not(.hidden)').textContent
      }
      if (code === 'ArrowRight') symbol = '▶'
      if (code === 'ArrowUp') symbol = '▲'
      if (code === 'ArrowLeft') symbol = '◀'
      if (code === 'ArrowDown') symbol = '▼'
      if (code === 'Space') symbol = ' '
      if (code === 'Tab') symbol = '\t'
      if (code === 'Enter') symbol = '\n'
      const slice = textarea.textContent.slice(0, caretPos)
      const slice1 = textarea.textContent.slice(caretPos)
      textarea.textContent = slice + symbol + slice1
      textarea.selectionStart = slice.length + 1
    }
  }

  body.addEventListener('keydown', (event) => {
    const key = document.getElementById(event.code)
    if (!key) return
    event.preventDefault()

    if (
      event.code === 'Tab'
      || event.code === 'ArrowRight'
      || event.code === 'ArrowLeft'
      || event.code === 'ArrowDown'
      || event.code === 'ArrowUp'
    ) {
      event.preventDefault()
      key.classList.add('active')
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      key.classList.add('active')
      if (document.getElementById('AltLeft').classList.contains('active')) {
        addLangChange()
      } else if (
        document.getElementById('CapsLock').classList.contains('active')
      ) {
        for (let i = 0; i < caps.length; i += 2) {
          shiftCaps[i]?.classList.remove('hidden')
          shiftCaps[i + 1]?.classList.remove('hidden')
          caps[i]?.classList.add('hidden')
          caps[i + 1]?.classList.add('hidden')
        }
      } else {
        for (let i = 0; i < caps.length; i += 2) {
          caseUp[i]?.classList.remove('hidden')
          caseUp[i + 1]?.classList.remove('hidden')
          caseDown[i]?.classList.add('hidden')
          caseDown[i + 1]?.classList.add('hidden')
        }
      }
    } else if (event.code === 'AltLeft') {
      key.classList.add('active')
      event.preventDefault()
      if (document.getElementById('ShiftLeft').classList.contains('active')) {
        addLangChange()
      }
    } else if (event.code === 'CapsLock') {
      key.classList.toggle('active')
      for (let i = 0; i < caps.length; i += 2) {
        caseDown[i]?.classList.toggle('hidden')
        caseDown[i + 1]?.classList.toggle('hidden')
        caps[i]?.classList.toggle('hidden')
        caps[i + 1]?.classList.toggle('hidden')
      }
    } else {
      key.classList.add('active')
    }
    addToTextarea(key, event.code)
  })

  body.addEventListener('keyup', (event) => {
    const key = document.getElementById(event.code)
    if (!key) return

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (document.getElementById('CapsLock').classList.contains('active')) {
        for (let i = 0; i < caps.length; i += 2) {
          shiftCaps[i]?.classList.add('hidden')
          shiftCaps[i + 1]?.classList.add('hidden')
          caps[i]?.classList.remove('hidden')
          caps[i + 1]?.classList.remove('hidden')
        }
      } else {
        for (let i = 0; i < caps.length; i += 2) {
          caseUp[i]?.classList.add('hidden')
          caseUp[i + 1]?.classList.add('hidden')
          caseDown[i]?.classList.remove('hidden')
          caseDown[i + 1]?.classList.remove('hidden')
        }
      }
      key.classList.remove('active')
    } else if (event.code !== 'CapsLock') key.classList.remove('active')
  })

  body.addEventListener('mousedown', (event) => {
    for (let i = 0; i < keyboardIds.length; i += 1) {
      for (let j = 0; j < keyboardIds[i].length; j += 1) {
        const target = event.target.closest(`#${keyboardIds[i][j]}`)
        if (target) {
          if (target.id === 'CapsLock') {
            target.classList.toggle('active')
            for (let k = 0; k < caps.length; k += 2) {
              caseDown[k]?.classList.toggle('hidden')
              caseDown[k + 1]?.classList.toggle('hidden')
              caps[k]?.classList.toggle('hidden')
              caps[k + 1]?.classList.toggle('hidden')
            }
          }
          if (target.id === 'ShiftLeft' || target.id === 'ShiftRight') {
            if (
              document.getElementById('CapsLock').classList.contains('active')
            ) {
              for (let l = 0; l < caps.length; l += 2) {
                shiftCaps[l]?.classList.remove('hidden')
                shiftCaps[l + 1]?.classList.remove('hidden')
                caps[l]?.classList.add('hidden')
                caps[l + 1]?.classList.add('hidden')
              }
            } else {
              for (let m = 0; m < caps.length; m += 2) {
                caseUp[m]?.classList.remove('hidden')
                caseUp[m + 1]?.classList.remove('hidden')
                caseDown[m]?.classList.add('hidden')
                caseDown[m + 1]?.classList.add('hidden')
              }
            }
          } else addToTextarea(target, target.id)
        }
      }
    }
  })

  body.addEventListener('mouseup', (event) => {
    const arr = ['#ShiftLeft', '#ShiftRight']

    for (let i = 0; i < arr.length; i += 1) {
      const target = event.target.closest(arr[i])
      if (target) {
        if (document.getElementById('CapsLock').classList.contains('active')) {
          for (let j = 0; j < caps.length; j += 2) {
            shiftCaps[j]?.classList.add('hidden')
            shiftCaps[j + 1]?.classList.add('hidden')
            caps[j]?.classList.remove('hidden')
            caps[j + 1]?.classList.remove('hidden')
          }
        } else {
          for (let j = 0; j < caps.length; j += 2) {
            caseUp[j]?.classList.add('hidden')
            caseUp[j + 1]?.classList.add('hidden')
            caseDown[j]?.classList.remove('hidden')
            caseDown[j + 1]?.classList.remove('hidden')
          }
        }
      }
    }
  })

  keyboard.addEventListener('mousedown', (event) => {
    event.preventDefault()
  })

  textarea.addEventListener('keydown', (event) => {
    event.preventDefault()
  })

  body.append(centralizer)
}

CreateKeyboard()
