var oReq = new XMLHttpRequest();
var olReq = new XMLHttpRequest();
var dReq = new XMLHttpRequest();

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
function listTags(e){
    console.log(this);
    let sul = document.getElementById("sList");
    let mySli = JSON.parse(this.responseText);
    for(i = 0; i < mySli.length; i++){
          let sli = document.createElement("li");
          let vul = document.createElement("ul");
          sli.innerHTML = mySli[i].tag_name + ":";
          sul.appendChild(sli);
          sli.appendChild(vul);
          
    for(j = 0; j < mySli[i].tag_values.length; j++){
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
function listDocuments(e){
    console.log(this);
        let ul = document.getElementById("cList");
        let table = document.createElement("table");
        let myLi = JSON.parse(this.responseText);
        for(i = 0; i < myLi.length; i++){
              let row = document.createElement("tr");
              row.innerHTML = "<td>" + myLi[i].document_name + "</td>" + "<td>" + myLi[i].document_description + "</td>" + "<td>" + Object.values(myLi[i].document_tags) + "</td>";
              ul.appendChild(table);
              table.appendChild(row);
            }              
editRow = () => {
    document.getElementById("modifyForm").style.display = "block";
    for(i = 0; i < myLi.length; i++){
        txtField.setAttribute("type", "text");
        txtField.value = myLi[i].document_name;
        modifyForm.appendChild(txtField);
        }
    
}
let txtField = document.createElement("input");
 addRow = () => {
    document.getElementById("modifyForm").style.display = "block";
    for(i = 0; i < myLi.length; i++){
        txtField.setAttribute("type", "text");
        modifyForm.appendChild(txtField);
        }
}
}
function exitBtn(){
    document.getElementById("modifyForm").style.display = "none";

}

function srcBar(){
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