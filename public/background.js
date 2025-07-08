chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.get("isDashboardEnabled", ({ isDashboardEnabled }) => {
    const newState = !isDashboardEnabled;

    chrome.tabs.sendMessage(tab.id, {
      type: newState ? "ENABLE_DASHBOARD" : "DISABLE_DASHBOARD",
    });
  });
});
