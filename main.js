document.addEventListener('DOMContentLoaded', () => {

  // function hashCode(string, size){
  //   let hash = 0;
  //   if (string.length == 0) return hash;
  //   for (let i = 0; i < string.length; i++) {
  //     const letter = string.charCodeAt(i);
  //     hash = ((hash << 5) - hash) + letter;
  //     hash = hash & hash; // Convert to 32bit integer
  //   }
  //   return Math.abs(hash) % size ;
  // }

  // let tablink
  console.log(chrome)
  chrome.tabs.query({active: false, currentWindow: false}, function(tabs) {

    // since only one tab should be active and in the current window at once
    // the return variable should only have one entry
    var activeTab = tabs[0];
    var activeTabId = activeTab.id; // or do whatever you need
    console.log(tabs)
  })


  // chrome.tabs.query(
  //   { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
  //   function(tabs) {
  //     const { id: tabId } = tabs[0].url;
  
  //     let code = `document.querySelector('h1')`;
  
  //     // http://infoheap.com/chrome-extension-tutorial-access-dom/
  //     chrome.tabs.executeScript(tabId, { code }, function (result) {
  //       // result has the return value from `code`
  //     });
  //   }
  // );

  // console.log(tablink)
  fetch('https://www.ebay.com', {method: 'GET', headers: {'Access-Control-Allow-Origin':'*'}})
    .then((data) => {  
      let txt = document.getElementById('text')
      txt.innerText = data
      console.log(data)
  })
  //   const res=await fetch (window.location);
  //   const record=await res.json();
  //   return res
  // let record = fetchData();

  // let text = document.getElementById('text')
  // text.innerText = record
});