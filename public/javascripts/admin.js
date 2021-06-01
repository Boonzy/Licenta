"use strict";
var tags, users, roles, data;

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
    table.id = "tabel";
    // creeaza capat de tabel
    let cols = Object.keys(data[0]);
    for (let i = 0; i < cols.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = cols[i];
        tr.appendChild(th);
        thead.appendChild(tr);
    }
    // adauga date
    for (let i = 0; i < data.length; i++) {
        tr = document.createElement("tr");
        tr.onclick = highlightRow;
        for (let j = 0; j < cols.length; j++) {
            let td = document.createElement("td");
            td.innerHTML = data[i][cols[j]];
            tr.appendChild(td);
            tr.setAttribute("row_data", JSON.stringify(data[i]))
        }
        tbody.appendChild(tr);
    }
    cList.innerHTML = "";
    table.appendChild(thead);
    table.appendChild(tbody);
    cList.appendChild(table);
}

let loadUsers = async () => {
    data = await callApi('GET', '/api/userList');
    createTable(data);
}
let loadTags = async () => {
    data = await callApi('GET', '/api/tags');
    createTable(data)
}
let loadRoles = async () => {
    data = await callApi('GET', '/api/roles');
    createTable(data)
}
function renderModifyForm(selectedRow) {
    let row_data = selectedRow.getAttribute("row_data");
    let myRow = JSON.parse(row_data);
    if (myRow.user_id) {
        document.getElementById("modifyUser").classList.remove("hidden");
        if (selectedRow) {
            let rowData = selectedRow.getAttribute("row_data");
            myRow = JSON.parse(rowData);
            console.log(rowData);
            first_name.value = myRow.first_name;
            last_name.value = myRow.last_name;
            role_name.value = myRow.role_id;
            user_id.value = myRow.user_id;
        } else {
            first_name.value = "";
            last_name.value = "";
            user_id.value = "";
        }
    }
    if (myRow.tag_id) {
        document.getElementById("modifyTag").classList.remove("hidden");
        if (selectedRow) {
            let rowData = selectedRow.getAttribute("row_data");
            myRow = JSON.parse(rowData);
            console.log(rowData);
            tag_name.value = myRow.tag_name;
            tag_value.value = myRow.tag_values.join(",");
            tag_id.value = myRow.tag_id;
        } else {
            tag_name.value = "";
            tag_value.value = "";
            tag_id.value = "";
        }
    }
}


let applyTagBtn = async () => {
    let selectedRow = document.querySelector(".selectedTr");
    let applData = {
        tag_name: tag_name.value, tag_value: tag_value.value.split(",")
    }
    if (selectedRow) {
        let row_data = selectedRow.getAttribute("row_data");
        let myRow = JSON.parse(row_data);
        applData.tag_id = myRow.tag_id;
        let url = '/api/updateTag';
        await callApi('POST', url, applData);

    } else {
        let url = '/api/addTag';
        await callApi('POST', url, applData);
    }
    window.location.reload();

}

let applyUserBtn = async () => {
    let selectedRow = document.querySelector(".selectedTr");
    let applData = {
        first_name: first_name.value, last_name: last_name.value, role_id: role_name.value, user_id: user_id.value
    }
    if (selectedRow) {
        let row_data = selectedRow.getAttribute("row_data");
        let myRow = JSON.parse(row_data);
        applData.user_id = myRow.user_id;
        let url = '/api/updateUser';
        await callApi('POST', url, applData);
    } else {
        let url = '/api/addUser';
        await callApi('POST', url, applData);
    }
    window.location.reload();
}

function renderUserForm() {
    document.getElementById("modifyUser").classList.remove("hidden");
    first_name.value = "";
    last_name.value = "";
    user_id.value = "";
}
function renderTagForm() {
    document.getElementById("modifyTag").classList.remove("hidden");
    tag_name.value = "";
    tag_value.value = "";
}
let addEntry = () => {
    let dataVals = Object.keys(data[0]);
    if (dataVals[0] == "user_id") {
        renderUserForm()
    } else {
        renderTagForm()
    }
}
let editEntry = () => {
    let selectedRow = document.querySelector(".selectedTr");
    if (selectedRow) {
        renderModifyForm(selectedRow);
    } else {
        alert("Pentru a edita un element din lista selectati un rand.");
    }
}
let deleteEntry = async () => {
    let selectedRow = document.querySelector(".selectedTr");
    let url, userId, tagId;
    if (selectedRow) {
        let row_data = selectedRow.getAttribute("row_data");
        let myRow = JSON.parse(row_data);
        console.log(myRow);
        if (myRow.user_id) {
            userId = { user_id: myRow.user_id };
            console.log(userId);
            url = '/api/deleteUser';
            await callApi('DELETE', url, userId);
            window.location.reload();
        }
        if (myRow.tag_id) {
            tagId = { tag_id: myRow.tag_id };
            console.log(tagId);
            url = '/api/deleteTag';
            await callApi('DELETE', url, tagId);
            window.location.reload();
        }
    }
}

let exitUserBtn = () => {
    document.getElementById("modifyUser").classList.add("hidden");
}
let exitTagBtn = () => {
    document.getElementById("modifyTag").classList.add("hidden");
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