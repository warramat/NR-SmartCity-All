liff.init({ liffId: '2000414439-BvmeyznD' }).then(async () => {
  if (!liff.isLoggedIn()) {
    liff.login({
      redirectUri: 'https://nr-smartcity.onrender.com/health'
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
