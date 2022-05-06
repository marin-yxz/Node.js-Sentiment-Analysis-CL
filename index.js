import fetch from 'node-fetch';

let i = 2;
const userInput = process.argv;
if (userInput.length > 2) {
  const finalUser = [];
  for (i; i < userInput.length; i++) {
    finalUser[i] = process.argv[i];
  }
  const withSpaces = finalUser.join(' ');
  fetch('http://text-processing.com/api/sentiment/', {
    method: 'post',
    body: `text=${withSpaces}`,
    headers: { 'Content-Type': 'aplication/text' },
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(
        'negativity is ' + Math.round(json.probability.neg * 100) + '%',
      );
      console.log(
        'positivity is ' + Math.round(json.probability.pos * 100) + '%',
      );
      console.log(
        'neutrality is ' + Math.round(json.probability.neutral * 100) + '%',
      );
      console.log('overall:' + json.label);
      return json;
    })
    .catch((error) => {
      console.log(error);
    });
} else {
  console.log('enter valid text next time');
}
