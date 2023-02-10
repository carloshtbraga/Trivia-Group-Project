export async function getUserToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = response.json();
  return data;
}

// export async function getGravatar(mailHash) {
//   const url = `https://www.gravatar.com/avatar/${mailHash}`;
//   const response = await fetch(url);
//   const data = response.json();
//   return data;
// }
