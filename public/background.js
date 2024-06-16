import mockChrome from "../src/utils/mockChrome";

const chrome = typeof window.chrome !== 'undefined' ? window.chrome : mockChrome;

let focusStartTime = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startFocus") {
    focusStartTime = Date.now();
    sendResponse({ status: "Focus started" });
  } else if (request.action === "stopFocus") {
    if (focusStartTime) {
      const focusEndTime = Date.now();
      const focusDuration = focusEndTime - focusStartTime;
      const dayOfWeek = new Date(focusStartTime).getDay(); // 0 (Sunday) to 6 (Saturday)

      // Retrieve existing focus data from chrome.storage.sync
      chrome.storage.sync.get(['focusData'], (result) => {
        const focusData = result.focusData || [];

        // Add the new focus session data
        focusData.push({
          startTime: focusStartTime,
          endTime: focusEndTime,
          duration: focusDuration,
          dayOfWeek
        });

        // Save the updated focus data back to chrome.storage.sync
        chrome.storage.sync.set({ focusData }, () => {
          focusStartTime = null;
          sendResponse({ status: "Focus stopped", focusData });
        });
      });

      return true; // Indicates that the response will be sent asynchronously
    } else {
      sendResponse({ status: "No focus session started" });
    }
  }
});
