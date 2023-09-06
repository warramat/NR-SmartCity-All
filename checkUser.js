let baseURL = `https://nr-api-smartcity-final.onrender.com/userSmart/user/searchUserID`;
async function checkUser(userId) {
  const res = await fetch(`${baseURL}?userID=${userId}`);
  return res.status === 200;
}
