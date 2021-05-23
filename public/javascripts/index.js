var oReq = new XMLHttpRequest();
var olReq = new XMLHttpRequest();
var dReq = new XMLHttpRequest();
var tags, docs;
dReq.addEventListener("load", listDocuments);
//oReq.addEventListener("load", listLoad);
olReq.addEventListener("load", listTags);
oReq.open("GET", "/api/users");
dReq.open("GET", "/api/documents");
olReq.open("GET", "/api/tags");
oReq.send();
olReq.send();
dReq.send();



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
    let sul = document.getElementById("sList");
    let mySli = JSON.parse(this.responseText);
    tags = mySli;
    for (i = 0; i < mySli.length; i++) {
        let sli = document.createElement("li");
        let vul = document.createElement("ul");
        sli.innerHTML = mySli[i].tag_name + ":";
        sul.appendChild(sli);
        sli.appendChild(vul);

        for (j = 0; j < mySli[i].tag_values.length; j++) {
            let vli = document.createElement("input");
            vli.setAttribute("type", "checkbox");
            let label = document.createElement("label");
            let ali = document.createElement("li");
            label.innerHTML = mySli[i].tag_values[j] + "<br>";
            ali.appendChild(vli);
            ali.appendChild(label);
            vul.appendChild(ali);
        }
    }
}
function listDocuments(e) {
    console.log(this);
    let ul = document.getElementById("cList"),
        table = document.createElement("table");
    table.setAttribute("id", "table");
    let myLi = JSON.parse(this.responseText);
    docs = myLi;
    for (i = 0; i < myLi.length; i++) {
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
highlightRow = (e) => {
    console.log(e.target.tagName);
    let row = e.target.closest("tr") || e.target, table = row.closest("table");
    for (i = 0; i < table.rows.length; i++) {
        if (row == table.rows[i]) {
            row.classList.add("selectedTr");
        } else {
            table.rows[i].classList.remove("selectedTr");
        }
    }
}
addRow = () => {
    document.getElementById("modifyForm").classList.remove("hidden");
    let dul = document.createElement("ul");
    let sul = document.getElementById("tag_values");
    sul.innerHTML = "";
    sul.appendChild(dul);
    for (i = 0; i < tags.length; i++) {
        let sli = document.createElement("li");
        let vul = document.createElement("ul");
        sli.innerHTML = tags[i].tag_name + ":";
        dul.appendChild(sli);
        sli.appendChild(vul);
        for (j = 0; j < tags[i].tag_values.length; j++) {
            let vli = document.createElement("input");
            vli.setAttribute("type", "checkbox");
            let label = document.createElement("label");
            let ali = document.createElement("li");
            label.innerHTML = tags[i].tag_values[j];
            ali.appendChild(vli);
            ali.appendChild(label);
            vul.appendChild(ali);
        }
    }
}
editRow = () => {
    let selectedRow = document.querySelector(".selectedTr");
    if (selectedRow) {
        document.getElementById("modifyForm").classList.remove("hidden");
        let dul = document.createElement("ul");
        let sul = document.getElementById("tag_values");
        sul.innerHTML = "";
        sul.appendChild(dul);
        let document_name = document.getElementById("document_name");
        let document_description = document.getElementById("document_description");
        let document_link = document.getElementById("document_link");
        let rowData = selectedRow.getAttribute("row_data");
        let myRow = JSON.parse(rowData);
        console.log(rowData);
        document_name.value = myRow.document_name;
        document_description.value = myRow.document_description;
        document_link.value = myRow.document_link;
        let tagList = Object.values(myRow.document_tags);
        console.log(myRow);
        for (i = 0; i < tags.length; i++) {
            let sli = document.createElement("li");
            let vul = document.createElement("ul");
            sli.innerHTML = tags[i].tag_name + ":";
            dul.appendChild(sli);
            sli.appendChild(vul);
            for (j = 0; j < tags[i].tag_values.length; j++) {
                let vli = document.createElement("input");
                vli.setAttribute("type", "checkbox");
                let label = document.createElement("label");
                let ali = document.createElement("li");
                label.innerHTML = tags[i].tag_values[j];
                ali.appendChild(vli);
                ali.appendChild(label);
                vul.appendChild(ali);
                vli.checked = myRow.document_tags[tags[i].tag_name].indexOf(tags[i].tag_values[j]) > -1;
            }
        }
    } else {
        alert("Pentru a edita un element din lista selectati un rand.");
    }
}
applyBtn = () => {

}
exitBtn = () => {
    document.getElementById("modifyForm").classList.add("hidden");
}

function srcBar() {
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("contentSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("cList");
    li = ul.getElementsByTagName("tr");

    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].classList.remove("hidden");
        } else {
            li[i].classList.add("hidden");
        }
    }
}