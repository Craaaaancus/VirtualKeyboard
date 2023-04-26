import { Keyboard } from "./Keyboard.js"

function CreateKeyboard() {
  let centralizer = document.createElement('div');
  centralizer.className = 'centralizer';

  let title = document.createElement('p');
  title.className = 'title';
  title.textContent = 'Virtual keyboard';
  let textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  textarea.id = 'textarea';
  textarea.cols = 50;
  textarea.rows = 5;
  textarea.spellcheck = false;
  let keyboard = new Keyboard().getKeyboard();
  let keyboardIds = new Keyboard().keyboardIds;
  let description = document.createElement('p');
  description.className = 'description';
  description.textContent = 'Keyboard for Windows';
  let language = document.createElement('p');
  language.className = 'language';
  language.innerHTML =
    'Keyboard shortcut for language translation: left <span>shift + alt</span>';

  centralizer.append(title);
  centralizer.append(textarea);
  centralizer.append(keyboard);
  centralizer.append(description);
  centralizer.append(language);

  let body = document.querySelector('body');
  let ru = document.getElementsByClassName('ru');
  let eng = document.getElementsByClassName('eng');
  let caps = document.getElementsByClassName('caps');
  let caseDown = document.getElementsByClassName('caseDown');
  let caseUp = document.getElementsByClassName('caseUp');
  let shiftCaps = document.getElementsByClassName('shiftCaps');
  let specialKeys = [
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
  ];

  function addLangChange() {
    for (let i = 0; i < ru.length; i++) {
      ru[i].classList.toggle('hidden');
      eng[i].classList.toggle('hidden');
    }
    if (eng[0].classList.contains('hidden')){
      localStorage.setItem('display', 'ru');
    }
    else{
      localStorage.setItem('display', 'eng');
    }
    if (document.getElementById('CapsLock').classList.contains('active')) {
      for (let i = 0; i < caps.length; i++) {
        caseDown[i].classList.add('hidden');
        caseDown[i + 1].classList.add('hidden');
        caps[i].classList.remove('hidden');
        caps[i + 1].classList.remove('hidden');
        caseUp[i].classList.add('hidden');
        caseUp[i + 1].classList.add('hidden');
        shiftCaps[i].classList.add('hidden');
        shiftCaps[i + 1].classList.add('hidden');
      }
    } else {
      for (let i = 0; i < caps.length; i++) {
        caseDown[i].classList.remove('hidden');
        caseDown[i + 1].classList.remove('hidden');
        caps[i].classList.add('hidden');
        caps[i + 1].classList.add('hidden');
        caseUp[i].classList.add('hidden');
        caseUp[i + 1].classList.add('hidden');
        shiftCaps[i].classList.add('hidden');
        shiftCaps[i + 1].classList.add('hidden');
      }
    }
  }
  
  function addToTextarea(key, code){
    if (code == 'AltRight' || code == 'AltLeft' || code == 'ControlLeft' || code == 'ControlRight' || code == 'ShiftLeft' || code == 'ShiftRight' || code == 'CapsLock' || code == 'MetaLeft') return;
    if (code == 'Backspace') {
      let caretPos = getCaretPos(textarea);
      if (caretPos == 0){
        return;
      }
      let n = caretPos - 1;
      n = n < 0 ? 0 : n;
      let slice = textarea.textContent.slice(0, n);
      let slice1 = textarea.textContent.slice(caretPos);
      textarea.textContent = slice + slice1;
      if (caretPos == 1) return;
      textarea.selectionStart = slice.length-1;
      textarea.selectionEnd = slice.length-1;
    }
    if (code == 'Delete'){
      let n = getCaretPos(textarea);
      let slice = textarea.textContent.slice(0, n);
      textarea.textContent = slice + textarea.textContent.slice(getCaretPos(textarea) + 1, textarea.textContent.length);
      textarea.selectionStart = n;
    }
    else{
      let caretPos = getCaretPos(textarea);
      let symbol = "";
      if (!specialKeys.includes(code)){
        symbol = key.querySelector('span:not(.hidden)>span:not(.hidden)').textContent;
      }
      if (code == 'ArrowRight') symbol = '▶';
      if (code == 'ArrowUp')    symbol = '▲';
      if (code ==  'ArrowLeft') symbol = '◀';
      if (code == 'ArrowDown')  symbol = '▼'; 
      if (code == 'Space')      symbol = ' ';
      if (code == 'Tab')        symbol = '\t';
      if (code == 'Enter')      symbol = '\n';
      let slice = textarea.textContent.slice(0, caretPos);
      let slice1 = textarea.textContent.slice(caretPos);
      textarea.textContent = slice + symbol + slice1;
      textarea.selectionStart = slice.length+1;
    }
  }

  body.addEventListener('keydown', function (event) {
    let key = document.getElementById(event.code);
    event.preventDefault();
    if (
      event.code == 'Tab' ||
      event.code == 'ArrowRight' ||
      event.code == 'ArrowLeft' ||
      event.code == 'ArrowDown' ||
      event.code == 'ArrowUp' 
    ) {
      event.preventDefault();
      key.classList.add('active');
    } else if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
      key.classList.add('active');
      if (document.getElementById('AltLeft').classList.contains('active')) {
        addLangChange();
      } else if (
        document.getElementById('CapsLock').classList.contains('active')
      ) {
        for (let i = 0; i < caps.length; i += 2) {
          shiftCaps[i].classList.remove('hidden');
          shiftCaps[i + 1].classList.remove('hidden');
          caps[i].classList.add('hidden');
          caps[i + 1].classList.add('hidden');
        }
      } else {
        for (let i = 0; i < caps.length; i += 2) {
          caseUp[i].classList.remove('hidden');
          caseUp[i + 1].classList.remove('hidden');
          caseDown[i].classList.add('hidden');
          caseDown[i + 1].classList.add('hidden');
        }
      }
    } else if (event.code == 'AltLeft') {
      key.classList.add('active');
      event.preventDefault();
      if (document.getElementById('ShiftLeft').classList.contains('active')) {
        addLangChange();
      }
    } else if (event.code == 'CapsLock') {
      key.classList.toggle('active');
      for (let i = 0; i < caps.length; i += 2) {
        caseDown[i].classList.toggle('hidden');
        caseDown[i + 1].classList.toggle('hidden');
        caps[i].classList.toggle('hidden');
        caps[i + 1].classList.toggle('hidden');
      }
    } else {
      key.classList.add('active');
    }
    addToTextarea(key, event.code);
  });

  body.addEventListener('keyup', function (event) {
    let key = document.getElementById(event.code);
    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
      if (document.getElementById('CapsLock').classList.contains('active')) {
        for (let i = 0; i < caps.length; i += 2) {
          shiftCaps[i].classList.add('hidden');
          shiftCaps[i + 1].classList.add('hidden');
          caps[i].classList.remove('hidden');
          caps[i + 1].classList.remove('hidden');
        }
      } else {
        for (let i = 0; i < caps.length; i += 2) {
          caseUp[i].classList.add('hidden');
          caseUp[i + 1].classList.add('hidden');
          caseDown[i].classList.remove('hidden');
          caseDown[i + 1].classList.remove('hidden');
        }
      }
      key.classList.remove('active');
    } else if (event.code != 'CapsLock') key.classList.remove('active');
  });

  body.addEventListener('mousedown', function(event){
    for (let i = 0; i < keyboardIds.length; i++){
      for (let j = 0; j < keyboardIds[i].length; j++) {
        let target = event.target.closest(`#${keyboardIds[i][j]}`);
        if (target){
          if (target.id == 'CapsLock'){
            target.classList.toggle('active');
            for (let i = 0; i < caps.length; i += 2) {
              caseDown[i].classList.toggle('hidden');
              caseDown[i + 1].classList.toggle('hidden');
              caps[i].classList.toggle('hidden');
              caps[i + 1].classList.toggle('hidden');
            }
          }
          if (target.id == 'ShiftLeft' || target.id == 'ShiftRight'){
            if (
              document.getElementById('CapsLock').classList.contains('active')
            ) {
              for (let i = 0; i < caps.length; i += 2) {
                shiftCaps[i].classList.remove('hidden');
                shiftCaps[i + 1].classList.remove('hidden');
                caps[i].classList.add('hidden');
                caps[i + 1].classList.add('hidden');
              }
            }
            else{
              for (let i = 0; i < caps.length; i += 2) {
                caseUp[i].classList.remove('hidden');
                caseUp[i + 1].classList.remove('hidden');
                caseDown[i].classList.add('hidden');
                caseDown[i + 1].classList.add('hidden');
              }
            }
          }
          else addToTextarea(target, target.id);
        }
      }
    }
  });

  body.addEventListener('mouseup', function(event){
    let arr = ['#ShiftLeft', '#ShiftRight'];
    
    for (let i = 0; i < arr.length; i++){
      let target = event.target.closest(arr[i]);
      if (target){
        if (document.getElementById('CapsLock').classList.contains('active')) {
          for (let i = 0; i < caps.length; i += 2) {
            shiftCaps[i].classList.add('hidden');
            shiftCaps[i + 1].classList.add('hidden');
            caps[i].classList.remove('hidden');
            caps[i + 1].classList.remove('hidden');
          }
        } else {
          for (let i = 0; i < caps.length; i += 2) {
            caseUp[i].classList.add('hidden');
            caseUp[i + 1].classList.add('hidden');
            caseDown[i].classList.remove('hidden');
            caseDown[i + 1].classList.remove('hidden');
          }
        }
      }
    }
  });

  function getCaretPos(obj) {
    obj.focus();
    if (obj.selectionStart!==false) return obj.selectionStart;
    else return 0;
  }

  keyboard.addEventListener('mousedown', function(event){
    event.preventDefault();
  });


  textarea.addEventListener('keydown', function(event){
    event.preventDefault();
  });

  body.append(centralizer);
}

CreateKeyboard()
