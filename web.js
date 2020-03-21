const WebPageTest = require("webpagetest");
const wpt = new WebPageTest("www.webpagetest.org");
const urlPageUnderTest = "https://przyprawytobago.pl";

//1st tool - WebPageTest
let options = {
    "key": "A.8accedfc59e91daf4c17874479bd5c52",
    "firstViewOnly": true,
    "runs": 3
};

let id;
console.log("1")
wpt.runTest(urlPageUnderTest, options, (err, result) => {

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


// 2nd tool - GTMetrix
const gtmetrix = require('gtmetrix')({
    email: 'valadin96@gmail.com',
    apikey: '245330406ecb8c5e54e8348bd6420277',
    timeout: 10000
});
const fs = require('fs');
const locationParam = 2; //1-Vancouver, 2-London, 3-Sydney, 4-Dallas, 5-Mumbay, 6-Sao Paulo, 7-Hong Kong

function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hour = date.getHours();
    const min = date.getMinutes();
    return `${year}-${month}-${day}_${hour}-${min}`
}

function runGTMetrix(page, locationNumber) {
    const test = {
        url: page,
        location: locationNumber,
        browser: 3
    }

    gtmetrix.test.create(test).then(data => {
        gtmetrix.test.get(data.test_id, 5000, console.log);
        gtmetrix.test.get(data.test_id, 5000).then(data =>
            fs.writeFile(__dirname + `/result_${getDateString()}_loc_${locationParam}.json`, JSON.stringify(data), console.log));
    })
}

runGTMetrix(urlPageUnderTest, locationParam);






