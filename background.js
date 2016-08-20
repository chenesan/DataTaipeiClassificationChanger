window.resp = {}
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  console.log(xhr.status)
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    window.resp = xhr.responseText;
  }
}; // Implemented elsewhere.
xhr.open("GET", chrome.extension.getURL('/data.json'), true);
xhr.send();
chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"changer.js"});
},{urls: [
    '*://data.taipei/opendata/datalist/*'
]});
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  sendResponse(window.resp);
})
