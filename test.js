function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://nr-smartcity.onrender.com/User-admin/adminAll");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['name']+'</td>';
          trHTML += '<td>'+object['userid']+'</td>';
        //   trHTML += '<td>'+object['password']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox('+object['_id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['_id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();


  /************************************* CREATE*************************************************** */

  function showUserCreateBox() {
    Swal.fire({
      title: 'เพิ่มผู้ใช้งาน',
      html:
        '<input id="id" type="hidden">' +
        '<input id="name" class="swal2-input" placeholder="ชื่อจริง-นามสกุล">' +
        '<input id="userid" class="swal2-input" placeholder="ชื่อผู้ใช้งาน">' +
        '<input id="password" class="swal2-input" placeholder="รหัสผ่าน">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  function userCreate() {
    const name = document.getElementById("name").value;
    const userid = document.getElementById("userid").value;
    const password = document.getElementById("password").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://nr-smartcity.onrender.com/User-admin/Cre-Admin");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "name": name, "userid": userid, "password": password, 
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }

/***************************************** UPDATE ******************************************************** */
function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://www.melivecode.com/api/users/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['user'];
        console.log(user);
        Swal.fire({
          title: 'Edit User',
          html:
            '<input id="id" type="hidden" value='+user['id']+'>' +
            '<input id="fname" class="swal2-input" placeholder="First" value="'+user['fname']+'">' +
            '<input id="lname" class="swal2-input" placeholder="Last" value="'+user['lname']+'">' +
            '<input id="username" class="swal2-input" placeholder="Username" value="'+user['username']+'">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="'+user['email']+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
  }
  
  function userEdit() {
    const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://www.melivecode.com/api/users/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "fname": fname, "lname": lname, "username": username, "email": email, 
      "avatar": "https://www.melivecode.com/users/cat.png"
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
}


/***************************************** DELETE *********************************************** */
function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://www.melivecode.com/api/users/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
  }