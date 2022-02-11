
chrome.tabs.executeScript(tabs[0].id, {file: "content.js"});

chrome.webRequest.onBeforeSendHeaders.addEventListener(changeCookies, {
        urls: ["<all_urls>"],
        types: ["main_frame"], },
    ["requestHeaders", "blocking", "extraHeaders"]
);

function changeCookies(details) {
    details.requestHeaders = details.requestHeaders.filter(header => {
        if (header.name === "Referer") {
            return false;
        }
    })

    details.requestHeaders.push({
        "name": "Referer",
        "value": "https://t.co/"
    })

    console.log("Changed request header to Twitter");

    let requestHeadersObject = {
        requestHeaders: details.requestHeaders
    };

    return requestHeadersObject;
}
