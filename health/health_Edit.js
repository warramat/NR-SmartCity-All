const M = [
  'มกราคม',
  'กุมภาพันธ์',
  'มีนาคม',
  'เมษายน',
  'พฤษภาคม',
  'มิถุนายน',
  'กรกฏาคม',
  'สิงหาคม',
  'กันยายน',
  'ตุลาคม',
  'พฤศจิกายน',
  'ธันวาคม'
];

liff.init({ liffId: '2000414439-BvmeyznD' }).then(async () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://nr-smartcity-all.netlify.app/health/health_Edit.html'
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


/*******************************เพิ่มข้อมูลเข้า ลำดับแรก************************** */
$('form').submit(function (e) {
  const today = new Date();
  e.preventDefault();
  if (Script_checkID($('#cardID').val())) {
    Swal.fire({
      icon: 'question',
      title: 'ยืนยันการบันทึกข้อมูล',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ยืนยัน',
      denyButtonText: 'ยกเลิก'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {};
        var UID = await getUID();
        data.userID = UID;
        $('form')
          .serializeArray()
          .forEach((e) => {
            data[e.name] = e.value;
          });
        if (Number($('#year').val()) - 543 - today.getFullYear() >= 60) {
          data.elderly = 'เป็น';
        } else {
          data.elderly = 'ไม่เป็น';
        }
        console.log(data);
        fetch(
          'https://nr-api-smartcity-final.onrender.com/disease/adddisease',
          {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          }
        ).then(function (response) {
          Swal.fire({
            icon: 'success',
            title: 'บันทึกข้อมูลเสร็จสิ้น',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: 'ตกลง',
            timer: 3000
          }).then(async (result) => {
            location.reload();
          });
        });
      }
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง',
      showDenyButton: false,
      showCancelButton: false,
      confirmButtonText: 'ตกลง',
      timer: 3000
    });
  }
});

/**************************แก้ไข*********************************** */
async function load() {
  const list = [
    'bedridden_patient',
    'handicapped',
    'congenital_disease',
    'diabetes',
    'lung_disease',
    'kidney_disease',
    'immunodeficiency',
    'liver_disease',
    'migraine',
    'high_blood',
    'thalassemia',
    'heart_disease',
    'allergy',
    'epilepsy'
  ];
  const UID = await getUID();
  const data = await (
    await fetch(
      'https://nr-api-smartcity-final.onrender.com/disease/find/data?userID=' +
        UID
    )
  ).json();
  console.log(data.data);
  if (data.total > 0) {
    const D = new Date();
    let html = '';
    const row = data.data[0];
    $('#cardID').val(row.cardID);
    $('#hospital').val(row.hospital);
    $('#other').val(row.other);
    $('#day').val(row.day);
    $('#month').val(row.month);
    $('#year').val(row.year);

  } 
}
