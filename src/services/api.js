export async function getUserToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = response.json();
  return data;
}

export async function getQuestion(token) {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
}
