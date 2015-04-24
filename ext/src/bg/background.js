// if you checked "fancy-settings" in extensionizr.com, uncomment this lines


chrome.webNavigation.onCompleted.addListener(function(details) {
    console.log("web navigation completed. " + details.url);

    chrome.tabs.sendMessage(details.tabId, 'LoadAndInitScripts', function(response) {
        console.log(response);
    });

}, {url: [{hostSuffix: 'twitter.com'}, {hostSuffix: 'localhost'}]});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.status == 'complete') {
        var twitterUrlRegex = /^https?:\/\/(?:[^\.]+\.)?twitter\.com/;
        if (twitterUrlRegex.test(tab.url)) {
            console.log("Tab's url is changed: " + tab.url);

            chrome.pageAction.setPopup({tabId: tab.id, popup: 'src/page_action/page_action.html?ts=' + new Date().getTime()});
            chrome.pageAction.show(tabId);
            chrome.pageAction.setTitle({
                tabId: tab.id,
                title: 'url=' + tab.url
            });

        }
    }
});

//var onMessage = function(message, sender, sendResponse) {
//    console.log('onMessage: ' + message);
//    sendResponse({});
//};
//
////example of using a message handler from the inject scripts
//chrome.runtime.onMessage.addListener(onMessage);

//    var inject_details = {file: "js/annotator/annotator-full.min.js", runAt: 'document_end'};
//    chrome.tabs.executeScript(details.tabId, inject_details);
//    inject_details = {file: "css/annotator/annotator.min.css", runAt: 'document_end'};
//    chrome.tabs.insertCSS(details.tabId, inject_details);
//
//    inject_details = {file: "js/annotator/annotator-init.js", runAt: 'document_end'};
//    chrome.tabs.executeScript(details.tabId, inject_details);



    /// var regex = /onur/gi;
    /// matches = document.body.innerText.match(regex);
    /// console.log(matches);
    /// if (matches) {
    ///     var payload = {
    ///         count: matches.length    // Pass the number of matches back.
    ///     };
    ///     console.log("background.js " + payload.count);
    ///     console.log(payload);
    ///     chrome.runtime.sendMessage(payload, function(response) {});
    /// }
    // window.addEventListener('DOMContentLoaded', function(e) {
    //     console.log(e);
    // });



//            var inject_details = {file: "js/annotator/annotator-init.js", runAt: 'document_end'};
//            chrome.tabs.executeScript(tabId, inject_details);

//            chrome.tabs.sendMessage(tabId, 'InitAnnotatorScript', function(response) {
//                console.log(response);
//            });

//            var s = document.createElement('script');
//            s.src = chrome.extension.getURL('js/annotator/annotator-init.js');
//            s.onload = function() {
//                this.parentNode.removeChild(this);
//            };
//            (document.head||document.documentElement).appendChild(s);
