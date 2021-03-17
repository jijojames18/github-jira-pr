"use strict";

const showForPages = ["https://*.github.com/*"];

function contextMenuClick(info, tab) {
  // Send an event to corresponding tab
  chrome.tabs.sendMessage(tab.id, "populate_pull_request");
}

chrome.contextMenus.create({
  title: "Populate Pull Request",
  contexts: ["editable"],
  onclick: contextMenuClick,
  documentUrlPatterns: showForPages,
});
