const WebPageTest = require("webpagetest");
const wpt = new WebPageTest("www.webpagetest.org");
const fs = require('fs');

const gtmetrix = require('gtmetrix')({
    email: 'valadin096@gmail.com',
    apikey: '4af0304206182860bd7fda9fb6b79299',
    timeout: 10000
});

const urlPageUnderTest = ["https://przyprawytobago.pl", "https://www.x-kom.pl", "https://www.amazon.com"];
const locationParam1 = [
    {
        id: 2,
        loc: "London",
        name: "London_EC2"
    },
    {
        id: 3,
        loc: "Sydney",
        name: "ec2-ap-southeast-2"
    }, 
    {
        id: 6,
        loc: "Sao Paulo",
        name: "ec2-sa-east-1"
    } 
];
//1-Vancouver, 2-London, 3-Sydney, 4-Dallas, 5-Mumbay, 6-Sao Paulo, 7-Hong Kong


for (let i = 0; i < urlPageUnderTest.length; i++) {
    for (let j = 0; j < locationParam1.length; j++) {
       runGTMetrix(urlPageUnderTest[i], locationParam1[j]);
        runWebPageTest(urlPageUnderTest[i], locationParam1[j]);
    }
}
// runWebPageTest(urlPageUnderTest[0], locationParam1[2]);


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
        location: locationNumber.id,
        browser: 3
    }

    gtmetrix.test.create(test).then(data => {
        gtmetrix.test.get(data.test_id, 5000);
        gtmetrix.test.get(data.test_id, 5000).then(data =>
            fs.writeFile(__dirname + `/result_gtmetrix_${getDateString()}_loc_${locationNumber.loc}_page_${test.url.substring(8)}.json`, JSON.stringify(data), console.log));
    })
}

function runWebPageTest(page, location) {

    let options = {
        key: "A.8accedfc59e91daf4c17874479bd5c52",
        firstViewOnly: true,
        runs: 1,
        pollResults: 5,
        location: location.name,
    };
    wpt.runTest(page, options, function processTestResult(err, result) {
            console.log(err || result);
            // First view — use `repeatView` for repeat view

            const loadTime = result.data.average.firstView.loadTime;
            const firstByte = result.data.average.firstView.TTFB
            const startRender = result.data.average.firstView.render
            const speedIndex = result.data.average.firstView.SpeedIndex
            const domElements = result.data.average.firstView.domElements
            const Docrequests = result.data.average.firstView.requestsDoc
            const DocbytesIn = result.data.average.firstView.bytesInDoc
            const FLtime = result.data.average.firstView.fullyLoaded
            const FLrequests = result.data.average.firstView.requestsFull
            const FLbytesIn = result.data.average.firstView.bytesIn

            console.log('Load time:', loadTime)
            console.log('First byte:', firstByte)
            console.log('Start render:', startRender)
            console.log('Speed Index:', speedIndex)
            console.log('DOM elements:', domElements)

            console.log('(Doc complete) Requests:', Docrequests)
            console.log('(Doc complete) Bytes in:', DocbytesIn)

            console.log('(Fully loaded) Time:', FLtime)
            console.log('(Fully loaded) Requests:', FLrequests)
            console.log('(Fully loaded) Bytes in:', FLbytesIn)
            console.log('Waterfall view:', result.data.runs[1].firstView.images.waterfall)
            let data = "loadTime,firstByte,startRender,speedIndex,domElements,Docrequests,DocbytesIn,FLtime,FLrequests,FLbytesIn\n";
            data += loadTime + "," + firstByte + "," + startRender + "," + speedIndex + "," + domElements + "," + Docrequests + "," + DocbytesIn + "," + FLtime + "," + FLrequests + "," + FLbytesIn;
            fs.writeFile(__dirname + `/result_WebPageTest_${getDateString()}_loc_${location.loc}_page_${page.substring(8)}.json`, data, console.log)
        }
    )
}




