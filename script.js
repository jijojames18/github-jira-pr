"use strict";

const showForPages = [];

function contextMenuClick(info) {
  console.log(info);
}

chrome.contextMenus.create({
  title: "Populate Pull Request",
  contexts: ["editable"],
  onclick: contextMenuClick,
  documentUrlPatterns: showForPages,
});
