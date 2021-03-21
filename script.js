"use strict";

const showForPages = ["https://*.github.com/*"];
const menuEvent = "populate_pull_request";
const menuTitle = "Populate Pull Request";
const menuContext = ["editable"];

function contextMenuClick(info, tab) {
  // Send an event to corresponding tab
  chrome.tabs.sendMessage(tab.id, menuEvent);
}

chrome.contextMenus.create({
  title: menuTitle,
  contexts: menuContext,
  onclick: contextMenuClick,
  documentUrlPatterns: showForPages,
});
