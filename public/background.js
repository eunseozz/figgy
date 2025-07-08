const dashboardTabStates = new Map();

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab.id;
  const isEnabled = dashboardTabStates.get(tabId) || false;
  const newState = !isEnabled;

  dashboardTabStates.set(tabId, newState);

  chrome.tabs.sendMessage(tabId, {
    type: newState ? "ENABLE_DASHBOARD" : "DISABLE_DASHBOARD",
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_DASHBOARD_STATE") {
    const tabId = sender.tab.id;
    const isEnabled = dashboardTabStates.get(tabId) || false;

    sendResponse({ isDashboardEnabled: isEnabled });
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  dashboardTabStates.delete(tabId);
});
