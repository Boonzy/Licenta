"use strict";
var tags, users, roles, data;

function callApi(method, url, data) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.addEventListener("load", onload);
        xhr.addEventListener("error", onerror);
        if (method == 'POST' || 'DELETE') {
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
        if (data) {
            data = JSON.stringify(data);
        }
        xhr.send(data);
        function onload() {
            let data;
            if (this.responseText != '') {
                data = JSON.parse(this.responseText);
            }
            return resolve(data);
        }
        function onerror(e) {
            return reject(e);
        }
    });
    return promise;
}


let highlightRow = (e) => {
    console.log(e.target.tagName);
    let row = e.target.closest("tr") || e.target, table = row.closest("table");
    for (let i = 0; i < table.rows.length; i++) {
        if (row == table.rows[i]) {
            row.classList.add("selectedTr");
        } else {
            table.rows[i].classList.remove("selectedTr");
        }
    }
}
function createTable(data) {
    let cList = document.getElementById("cList"),
        table = document.createElement("table"),
        thead = document.createElement("thead"),
        tbody = document.createElement("tbody"),
        tr = document.createElement("tr");
    for (let i = 0; i < data.length; i++) {
        th = document.createElement("th");
        th.innerHTML = Object.keys(data[i]);
        tr.appendChild(th);
        thead.appendChild(tr);
    }
    for (let j = 0; j < data.length; j++) {
        tbody.appendChild(tr);
    }
}

let loadUsers = async () => {
    data = await callApi('GET', '/api/userList');
    let myLi = data;
    for (let i = 0; i < myLi.length; i++) {
        let row = document.getElementsByTagName("tr");
        row.onclick = highlightRow;
        row.innerHTML = `<td>${myLi[i].first_name}</td>
        <td>${myLi[i].last_name}</td>
        <td>${myLi[i].role_id}</td>
        <td>${myLi[i].role_name}</td>`;
    }
}
let loadTags = async () => {
    data = await callApi('GET', '/api/tags');
    let myLi = data;
    for (let i = 0; i < myLi.length; i++) {
        let row = document.getElementsByTagName("tr");
        row.onclick = highlightRow;
        row.innerHTML = `<td>${myLi[i].tag_name}</td>
            <td>${Object.values(myLi[i].tag_values)}</td>`;
    }
}
let loadRoles = async () => {
    data = await callApi('GET', '/api/roles');
    let myLi = data;
    for (let i = 0; i < myLi.length; i++) {
        let row = document.getElementsByTagName("tr");
        row.onclick = highlightRow;
        row.innerHTML = `<td>${myLi[i].role_name}</td>
        <td>${myLi[i].role_id}</td>`;
    }
}
function renderModifyForm(selectedRow) {

}

let addRow = () => {
    renderModifyForm();
}
let editRow = () => {
    let selectedRow = document.querySelector(".selectedTr");
    if (selectedRow) {
        renderModifyForm(selectedRow);
    } else {
        alert("Pentru a edita un element din lista selectati un rand.");
    }
}
let deleteRow = () => {

}

let applyBtn = async () => {

}

let exitBtn = () => {
    document.getElementById("modifyForm").classList.add("hidden");
}

function srcBar() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("contentSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("cList");
    li = ul.getElementsByTagName("tr");

    for (let i = 0; i < li.length; i++) {
        txtValue = li[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].classList.remove("hidden");
        } else {
            li[i].classList.add("hidden");
        }
    }
}

let home = () => {
    window.location = "/"
}

let logOut = async () => {
    if (await callApi("POST", "/api/logOut")) {
        window.location.reload();
    }

}