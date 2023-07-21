// const pr = new Promise((resolve, reject) => {
//   // console.log(new Error('message'));
//   resolve(1);
//   reject(new Error("message"));
// });

// pr.then((result) => console.log(result)).catch((err) =>
//   console.log(err.message)
// );

getUserId("Abdullah", (userName) => {
  getRepos(userName, (repo) => {
    console.log(userName, "are ", repo);
  });
});

function getUserId(userName) {
  return new Promise((resolve, reject) => {
    resolve(userName);
  });
}

function getRepos(userName) {
  return new Promise((resolve, reject) => {
    const obj = {
      userName,
      repos: ["repo1", "repo2"],
    };
    resolve(obj);
  });
}
//changing call back hell to use the promise
getUserId("Abdullah")
  .then((userName) => getRepos(userName))
  .then((result) => console.log(result));
