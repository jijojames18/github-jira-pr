"use strict";

const showForPages = ["https://*.github.com/*"];
const menuEvent = "populate_pull_request";
const menuTitle = "Populate Pull Request";
const menuContext = ["editable"];

const extensionWindow = (function () {
  if (typeof chrome !== undefined) {
    return chrome;
  } else if (typeof browser !== undefined) {
    return browser;
  } else if (typeof msBrowser !== undefined) {
    return msBrowser;
  }
})();

if (extensionWindow) {
  extensionWindow.contextMenus.create({
    id: menuEvent,
    title: menuTitle,
    contexts: menuContext,
    documentUrlPatterns: showForPages,
  });

  extensionWindow.contextMenus.onClicked.addListener(function (info, tab) {
    // Send an event to corresponding tab
    extensionWindow.tabs.sendMessage(tab.id, { event: menuEvent });
  });
}
