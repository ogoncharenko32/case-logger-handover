import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Initialize date picker
const datePicker = document.querySelector('.date-picker');
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  enableTime: false,
  onClose(selectedDates) {
    curDate = selectedDates[0];
    loadMapFromLS();
    parseDaily();
  },
});

let caseList = new Map();
let curDate = new Date();

const convertDateToKey = date => date.toDateString().replace(/ /g, '');

const inputForm = document.querySelector('.input-form');

inputForm.addEventListener('submit', event => {
  event.preventDefault();
  const caseLink = event.target.elements.forminputcase.value;
  const caseStatus = event.target.elements.forminputstatus.value;
  const caseDescr = event.target.elements.forminputdescription.value;
  const caseComment = event.target.elements.forminputtextarea.value;
  newObj(caseLink, caseStatus, caseDescr, caseComment);
  parseDaily();
  inputForm.reset();
});

const newObj = (caseLink, caseStatus, caseDescr, caseComment) => {
  const caseObj = {
    id: new Date().getTime(),
    caseLink,
    caseStatus,
    caseDescr,
    caseComment,
  };

  const key = convertDateToKey(curDate);
  if (caseList.has(key)) {
    caseList.get(key).set(caseObj.id, caseObj);
  } else {
    caseList.set(key, new Map());
    caseList.get(key).set(caseObj.id, caseObj);
  }
  saveMapToLS(caseList);
};

const convertObjFromMaps = maps => {
  const objs = {};
  maps.forEach((map, key) => {
    objs[key] = Object.fromEntries(map);
  });
  return objs;
};

const convertMapFromObj = objs => {
  const maps = new Map();
  for (const key in objs) {
    maps.set(key, new Map(Object.entries(objs[key])));
  }
  return maps;
};

const saveMapToLS = list =>
  localStorage.setItem('case-list', JSON.stringify(convertObjFromMaps(list)));

const loadMapFromLS = () => {
  const data = localStorage.getItem('case-list');
  if (data) {
    const objs = JSON.parse(data);
    caseList = convertMapFromObj(objs);
  }
};

const addToDOM = (key, el) => {
  const table = document.querySelector('.cases-table');
  const newTableEl = document.createElement('li');
  newTableEl.classList.add(key);
  newTableEl.insertAdjacentHTML(
    'beforeend',
    // `<th><a href="${el.caseLink}" target="_blank">${el.caseLink}</a></th><th class="case-info">${el.caseStatus}</th><th class="case-info">${el.caseDescr}</th><th class="case-info">${el.caseComment}</th><th><div class="case-btn-div"><button class="edit-btn" type="button">Edit</button><button class="delete-btn" type="button">Delete</button></div></th>`
    `<div><a href="${el.caseLink}" target="_blank">${caseName(
      el.caseLink
    )}</a></div><div><p class="case-info">${
      el.caseStatus
    }</p></div><div><p class="case-info">${
      el.caseDescr
    }</p><p class="case-info-overlay">${
      el.caseDescr
    }</p></div><div><p class="case-info">${
      el.caseComment
    }</p><p class="case-info-overlay">${
      el.caseComment
    }</p></div><div class="case-btn-div"><button class="edit-btn" type="button">Edit</button><button class="delete-btn" type="button">Delete</button></div>`
  );
  table.append(newTableEl);
};

function caseName(name) {
  if (name.includes('jira')) {
    return name.slice(name.lastIndexOf('/') + 1);
  } else if (name.includes('lightning.force')) {
    return `SFDC link`;
  } else {
    return name;
  }
}

const parseDaily = () => {
  const todayCases = caseList.get(convertDateToKey(curDate));
  const table = document.querySelector('.cases-table');
  table.innerHTML = '';
  if (todayCases) {
    todayCases.forEach((value, key) => {
      addToDOM(key, value);
    });
  }
};

const caseTable = document.querySelector('.cases-table');
caseTable.addEventListener('click', event => {
  if (event.target.nodeName !== 'BUTTON') return;
  if (event.target.className === 'delete-btn') handleDelete(event);
  if (event.target.className === 'edit-btn') handleEdit(event);
});

const handleDelete = e => {
  let confirmClosure = confirm('Are U Sure?');
  if (!confirmClosure) {
    return;
  }

  const btn = e.target;
  const li = btn.parentNode.parentNode;
  const key = li.classList[0];
  caseList.get(convertDateToKey(curDate)).delete(key);
  const table = document.querySelector('.cases-table');
  table.removeChild(li);
  saveMapToLS(caseList);
  iziToast.show({
    message: 'Case deleted!',
    messageColor: 'teal',
    color: 'red',
    position: 'topCenter',
    timeout: 2000,
    iconColor: '#fff',
    maxWidth: '432px',
  });
};

const handleEdit = event => {
  const li = event.target.parentNode.parentNode;
  openModal(li);
};

const exportBtn = document.querySelector('.export-btn');
exportBtn.addEventListener('click', event => {
  const todaysCases = caseList.get(convertDateToKey(curDate));
  let output = '';
  console.log(todaysCases);
  todaysCases.forEach(el => {
    output += `# ${caseName(el.caseLink)} | ${el.caseStatus} | ${
      el.caseDescr
    } | ${el.caseComment} \n`;
  });
  navigator.clipboard.writeText(output).then(
    iziToast.show({
      message: 'List of cases copied to clipboard',
      messageColor: 'teal',
      color: 'green',
      position: 'topCenter',
      timeout: 2000,
      iconColor: '#fff',
      maxWidth: '432px',
    })
  );
});

