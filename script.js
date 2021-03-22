"use strict";

const showForPages = ["https://*.github.com/*"];
const menuEvent = "populate_pull_request";
const menuTitle = "Populate Pull Request";
const menuContext = ["editable"];

window.extensionWindow = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

function contextMenuClick(info, tab) {
  // Send an event to corresponding tab
  extensionWindow.tabs.sendMessage(tab.id, menuEvent);
}

extensionWindow.contextMenus.create({
  title: menuTitle,
  contexts: menuContext,
  onclick: contextMenuClick,
  documentUrlPatterns: showForPages,
});
