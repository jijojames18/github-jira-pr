// Service worker
import {
  MENU_EVENT,
  MENU_TITLE,
  MENU_CONTEXT,
  SHOW_FOR_PAGES,
} from "@js/common/constants";
import extensionWindow from "@js/common/context";

if (extensionWindow) {
  extensionWindow.contextMenus.create({
    id: MENU_EVENT,
    title: MENU_TITLE,
    contexts: MENU_CONTEXT,
    documentUrlPatterns: SHOW_FOR_PAGES,
  });

  extensionWindow.contextMenus.onClicked.addListener(function (info, tab) {
    // Send an event to corresponding tab
    extensionWindow.tabs.sendMessage(tab.id, { event: MENU_EVENT });
  });
}
