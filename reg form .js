
  const firebaseConfig = {
    apiKey: "AIzaSyAEDLWKuB9zqbyfH6xkeq5UN3ipO3LvKJI",
    authDomain: "registration-form-9e2f7.firebaseapp.com",
    projectId: "registration-form-9e2f7", //firebase configuration
    storageBucket: "registration-form-9e2f7.appspot.com",
    messagingSenderId: "694020116750",
    appId: "1:694020116750:web:1325bf23e36f337d00c75f"

  };

  firebase.initializeApp(firebaseConfig);

  function showDB() {
    document.getElementById("bdy").innerHTML = ""
    firebase.database().ref(`/Registration`).once("value", function (AllRecord) {
      AllRecord.forEach(function (snapshot) {
        addItemOnTable(snapshot.val().Name, snapshot.val().Password, snapshot.val().ID, snapshot.val().Address)
      })
    })

  }

  function save() {
    id = document.getElementById("txtId").value
    name = document.getElementById("txtName").value
    pass = document.getElementById("txtPassword").value //taking values in variables
    address = document.getElementById("txtAddress").value

    const obj = {
      ID: id,
      Name: name,
      Password: pass,
      Address: address
    }

    firebase.database().ref(`/Registration/` + id).set(obj); //firebase key connection
    alert("This id is saved in database")
    showDB()

    // addItemOnTable(id, name, pass, address)

  }

  function updateDB() {
    id = document.getElementById("txtIdLog").value
    name = document.getElementById("txtNameLog").value
    pass = document.getElementById("txtPasswordLog").value //taking values in variables
    address = document.getElementById("txtAddressLog").value
    

    const obj = {
      ID: id,
      Name: name,
      Password: pass, //creating object 
      Address: address
    }

    firebase.database().ref(`/Registration/` + id).update(obj); //appending and updating obj

    alert("This id is updated in database")

    showDB()
  }

  function resetDB() {
    id = document.getElementById("txtIdLog").value
    firebase.database().ref(`/Registration/` + id).remove();
    alert("This id is deleted from database")

    showDB()
  }
  // function del(OButton) {
  //   delRow = OButton.parentNode.parentNode //delete button present in row
  // id = delRow.cells[3].childNodes[0].innerHTML;
  // firebase.database().ref(`/Registration/` + id).remove();
  
  // }
  function del(OButton)
  {
           // OButton.parentNode.parentNode.style.display="none"
           row=OButton.parentNode.parentNode
         
         cells = row.getElementsByTagName("td") //select all feature
         id = cells[3].innerHTML
         firebase.database().ref(`/Registration/` + id).remove();
   
      
         showDB()     
  }

  function addItemOnTable(name, pass, id, address) {

    row = document.createElement("tr")
    cell = document.createElement("td")
    cell1 = document.createElement("td")
    cell2 = document.createElement("td") //creating elements
    cell3 = document.createElement("td")
    cell4 = document.createElement("td")
    cell5 = document.createElement("td")

    btnDelete = document.createElement("input")
    btnDelete.setAttribute("type", "button")
    btnDelete.setAttribute("value", "Delete")                              //creating delete button
    btnDelete.setAttribute("onclick", "del(this)")

    textName = document.createElement("span")
    textName.style.height = "100%"                                   //span tag for cell 1
    textName.style.width = "100%"
    textName.setAttribute("ondblclick", "editName(this)")
    textName.innerHTML = name

    textArea = document.createElement("textArea")
    textArea.style.height = "100%"
    textArea.style.width = "100%"
    textArea.style.background = "none"                             //text area tag for cell 1
    textArea.style.display = "none"

    btnEdit = document.createElement("input")
    btnEdit.setAttribute("type", "button")
    btnEdit.setAttribute("value", "Update")                         //creating update button
    btnEdit.setAttribute("onclick", "update(this)")

    btnSelect = document.createElement("input")
    btnSelect.setAttribute("type", "checkbox")                            //creating select button for every row

    cell.appendChild(btnSelect)
    cell1.appendChild(textName)
    cell1.appendChild(textArea)
    cell2.innerHTML = pass                             //assigning values to created  elements
    cell3.innerHTML = id
    cell4.innerHTML = address
    cell5.appendChild(btnEdit)
    cell5.appendChild(btnDelete)

    row.appendChild(cell)
    row.appendChild(cell1)
    row.appendChild(cell2)                                    //appending data into row
    row.appendChild(cell3)
    row.appendChild(cell4)
    row.appendChild(cell5)


    document.getElementById("bdy").appendChild(row)               //appneding row into body


    document.getElementById("txtName").value = "";
    document.getElementById("txtPassword").value = "";
    document.getElementById("txtId").value = "";
    document.getElementById("txtAddress").value = "";
  }



  function set() {
    if (document.getElementById("chk").checked == true) {
      // select all checkbox
      row = document.getElementById("bdy").getElementsByTagName("tr")
      for (i = 0; i < row.length; i++) {
        cells = row[i].getElementsByTagName("td") //select all feature
        ck = cells[0].getElementsByTagName("input")
        ck[0].checked = true
      }

    } else {
      // deselect all checkbox
      rows = document.getElementById("bdy").getElementsByTagName("tr")
      for (i = 0; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName("td")
        ck = cells[0].getElementsByTagName("input")
        ck[0].checked = false
      }
    }

  }

  function selectDel() {
    rows = document.getElementById("bdy").getElementsByTagName("tr")
    //select all -delete button
    for (i = 0; i < rows.length; i++) {
      cells = rows[i].getElementsByTagName("td")
      ck = cells[0].getElementsByTagName("input")
      if (ck[0].checked == true) {
        rows[i].style.display = "none"
      }
    }
  }

  function editName(OButton) {
    row = OButton.parentNode.parentNode
    row.cells[1].childNodes[1].value = row.cells[1].childNodes[0].innerHTML
    row.cells[1].childNodes[1].style.display = "block" //edit on double click
    row.cells[1].childNodes[0].style.display = "none"

  }

  function update(OButton) {
    row = OButton.parentNode.parentNode;
    row.cells[1].childNodes[0].innerHTML = row.cells[1].childNodes[1].value
    row.cells[1].childNodes[0].style.display = "block" //chnage value after editing
    row.cells[1].childNodes[1].style.display = "none"
  }

//   setTimeout(function() {
//     document.getElementById("splash").style.display = "none";
// }, 2000);


function accessReg(){
  document.getElementById("accessRegister").style.display="block"
  document.getElementById("accessTable").style.display="none"
  document.getElementById("accessLogin").style.display="none"

}
function accessTab(){
  
    document.getElementById("accessTable").style.display="block"
    document.getElementById("accessRegister").style.display="none"
    document.getElementById("accessLogin").style.display="none"
  
  }
  function accessLogin(){
  
    document.getElementById("accessTable").style.display="none"
    document.getElementById("accessRegister").style.display="none"
    document.getElementById("accessLogin").style.display="block"
  
  }

  function login(){
    document.getElementById("bdy").innerHTML="";

    id = document.getElementById("txtIdLogin").value
    password = document.getElementById("txtPasswordLogin").value
    firebase.database().ref(`/Registration/`+id).on("value",function(snapshot){
      if(snapshot.val().ID!=id){
        alert("wrong id")
      }
      else{
        if(snapshot.val().Password==password){
          
          accessTab()
          }
          else
          {
            alert("Wrong password");
          }
      }
    })
    showDB()
  }