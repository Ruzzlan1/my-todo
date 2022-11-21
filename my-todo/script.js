const addBtn = document.querySelector('.btnAdd');
const btnDiv = document.querySelector('.input-content')
const btnInput = document.querySelector('.input-content .btnX')
const listInput = document.querySelector('.listInput');
const lists = document.querySelector('.lists');
const ascIcon = document.querySelector('.asc');
const descIcon = document.querySelector('.desc');

let orderArr = [];
let count = 0;
let inputActive = true;
let minWidth = false;

eventListeners();

function eventListeners() {
    addBtn.addEventListener('click', addButtom);
    btnInput.addEventListener('click', () => {
        listInput.value = '';
    });
    listInput.addEventListener('keyup', (e) => {
        if (e.keyCode == 13) {
            if (lists.childElementCount != 0 || listInput.value != '') {
                addList();
                btnDiv.style.display = 'none'
                lists.style.border = '1px solid #C4C4C4';
                lists.style.borderRadius = '10px';
                inputActive = false;
            }
        }
    });
    ascIcon.addEventListener('click', orderAsc);
    descIcon.addEventListener('click', orderDesc);
}


function checkCountDiv() {
    const countDiv = document.querySelectorAll('.lists li');
    if (countDiv.length == 0) {
        if (btnDiv.style.display == 'none') {
            btnDiv.style.display = 'flex';
        }
        lists.style.display = 'none';
        btnDiv.style.borderTop = null;
        btnDiv.style.borderRadius = '10px';
    } else if (countDiv.length < 6) {
        lists.style.overflowY = 'hidden';
        lists.style.height = null;
    }
}

function clearList(e) {
    const listsText = document.querySelectorAll('.lists li');
    listsText.forEach((item, index) => {
        if (item.getAttribute('data-index') == e) {
            item.remove();
            orderArr.splice(index - 1, 1);
        }
    });
    checkCountDiv();
}

function clearBtn() {
    const clearListBtn = document.querySelectorAll('.lists .btnX');
    clearListBtn.forEach((item) => {
        item.addEventListener('click', () => {
            clearList(item.parentElement.getAttribute('data-index'));
        });
    })
}

function addButtom() {
    if (!inputActive) {
        btnDiv.style.display = 'flex';
        lists.style.borderBottom = 'none';
        lists.style.borderRadius = '10px 10px 0 0';
        inputActive = true;
    } else if (listInput.value == '') {
        alert("Input can't empty");
    } else {
        addList();
    }
    count++;
    listInput.value = '';
    listInput.focus();
}

function addList() {
    lists.style.borderBottom = 'none';
    lists.style.borderRadius = '10px 10px 0 0';
    btnDiv.style.borderTop = 'none';
    btnDiv.style.borderRadius = '0 0 10px 10px';
    lists.innerHTML += `<li class="list" draggable="true" data-index = ${count}> ${listInput.value}
    <button class="btnX"><img src="/images/X-button.svg" alt="x-button"></button>
</li>`;
    lists.style.display = 'block';
    if (lists.childElementCount > 5) {
        lists.style.overflowY = 'scroll';
        if (minWidth) {
            lists.style.height = '40vw';
        } else {
            lists.style.height = '16.5vw';
        }
        lists.scrollTop = lists.scrollHeight;
    }
    listInput.value = '';
    clearBtn();
}

function addOrderArr() {
    orderArr = []
    const listsText = document.querySelectorAll('.lists li');
    listsText.forEach((item) => {
        orderArr.push(item.innerHTML);
    });
    console.log(orderArr)
    orderArr.sort();
}

function AddOrderList(myArray) {
    const listsText = document.querySelectorAll('.lists li');
    listsText.forEach((item, index) => {
        item.innerHTML = myArray[index];
    });
    clearBtn();
}

function orderAsc(e) {
    addOrderArr();
    AddOrderList(orderArr);
    e.target.style.display = 'none';
    descIcon.style.display = 'block';
}

function orderDesc(e) {
    addOrderArr();
    const orderRevArr = [...orderArr].reverse();
    AddOrderList(orderRevArr);
    e.target.style.display = 'none';
    ascIcon.style.display = 'block';
}

