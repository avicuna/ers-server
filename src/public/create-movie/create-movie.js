console.log('loading js');
function createReimb(event) {
  event.preventDefault();

  const userInfo = JSON.parse(localStorage.getItem('user'));
  let reimbSubmitted = new Date();
  let dd = reimbSubmitted.getDate();
  let mm = reimbSubmitted.getMonth() + 1;  //January is 0!
    let yyyy = reimbSubmitted.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    reimbSubmitted = mm + '/' + dd + '/' + yyyy;

  const reimbAmount = document.getElementById('input-amount').value;
  const reimbDescription = document.getElementById('input-description').value;
  const reimbAuthor = userInfo.userRoleId;
  let reimbTypeId = document.getElementById('sel1').value;
  switch (reimbTypeId) {
      case 'Lodging':
        reimbTypeId = 1;
        break;
      case 'Travel':
        reimbTypeId = 2;
        break;
      case 'Food':
        reimbTypeId = 3;
        break;
      case 'Other':
        reimbTypeId = 4;
        break;
  }

  const reimb = {
    reimbAmount,
    reimbSubmitted,
    reimbDescription,
    reimbAuthor,
    reimbTypeId
  }
  
  fetch('http://localhost:9001/reimbursements', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reimb)
  })
  .then(resp => resp.json())
  .then(resp => {
    window.location = 'http://localhost:9001/home/home.html';
  })
  .catch(err => {
    console.log(err);
  });
}