chrome.runtime.sendMessage({message: 'dom watcher first message'}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Hello. This is the response processor in inject.js.bak. " +
                "It was invoked by background.js after we sent 'just testing message' from injector.js");
            // ----------------------------------------------------------

        }
    }, 10);
});

function updateMarkActionButtons() {
//    $('.stream-item-header').filter(function (index) {
//        return $('.twitter-annotator', this).length == 0;
//    }).append(
//            '<button type="button" class="btn-link translate-button expand-stream-item twitter-annotator">' +
//            '<span class="translate-label">Mark action</span><span class="Icon Icon--translator Icon--twitter-annotator"></span>' +
//            '</button>'
//    );
//
//    $('.stream-item-header .twitter-annotator').on('click', function (event) {
//            $('body').data('annotator').plugins.Objects.onButtonClick(event);
//        }
//    );

//    $('.stream-item-header .twitter-annotator').on('click', function (event) {
//            $('body').data('annotator').plugins.Objects.onButtonClick(event);
//        }
//    );

//    var s = document.createElement('script');
//    s.innerHTML =
//    "$('.stream-item-header .twitter-annotator').on('click', function (event) {" +
//    "        $('body').data('annotator').plugins.Objects.onButtonClick(event);" +
//    "    }" +
//    ");alert('deneme');";
//    document.head.appendChild(s);
}
updateMarkActionButtons();

var stream_item_header_query = document.querySelector('link[rel="canonical"]');
var link_query = document.querySelector('link[rel="canonical"]');

// create an observer instance
var tweet_observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
    if (mutation.type == 'childList') {
        parent_node = mutation.target;
        console.log(parent_node);

        if (parent_node.hasClass("stream-item-header")) {
            if ($('.twitter-annotator', parent_node).length == 0) {
                // add
                $(parent_node).append(
                    '<button type="button" class="btn-link translate-button expand-stream-item twitter-annotator">' +
                    '<span class="translate-label">Mark action</span><span class="Icon Icon--translator Icon--twitter-annotator"></span>' +
                    '</button>'
                );

                $('.twitter-annotator', parent_node).on('click', function (event) {
                        $('body').data('annotator').plugins.Objects.onButtonClick(event);
                    }
                );

            } // else do not add
        }

        // if (parent_node.hasClass("tweet")) {
        //    console.log(node.innerHTML);
        // }
    }
  });
});

// create an observer instance
var link_observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
    if (mutation.type == 'attributes') {
        console.log(mutation.attributeName);
        var message = "Prev. URL: " + mutation.oldValue + "\n";
        message += "Curr. URL: " + mutation.target[mutation.attributeName] + "\n";
        console.log(message);

        //updateMarkActionButtons();
    }
  });
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true, subtree: true};

// pass in the target node, as well as the observer options
tweet_observer.observe(stream_item_header_query, config);

link_observer.observe(link_query, config);

// later, you can stop observing
//observer.disconnect();

///// INJECTING jquery

//var s = document.createElement('script');
//s.src = chrome.extension.getURL('js/jquery/jquery-2.1.1.min.js');
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};
//(document.head||document.documentElement).appendChild(s);

///// INJECTING annotatorjs

// <link rel="stylesheet" href="http://assets.annotateit.org/annotator/v1.2.5/annotator.min.css">

//var s = document.createElement('link');
//s.rel = "stylesheet";
//s.href = chrome.extension.getURL('css/annotator/annotator.min.css');
//document.head.appendChild(s);
//
//var s = document.createElement('script');
//s.src = chrome.extension.getURL('js/annotator/annotator-full.min.js');
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};
//(document.head||document.documentElement).appendChild(s);

//var s = document.createElement('script');
//s.src = chrome.extension.getURL('js/annotator/annotator-init.js');
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};
//(document.head||document.documentElement).appendChild(s);

var LoadAndInitScripts = function(message, sender, sendResponse) {
    console.log('LoadAndInitScriptsOrder');

    var s = document.createElement('link');
    s.rel = "stylesheet";
    s.href = chrome.extension.getURL('css/annotator/annotator.min.css');
    s.onload = function() {
//        var s = document.createElement('script');
//        s.src = chrome.extension.getURL('js/annotator/annotator-full.min.js');
//        s.onload = function() {
//            var s = document.createElement('script');
//            s.src = chrome.extension.getURL('js/annotator/annotator-init.js');
//            s.onload = function () {
//                this.parentNode.removeChild(this);
//            };
//            (document.head || document.documentElement).appendChild(s);
//            this.parentNode.removeChild(this);
//        };
//        (document.head||document.documentElement).appendChild(s);
    };
    document.head.appendChild(s);

    //InitAnnotatorScript(message, sender, sendResponse, false);

    sendResponse('loaded and inited scripts (from injector.js)');
};

var InitAnnotatorScript = function(request, sender, sendResponse, respond) {

    var s = document.createElement('script');
    s.src = chrome.extension.getURL('js/annotator/annotator-init.js');
    s.onload = function () {
        this.parentNode.removeChild(this);
    };
    (document.head || document.documentElement).appendChild(s);

    if (respond) {
        sendResponse('inited scripts (from injector.js)');
    }
};

//example of using a message handler from the inject scripts
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message == 'LoadAndInitScripts') {
        LoadAndInitScripts(message, sender, sendResponse);
    } else if (message == 'InitAnnotatorScript') {
        InitAnnotatorScript(message, sender, sendResponse, true);
    }
});