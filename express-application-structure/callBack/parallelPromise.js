// function getUserId(userName) {
//     return new Promise((resolve, reject) => {
//       resolve(userName);
//     }
//     );
//   }

const p1 = new Promise((resolve, reject) => {
  resolve("Abdullah");
});
const p2 = new Promise((resolve, reject) => {
  const obj = {
    userName: "Abdullah",
    repos: ["repo1", "repo2"],
  };
  resolve(obj);
});
const p3 = new Promise((resolve, reject) => {
  reject(new Error("New Error Message"));
});

//   function getRepos(userName) {
//     return new Promise((resolve, reject) => {
//       const obj = {
//         userName,
//         repos: ["repo1", "repo2"],
//       };
//       resolve(obj);
//     });
//   }

Promise.all([p1, p2]).then((result) => console.log(result));
// if both the promise are succefull then this will give result else give error if fail any
Promise.race([p1, p3]).then((result) => console.log(result));
//if any one got succeeded give result

function getCustomer(id) {
  return {
    id: id,
    name: "Atif",
    values: ["a1", "a2"],
    email: "abc@k.com",
    isGold: true,
  };
}

function getTopMovies(movies) {
  return movies;
}
function sendEmail(email, movies) {
  return { email, movies };
}

async function callMovies() {
  const customer = await getCustomer(1);

  if (customer.isGold) {
    const movies = await getTopMovies(["Name", "abc"]);
    const email = await sendEmail(customer.email, movies);
    console.log("final====", email);
  }
}
callMovies();
