/*
Contact constructor
*/
function contact() {
    this.body = document.getElementsByTagName('body')[0];
    this.contacts = [];  
    this.init();  
}

//Intiliaze templates
contact.prototype.init = function () {

    this.body.innerHTML+=this.createAddFormTemplate();
    this.body.innerHTML+=this.createEditFormTemplate();
    this.body.innerHTML+=this.createCounterTemplate();
    this.body.innerHTML+=this.createContactListTemplate();

    this.contactForm = document.getElementById("myForm");
    this.editForm = document.getElementById("saveEdit");
    this.counter = document.getElementById('counter');
    this.contactsList = document.getElementById('contacts');

}

//On click of add button
contact.prototype.addContact = function () {
    var elements = this.contactForm.elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
	this.contacts.push(obj);
	this.getAllContacts();
	this.contactForm.reset();
}

//On click of delete button
contact.prototype.removeContact = function (item) {
 this.contacts.splice(item, 1);
 this.getAllContacts();
}

//On click of edit button
contact.prototype.editContact = function (dataIndex) {
    var self = this;
    this.dataIndex = dataIndex;
    this.deleteButton = document.getElementById("deleteBtn");
    this.deleteButton.disabled = true;
   
    for(var keys in this.contacts[dataIndex]){
     if(keys){
      var values = this.contacts[dataIndex][keys];
        document.getElementById('edit-'+keys).value =values;
     }
    }

    // Display fields
    this.editForm.style.display = 'block';
    this.contactForm.style.display = 'none';

    this.editForm.addEventListener("submit", this.updateContact.bind(this));
   
}

//On click of udpate button
contact.prototype.updateContact = function () {
    var self = this;
    var obj ={};
    for(var i = 0 ; i < this.editForm.elements.length ; i++){
        var item = this.editForm.elements.item(i);
        if(item.name)
        obj[item.name] = item.value;
    }
    

      if (obj) {
        // Edit value
        self.contacts[self.dataIndex] = obj;
        // Display the new list
        self.getAllContacts();
        // Hide fields
        self.closeInput();
      }
}

//Fetch all contacts
contact.prototype.getAllContacts = function () {  
        var data = '';
        if (this.contacts.length > 0) {
          for (i = 0; i < this.contacts.length; i++) {
            data += '<tr>';
            data += '<td>' + this.contacts[i].firstname + '</td>';
            data += '<td>' + this.contacts[i].lastname + '</td>';
            data += '<td>' + this.contacts[i].email + '</td>';
            data += '<td>' + this.contacts[i].phone + '</td>';
            data += '<td>' + this.contacts[i].status + '</td>';
            data += '<td><button onclick="app.editContact(' + i + ')">Edit</button></td>';
            data += '<td><button id="deleteBtn" onclick="app.removeContact(' + i + ')">Delete</button></td>';
            data += '</tr>';
          }
        }
        this.count(this.contacts.length);
        return this.contactsList.innerHTML = data;
}

//Return Add form template
contact.prototype.createAddFormTemplate = function () {
    return `
    <form action="javascript:void(0);" method="POST" onsubmit="app.addContact()" id="myForm"> 
    <input type="text" id="add-name" name="firstname" placeholder="First Name" required autofocus title="Please enter First name." >
    <input type="text" id="add-lastname" name="lastname" placeholder="Last Name" required>
    <input type="email" id="add-email" name="email" placeholder="Email" required>
    <input type="number" id="add-phone" name="phone" placeholder="Phone Number" required>
    <input type="text" id="add-status" name="status" placeholder="Status" required>
    <input type="submit" value="Add">
    </form> `
}


//Return edit form template
contact.prototype.createEditFormTemplate = function () {
    return `
    <form action="javascript:void(0);" method="POST" id="saveEdit" class="spoiler" role="aria-hidden">
    <input type="text" id="edit-firstname" name="firstname" placeholder="First Name" required>
    <input type="text" id="edit-lastname" name="lastname" placeholder="Last Name" required>
    <input type="email" id="edit-email" name="email" placeholder="Email" required>
    <input type="number" id="edit-phone" name="phone" placeholder="Phone Number" required>
    <input type="text" id="edit-status" name="status" placeholder="Status" required>
    <input type="submit" value="Edit" /> <a onclick="app.closeInput()" aria-label="Close">&#10006;</a>
  </form>`
}

//Return counter template
contact.prototype.createCounterTemplate = function(){
    return `
    <p id="counter"></p>
    `
}

///Return contact list template
contact.prototype.createContactListTemplate = function(){
    return `
    <table>
        <tr>
            <th>Contact list</th>
        </tr>
        <tbody id="contacts">
        </tbody>
    </table>
    `
}

//Counter will maintained
contact.prototype.count = function(data) {
    var name = 'contact';
    if (data) {
      if (data > 1) {
        name = 'contacts';
      }
        this.counter.innerHTML = data + ' ' + name ;
    } else {
        this.counter.innerHTML = 'No ' + name;
    }
  };
  
//Form visiblity maintiend
contact.prototype.closeInput = function() {
    document.getElementById('saveEdit').style.display = 'none';
    document.getElementById("myForm").style.display = 'block';
    document.getElementById("deleteBtn").disabled = false;
}
