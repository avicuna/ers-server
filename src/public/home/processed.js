const userInfo = JSON.parse(localStorage.getItem('user'));
console.log(userInfo);
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}

today = mm + '/' + dd + '/' + yyyy;
console.log(today);
console.log("The current user's role id is: " + userInfo.userRoleId);

function addMovieToTable(reimb) {
    let reimbType;
    let reimbStatus;
    switch (reimb.reimbTypeId) {
        case 1:
            reimbType = "Lodging";
            break;
        case 2:
            reimbType = "Travel";
            break;
        case 3:
            reimbType = "Food";
            break;
        case 4:
            reimbType = "Other";
            break;
    }

    switch (reimb.reimbStatusId) {
        case 1:
            reimbStatus = "Pending";
            break;
        case 2:
            reimbStatus = "Accepted";
            break;
        case 3:
            reimbStatus = "Denied";
            break;
    }
    const tbody = document.getElementById('movie-table-body');
    tbody.innerHTML += `
  <tr>
    <th scope="row">${reimb.id}</th>
    <td>$${reimb.reimbAmount}</td>
    <td>${reimb.reimbSubmitted}</td>
    <td>${reimb.reimbResolved}</td>  
    <td>${reimb.reimbDescription}</td>
    <td>${reimbType}</td>
    <td>${reimbStatus}</td>
  </tr>
  `
}

fetch(`http://localhost:9001/reimbursements/${userInfo.id}`)
    .then(res => res.json())
    .then(res => {
        res.forEach(reimb => {
            if(reimb.reimbStatusId !== 1) {
                addMovieToTable(reimb);
            }
        })
    })
    .catch(err => {
        console.log(err);
    });