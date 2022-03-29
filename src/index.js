import './style.css';
import 'boxicons';
import {
  del, getLocal, updateindex, updateText,
} from './module/meme-object.js';
import dom from './module/add-Dom-elem.js';
import d from './module/crud.js';
// import { update } from 'lodash';

const domBtnInsert = document.getElementById('insert');
const domBtnDelete = document.getElementById('btn-clear');
const inputText = document.getElementById('add-text');

// === display the list === //
getLocal().forEach((element) => {
  dom.creatElements(element.description, element.index);
});
// ======================== //
// === add new item === //
domBtnInsert.addEventListener('click', () => {
  d.btnInsert();
});
// ==================== //
// === delete item or multiple items === //
domBtnDelete.addEventListener('click', () => {
  d.btnDelete();
  updateindex();
  window.location.reload();
});
// ===================================== //
// === event when check the box === //
const cbList = document.querySelectorAll('[type="checkbox"]');
cbList.forEach.call(cbList, (cb) => {
  cb.addEventListener('click', function () {
    if (cb.checked) this.nextElementSibling.style.textDecoration = 'line-through';
    else this.nextElementSibling.style.textDecoration = 'none';
  });
});
// === action when click option icon === //
const icList = document.querySelectorAll('.li-edit-icon');
icList.forEach.call(icList, (ic) => {
  ic.addEventListener('click', () => {
    if (ic.getAttribute('name') === 'trash') {
      del(ic.id);
      updateindex();
      window.location.reload();
    }
    ic.setAttribute('name', 'trash');
    ic.parentElement.childNodes[1].setAttribute('contenteditable', 'true');
    ic.parentElement.childNodes[1].focus();
    ic.parentElement.style.backgroundColor = '#f0c5e1';

    ic.parentElement.childNodes[1].addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        updateText(ic.id, ic.parentElement.childNodes[1].innerText);
        ic.setAttribute('name', 'dots-vertical-rounded');
        ic.parentElement.childNodes[1].blur();
        ic.parentElement.childNodes[1].setAttribute('contenteditable', 'false');
        ic.parentElement.style.backgroundColor = '#fff';
      }
    });
    ic.parentElement.childNodes[1].addEventListener('onblur', (event) => {
      console.log(event);
    });
  });
});

// ===================================== //
// ==== add new meme when press enter === //
inputText.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    domBtnInsert.click();
  }
});
// ====================================== //
