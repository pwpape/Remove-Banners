
chrome.tabs.executeScript(tabs[0].id, { file: "content.js" });

// https://medium.datadriveninvestor.com/how-to-bypass-any-paywall-for-free-df87832cbff7

// I don't think the below work.  I'm keeping them in here for reference, but could probably comment them out

chrome.webRequest.onBeforeSendHeaders.addListener(changeCookies, {
        urls: ["<all_urls>"],
        types: ["main_frame"], },
    ["requestHeaders", "blocking", "extraHeaders"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(spoofCrawler, {
        urls: ["<all_urls>"],
        types: ["main_frame"], },
    ["requestHeaders", "blocking", "extraHeaders"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(disableCookies, {
        urls: ["<all_urls>"],
        types: ["main_frame"], },
    ["requestHeaders", "blocking", "extraHeaders"]
);

function changeCookies(details) {
    details.requestHeaders = details.requestHeaders.filter(header => {
        if (header.name === "Referer") {
            return false;
        }
    });

    details.requestHeaders.push({
        "name": "Referer",
        "value": "https://t.co/"
    });

    console.log("Changed request header to Twitter");

    let requestHeadersObject = {
        requestHeaders: details.requestHeaders
    };

    return requestHeadersObject;
}

function spoofCrawler(details) {
    // Spoof our device as a Google Crawler

    var google_adbot_UA = "AdsBot-Google (+http://www.google.com/adsbot.html)";

    details.requestHeaders = details.requestHeaders.filter(function(header) {
        if(header.name === "User-Agent" || header.name === "X-Forwarded-  For") {
            return false
        }
        return true
    });

    details.requestHeaders.push({
        "name": "User-Agent",
        "value": google_adbot_UA
    });

    details.requestHeaders.push({
        "name": "X-Forwarded-For",
        "value": "66.102.0.0"
    });

    console.log("Spoofed as Google crawler");

    let requestHeadersObject = {
        requestHeaders: details.requestHeaders
    };

    return requestHeadersObject;
}

function disableCookies(details) {
    root = extractRootWebsite(details.url);
    rootSearch = "*://*." + root + "/!*";

    //  Set Cookie Permission if necessary
    chrome.contentSettings.cookies.set({
        'primaryPattern': rootSearch,
        'setting': 'block'
    });

    console.log("Disabled Cookies");
}


