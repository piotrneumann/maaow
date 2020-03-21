const WebPageTest = require("webpagetest");
const wpt = new WebPageTest("www.webpagetest.org");

let options = {
    "key": "A.8accedfc59e91daf4c17874479bd5c52",
    "firstViewOnly": true,
    "runs": 3
};

let id;
console.log("1")
wpt.runTest("https://przyprawytobago.pl", options, (err, result) => {

    // The test ID is returned in the response here:
    this.id = result.data.testId;
    console.log(err || result);
    console.log(this.id)

    wpt.getTestStatus(this.id, (err, res) => {
        console.log(err || res);
    });

});

// console.log(this.id)
// console.log("2")
// wpt.getTestStatus(this.id, (err, res) => {
//     console.log(err || res);
// });