loadMapFromLS();
parseDaily();

function openModal(value) {
  const modalForm = document.querySelector('.js-modal-form');
  modalForm.innerHTML = '';
  const form = document.createElement('ul');
  form.insertAdjacentHTML(
    'afterbegin',
    `<li>
            <label class="modal-input-form-label"
              >Case<input
                class="form-input modal-form-input-case"
                name="forminputcase"
                type="text"
                required
            /></label>
          </li>
          <li>
            <label class="modal-input-form-label"
              >Status
              <select
                class="form-input modal-form-input-status"
                name="forminputstatus"
                id=""
                required
              >
                <option value="Ongoing" selected>Ongoing</option>
                <option value="WFC">WFC</option>
                <option value="Escalated to T2">Escalated to T2</option>
                <option value="Pending RMA">Pending RMA</option>
                <option value="Pending for MW">Pending for MW</option>
                <option value="Resolved">Resolved</option>
                <option value="Escalated to CSM">Escalated to CSM</option>
                <option value="Escalated to RnD">Escalated to RnD</option>
                <option value="Closed">Closed</option>
              </select></label
            >
          </li>
          <li>
            <label class="modal-input-form-label"
              >Description<input
                class="form-input modal-form-input-description"
                name="forminputdescription"
                type="text"
                required
            /></label>
          </li>
          <li>
            <label class="modal-input-form-label"
              >Comment<textarea
                class="form-input modal-form-input-textarea form-input-textarea"
                name="forminputtextarea"
                type="text"
              ></textarea>
            </label>
          </li>`
  );
  modalForm.append(form);
  form.insertAdjacentHTML(
    'afterend',
    `<button class="modal-save-btn input-form-button" type="button">
          Save
        </button>
        <button class="modal-close-btn input-form-button" type="button">
          Close
          </button>`
  );

  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const saveBtn = document.querySelector('.modal-save-btn');

  modal.classList.remove('is-hidden');

  closeBtn.addEventListener('click', closeModal);
  saveBtn.addEventListener('click', event => updateCase(event, value));

  renderModal(value);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.modal-close-btn');

  closeBtn.removeEventListener('click', closeModal);

  modal.classList.add('is-hidden');
}

function renderModal(obj) {
  loadMapFromLS();
  const key = obj.classList[0];
  const caseObj = caseList.get(convertDateToKey(curDate)).get(key);
  console.log('caseObj :', caseObj);
  const caseEl = document.querySelector('.modal-form-input-case');
  const caseStatus = document.querySelector('.modal-form-input-status');
  const caseDescr = document.querySelector('.modal-form-input-description');
  const caseComment = document.querySelector('.modal-form-input-textarea');
  caseEl.value = caseObj.caseLink;
  caseStatus.value = caseObj.caseStatus;
  caseDescr.value = caseObj.caseDescr;
  caseComment.value = caseObj.caseComment;
}

function updateCase(event, value) {
  loadMapFromLS();

  const caseEl = document.querySelector('.modal-form-input-case');
  const caseStatus = document.querySelector('.modal-form-input-status');
  const caseDescr = document.querySelector('.modal-form-input-description');
  const caseComment = document.querySelector('.modal-form-input-textarea');

  const key = value.classList[0];

  const todayCases = caseList.get(convertDateToKey(curDate));

  if (todayCases && todayCases.has(key)) {
    const caseObj = todayCases.get(key);
    caseObj.caseLink = caseEl.value;
    caseObj.caseStatus = caseStatus.value;
    caseObj.caseDescr = caseDescr.value;
    caseObj.caseComment = caseComment.value;

    saveMapToLS(caseList);

    parseDaily();

    const modal = document.querySelector('.modal');
    modal.classList.add('is-hidden');
  }
  const saveBtn = document.querySelector('.modal-save-btn');
  saveBtn.removeEventListener('click', event);
}

//----hide-button-logic

const stateButton = document.querySelector('.input-form-state-button-js');
let formStateStatusIsActive = true;
stateButton.addEventListener('click', event => handleFormState(event));
function handleFormState(e) {
  if (formStateStatusIsActive) {
    const form = document.querySelector('.form-wrapper-js');
    form.style.display = 'none';
    formStateStatusIsActive = false;
    e.target.textContent = 'menu';
    e.target.style.position = 'static';
  } else {
    const form = document.querySelector('.form-wrapper-js');
    form.style.width = '';
    form.style.display = 'block';
    formStateStatusIsActive = true;
    e.target.textContent = 'hide';
    e.target.style.position = 'absolute';
  }
}

///-----Clock

function clockInit() {
  const clock = document.querySelector('.clock');
  setInterval(() => {
    const hrs = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();

    clock.textContent = `${hrs < 10 ? `0${hrs}` : hrs}:${
      min < 10 ? `0${min}` : min
    }:${sec < 10 ? `0${sec}` : sec}`;
  }, 1000);
}

clockInit();
