// Constants file

export const SHOW_FOR_PAGES = ["https://*.github.com/*compare*"];
export const MENU_EVENT = "populate_pull_request";
export const MENU_CONTEXT = ["editable"];

export const DOM_ELEMENT_SELECTORS = {
  reviewers: {
    popup: "#reviewers-select-menu .discussion-sidebar-toggle",
    input: "review-filter-field",
    select: "#reviewers-select-menu .select-menu-item:not([hidden])",
  },
  labels: {
    popup: "#labels-select-menu .discussion-sidebar-toggle",
    input: "label-filter-field",
    select: "#labels-select-menu .select-menu-item:not([hidden])",
  },
  title: "pull_request_title",
  body: "pull_request_body",
  commits: {
    timeline: ".TimelineItem--condensed",
    commit: ".TimelineItem--condensed a",
  },
};

export const DEFAULT_CONFIG = {
  branchSelector: {
    bug: ["bug"],
    feature: ["feature"],
  },
  prTitle: "",
  prText: "",
  reviewerList: [],
};
