const global = window;

const chromep = new ChromePromise();
const { storageKey, storageSourceKey } = defaultSetting;

let AA_webdriver = "Object.defineProperty(navigator,'webdriver', {get: () => undefined,});";

let theModal = 'document_start';
let theRunScript = JSON.stringify(AA_webdriver);

debugger;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (theModal && theModal !== 'close') {
    if (changeInfo.status === 'loading') {
      if (tab.url.slice(0, 7) === 'http://' || tab.url.slice(0, 8) === 'https://') {
        chrome.tabs.executeScript(tabId, {
          code: `;(${function (s) {
            const theScript = document.createElement('script');
            theScript.innerHTML = s;
            document.documentElement.appendChild(theScript);
          }.toString()})(${theRunScript});`,
          allFrames: true,
          runAt: theModal,
        });
      }
    }
  }
});