var oReq = new XMLHttpRequest();
function listLoad(e){
  console.log(this);
    let ul = document.getElementById("sList");
    let myLi = JSON.parse(this.responseText);
  for(i = 0; i < myLi.length; i++){
        var li = document.createElement("li");
        li.innerHTML = myLi[i].first_name;
        ul.appendChild(li);
    }
}
  oReq.addEventListener("load", listLoad);
  oReq.open("GET", "/api/users");
  oReq.send();

function srcBar(){
    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("sideSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("sList");
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