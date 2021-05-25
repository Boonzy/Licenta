"use strict";
var tags, docs;

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

window.onload = async () => {
    await loadTags();
    await loadDocuments();
}

async function loadTags() {
    tags = await callApi('GET', '/api/tags');
    let sul = document.getElementById("sList");
    let mySli = tags;
    for (let i = 0; i < mySli.length; i++) {
        let sli = document.createElement("li");
        let vul = document.createElement("ul");
        sli.innerHTML = mySli[i].tag_name + ":";
        sul.appendChild(sli);
        sli.appendChild(vul);

        for (let j = 0; j < mySli[i].tag_values.length; j++) {
            let vli = document.createElement("input");
            vli.setAttribute("type", "checkbox");
            vli.setAttribute("chkValue", mySli[i].tag_name + "_" + mySli[i].tag_values[j])
            vli.onclick = sideFilter;
            let label = document.createElement("label");
            let ali = document.createElement("li");
            label.innerHTML = mySli[i].tag_values[j] + "<br>";
            ali.appendChild(vli);
            ali.appendChild(label);
            vul.appendChild(ali);
        }
    }
}

/*function listLoad(e){
  console.log(this);
    let ul = document.getElementById("cList");
    let myLi = JSON.parse(this.responseText);
  for(i = 0; i < myLi.length; i++){
        let li = document.createElement("li");
        li.innerHTML = myLi[i].first_name;
        ul.appendChild(li);
    }
}*/
function listTags(e) {
    console.log(this);

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
async function loadDocuments() {
    docs = await callApi('GET', '/api/documents');
    let ul = document.getElementById("cList"),
        table = document.createElement("table");
    table.id = "docTable";
    let myLi = docs;
    for (let i = 0; i < myLi.length; i++) {
        let row = document.createElement("tr");
        row.onclick = highlightRow;
        row.setAttribute("row_data", JSON.stringify(docs[i]))
        row.innerHTML = `<td>${myLi[i].document_name}</td>
            <td>${myLi[i].document_description}</td>
            <td>${Object.values(myLi[i].document_tags)}</td>
            <td><a href="${myLi[i].document_link}" target="_blank">Link</a></td>`;
        ul.appendChild(table);
        table.appendChild(row);
    }
}

function renderModifyForm(selectedRow) {
    document.getElementById("modifyForm").classList.remove("hidden");
    let dul = document.createElement("ul");
    let sul = document.getElementById("tag_values");
    sul.innerHTML = "";
    sul.appendChild(dul);
    let myRow, tagList;
    if (selectedRow) {
        let rowData = selectedRow.getAttribute("row_data");
        myRow = JSON.parse(rowData);
        console.log(rowData);
        document_name.value = myRow.document_name;
        document_description.value = myRow.document_description;
        document_link.value = myRow.document_link;
        tagList = Object.values(myRow.document_tags);
    } else {
        document_name.value = "";
        document_description.value = "";
        document_link.value = "";
    }
    console.log(myRow);
    for (let i = 0; i < tags.length; i++) {
        let sli = document.createElement("li");
        let vul = document.createElement("ul");
        sli.innerHTML = tags[i].tag_name + ":";
        sli.setAttribute('edit-tag-name', tags[i].tag_name);
        dul.appendChild(sli);
        sli.appendChild(vul);
        for (let j = 0; j < tags[i].tag_values.length; j++) {
            let vli = document.createElement("input");
            vli.setAttribute("type", "checkbox");
            vli.setAttribute('edit-tag-value', tags[i].tag_values[j]);
            let label = document.createElement("label");
            let ali = document.createElement("li");
            label.innerHTML = tags[i].tag_values[j];
            ali.appendChild(vli);
            ali.appendChild(label);
            vul.appendChild(ali);
            if (myRow && myRow.document_tags[tags[i].tag_name]) {
                vli.checked = myRow.document_tags[tags[i].tag_name].indexOf(tags[i].tag_values[j]) > -1;
            }
        }
    }
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
    let selectedRow = document.querySelector(".selectedTr");
    let url, docId;
    if (selectedRow) {
        let row_data = selectedRow.getAttribute("row_data");
        let myRow = JSON.parse(row_data);
        console.log(myRow);
        docId = { document_id: myRow.document_id };
        console.log(docId);
        url = '/api/deleteDoc';
        callApi('DELETE', url, docId);
        window.location.reload();
    }
}
let applyBtn = async () => {
    let applData = {
        document_name: document_name.value, document_description: document_description.value, document_link: document_link.value
    }, tagsfsorSave = {};
    let tagElem = modifyForm.querySelectorAll("[edit-tag-name]");
    for (let i = 0; i < tagElem.length; i++) {
        let tagValues = [], tagName = tagElem[i].getAttribute("edit-tag-name"),
            tagvaluesElem = tagElem[i].querySelectorAll("[edit-tag-value]:checked");
        for (let j = 0; j < tagvaluesElem.length; j++) {
            tagValues.push(tagvaluesElem[j].getAttribute("edit-tag-value"));
        }
        if (tagValues.length > 0) {
            tagsfsorSave[tagName] = tagValues;
        }
    }
    applData.document_tags = tagsfsorSave;

    let url;

    let selectedRow = document.querySelector(".selectedTr");
    if (selectedRow) {
        let row_data = selectedRow.getAttribute("row_data");
        let myRow = JSON.parse(row_data);
        applData.document_id = myRow.document_id;
        url = '/api/updateDoc';
    } else {
        url = '/api/saveDoc';
    }
    console.log(applData);
    if (!document_link.value || !document_name.value || !document_description.value || tagsfsorSave == {}) {
        alert("Introduceti valori");
        return;
    }
    await callApi('POST', url, applData);
    window.location.reload();
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
let a1Ina2 = (array1, array2) => {
}
let getRowDataFilterKeys = (tagData) => {
    let filterKeys = [];
    let tagKeys = Object.keys(tagData);
    for (let i = 0; i < tagKeys.length; i++) {
        let rowDataKeys = tagKeys[i];
        for (let j = 0; j < rowDataKeys[j].length; j++) {
            let rowKeys = rowDataKeys + "_" + rowDataKeys[j];
            filterKeys.push(rowKeys);
        }
    }
    return filterKeys;
}
let getSideFilterKeys = () => {
    let filterKeys = [];
    let chkBox = sList.querySelectorAll("input[type='checkbox']:checked");
    for (let i = 0; i < chkBox.length; i++) {
        let chkKey = chkBox[i].getAttribute("chkValue");
        filterKeys.push(chkKey);
    }
    return filterKeys;
}
let sideFilter = () => {
    let sideFilterKeys = getSideFilterKeys();
    let rows = docTable.rows;
    for (let i = 0; i < rows.length; i++) {
        let tagData = JSON.parse(rows[i].getAttribute("row_data")).document_tags;
        let rowFilterKeys = getRowDataFilterKeys(tagData);
        if (a1Ina2(sideFilterKeys, rowFilterKeys)) {
            rows[i].classList.remove("hidden");
        } else {
            rows[i].classList.add("hidden");
        }
    }
}