var URL_REGEX = new RegExp("https?:\/\/(.+)");

function executeFile(path) {
    chrome.tabs.executeScript(null, {file: path}, function() {
        var lastError = chrome.extension.lastError;
        
        if(lastError) {
            alert("WRANING : " + lastError.message);
        }
    });
}

function executeCode(str) {
    chrome.tabs.executeScript(null, {code: str}, function() {
        var lastError = chrome.extension.lastError;
        
        if(lastError) {
            alert("WRANING : " + lastError.message);
        }
    });
}


function log(arg) {
    executeCode("console.log(\"" + arg +"\")");
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        var result = URL_REGEX.exec(tab.url);
        if (result) {
            log("asd");
            if (result[1].startsWith("gall.dcinside.com/board/lists")) {
                executeFile("js/viewer.js");
            }
        }
    }
});