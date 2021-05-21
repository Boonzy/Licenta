var oReq = new XMLHttpRequest();
var olReq = new XMLHttpRequest();
function listLoad(e){
  console.log(this);
    let ul = document.getElementById("cList");
    let myLi = JSON.parse(this.responseText);
  for(i = 0; i < myLi.length; i++){
        let li = document.createElement("li");
        li.innerHTML = myLi[i].first_name;
        ul.appendChild(li);
    }
}
function listTags(e){
    console.log(this);
    let x;
    let sul = document.getElementById("sList");
    let mySli = JSON.parse(this.responseText);
    for(i = 0; i < mySli.length; i++){
          let sli = document.createElement("li");
          sli.innerHTML = mySli[i].tag_name;
          sul.appendChild(sli);
    
    for(j = 0; j < mySli[i].tag_name.length; j++){
        let vli = document.createElement("li");
        vli.innerHTML = mySli[i].tag_values[j];
        sli.appendChild(vli);
        }
    }
} 
  oReq.addEventListener("load", listLoad);
  olReq.addEventListener("load", listTags);
  oReq.open("GET", "/api/users");
  olReq.open("GET", "/api/tags");
  oReq.send();
  olReq.send();

function srcBar(){
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("contentSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("cList");
    li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].classList.remove("hidden");
    } else {
      li[i].classList.add("hidden");
    }
  }
}