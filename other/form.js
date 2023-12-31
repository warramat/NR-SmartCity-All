liff.init({ liffId: '2000414439-BvmeyznD' }).then(async () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://nr-smartcity-all.netlify.app/other/form.html'
    });
  } else if (!(await checkUser(await getUID()))) {
    window.location = '../register.html';
  } else if (!(await getFriend())) {
    window.location = 'https://line.me/R/ti/p/@406svlcs';
  } else {
    document.getElementById('show').style.visibility = 'visible';
  }
});

async function getFriend() {
  const friend = await liff.getFriendship();
  return friend.friendFlag;
}
async function getUID() {
  const data = await liff.getProfile();
  const uid = await data.userId;
  return uid;
}

$(document).ready(async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let data = await fetch(
    'https://nr-api-smartcity-final.onrender.com/petition/search?topic=',
    requestOptions
  );
  data = await data.json();
  let html = '';
  $('#topic').text();
  data.type.forEach((element) => {
    html += `<option value="${element}">${element}</option>`;
  });
  $('#choice1').append(html);
});

$('form').submit((e) => {
  e.preventDefault();
  Swal.fire({
    icon: 'question',
    title: 'ยืนยันการยื่นคำร้อง',
    showDenyButton: true,
    showCancelButton: false,
    confirmButtonText: 'ยืนยัน',
    denyButtonText: 'ยกเลิก'
  }).then(async (result) => {
    if (result.isConfirmed) {
      let data = await petition();
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify(data);
      console.log(raw);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(
        // 'https://smartcity-pakpoon.herokuapp.com/appeal/addappeal',
        'https://nr-api-smartcity-final.onrender.com/protest/addprotest',
        requestOptions
      )
        .then(() => {
          Swal.fire('แจ้งเรื่องสำเร็จ', '', 'success');
          location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
});

/*************************************************** */

async function petition() {
  let data = {
    type: $('#choice1').val(),
    topic: 'other',
    userID: await getUID()
  };
  return data;
}
