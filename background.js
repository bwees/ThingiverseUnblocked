
function logURL(requestDetails) {
    if (requestDetails.url.includes("?0")) return;

    var headers = new Headers()

    // convert requestDetails.requestHeaders to Headers
    for (var i = 0; i < requestDetails.requestHeaders.length; i++) {
        headers.append(requestDetails.requestHeaders[i].name, requestDetails.requestHeaders[i].value);
    }

    if (!headers.has("Authorization")) return;

    fetch(requestDetails.url + "?0", {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .then(data => {
        // make list of all direct_url attributes in data
        var direct_urls = []
        for (var i = 0; i < data.length; i++) {
            if (data[i].public_url) {
                direct_urls.push(data[i].public_url)
            }
        }

        chrome.tabs.executeScript(requestDetails.tabId, {
            code: 'var fileList = ' + JSON.stringify(direct_urls) + ';'
        }, function() {
            chrome.tabs.executeScript(requestDetails.tabId, {file: 'fixbuttons.js'});
        });
        
    })
}
  
chrome.webRequest.onBeforeSendHeaders.addListener(
    logURL,
    {urls: ["*://api.thingiverse.com/things/*/files"]},
    ["requestHeaders"]
);