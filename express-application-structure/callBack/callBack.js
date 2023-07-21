getUserId("Abdullah", (userName) => {

    getRepos(userName, (repo) => {
        console.log(userName, "are ", repo);
    });
});

function getUserId(params, callBack) {
    setTimeout(() => {
        callBack(params);
    }, 2000);
}

function getRepos(userName, callBack) {
    setTimeout(() => {
        callBack(["repo1", "repo2"]);
    }, 2000);
}


 
// getUserId("Abdullah", callBackgetUserId);

// function callBackgetUserId(userName){
//     getRepos(userName,callBackRepos)
// }

// function callBackRepos(userName,repos){
// console.log(repos,userName);
// }


// function getUserId(params, callBack) {
//     setTimeout(() => {
//         callBack(params);
//     }, 2000);
// }


// function getRepos(userName, callBack) {
//     setTimeout(() => {
//         callBack(userName,["repo1", "repo2"]);
//     }, 2000);
// }




