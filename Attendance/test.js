// function loadDoc() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onload = function () {
//     document.getElementById('demo').innerHTML = this.responseText;
//   };
//   xhttp.open('POST', 'demo_post2.asp');
//   xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//   xhttp.send('fname=Henry&lname=Ford');
// }

// loadDoc()

// function loadDoc() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onload = function () {
//     document.getElementById('demo').innerHTML = this.responseText;
//   };
//   xhttp.open('GET', 'http://172.25.176.1:3000/');
//   xhttp.send();
// }

function loadDoc() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://172.25.176.1:3000/login');

    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };

    var data = `{
  "userID": "ddgg",
  "password": "Jason Sweet",
}`;

    xhr.send(data);
}
// loadDoc();
