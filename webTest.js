const WebPageTest = require("webpagetest");
const wpt = new WebPageTest("www.webpagetest.org");

let options = {
    key: "A.8accedfc59e91daf4c17874479bd5c52",
    firstViewOnly: true,
    runs: 1,
    pollResults: 5,
};

let id;

// wpt.runTest("https://przyprawytobago.pl", options, (err, result) => {
//
//     // The test ID is returned in the response here:
//     this.id = result.data.testId;
//     console.log(err || result);
//     console.log(this.id)
//
//     wpt.getTestResults(this.id, (err, res) => {
//         console.log(err || res);
//     });
// });

wpt.runTest('https://przyprawytobago.pl', options, function processTestResult(err, result) {
    // First view — use `repeatView` for repeat view
    console.log('Load time:', result.data.average.firstView.loadTime)
    console.log('First byte:', result.data.average.firstView.TTFB)
    console.log('Start render:', result.data.average.firstView.render)
    console.log('Speed Index:', result.data.average.firstView.SpeedIndex)
    console.log('DOM elements:', result.data.average.firstView.domElements)

    console.log('(Doc complete) Requests:', result.data.average.firstView.requestsDoc)
    console.log('(Doc complete) Bytes in:', result.data.average.firstView.bytesInDoc)

    console.log('(Fully loaded) Time:', result.data.average.firstView.fullyLoaded)
    console.log('(Fully loaded) Requests:', result.data.average.firstView.requestsFull)
    console.log('(Fully loaded) Bytes in:', result.data.average.firstView.bytesIn)

    console.log('Waterfall view:', result.data.runs[1].firstView.images.waterfall)
})
