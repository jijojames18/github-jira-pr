const domElementSelectors = {
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
};

const defaultConfig = {
  branchSelector: {
    bug: ["bug"],
    feature: ["feature"],
  },
  prTitle: "",
  prText: "",
  reviewerList: [],
};

const configList = Object.assign({}, defaultConfig, config);

chrome.runtime.onMessage.addListener(async () => {
  const splitUrl = document.URL.split("/").reverse();
  const labelText = getLabelText(splitUrl[1]);
  const branchName = splitUrl[0].split("?")[0];

  // Add reviewers
  await addReviewers();

  if (labelText) {
    // Add label
    await addLabel(labelText);
  }

  // Add description
  const bodyElem = document.getElementById(domElementSelectors.body);
  if (bodyElem) {
    const newLine = String.fromCharCode(13, 10);
    const prDescription = configList.prText
      .replaceAll("{BRANCH_NAME}", branchName)
      .replaceAll("{NEWLINE}", newLine);
    bodyElem.value = prDescription;
  }

  // Add Title
  const titleElem = document.getElementById(domElementSelectors.title);
  if (titleElem) {
    titleElem.value = configList.prTitle.replaceAll("{ID}", branchName);
    titleElem.dispatchEvent(new Event("input", { bubbles: true }));
  }
});

const getLabelText = (branchType) => {
  const bugBranchNames = configList.branchSelector.bug;
  const featureBranchNames = configList.branchSelector.feature;
  const isBug = new RegExp(bugBranchNames.join("|")).test(branchType);
  const isFeature = new RegExp(featureBranchNames.join("|")).test(branchType);
  if (isBug) {
    return "bug";
  } else if (isFeature) {
    return "enhancement";
  }
};

const addReviewers = async () => {
  const reviewerList = configList.reviewerList;
  await togglePopup(domElementSelectors.reviewers.popup);
  for (let i = 0; i < reviewerList.length; i++) {
    await selectElementInPopup(
      reviewerList[i],
      domElementSelectors.reviewers.input,
      domElementSelectors.reviewers.select
    );
  }
  await togglePopup(domElementSelectors.reviewers.popup);
};

const addLabel = async (labelText) => {
  await togglePopup(domElementSelectors.labels.popup);
  await selectElementInPopup(
    labelText,
    domElementSelectors.labels.input,
    domElementSelectors.labels.select
  );
  await togglePopup(domElementSelectors.labels.popup);
};

const togglePopup = async (cogIcon) => {
  document.querySelectorAll(cogIcon)[0].click();
  await sleepForSomeTime(1000);
};

const selectElementInPopup = async (searchText, searchElem, elem) => {
  const inputElm = document.getElementById(searchElem);
  if (inputElm) {
    inputElm.value = searchText;

    document
      .getElementById(searchElem)
      .dispatchEvent(new Event("input", { bubbles: true }));
    await sleepForSomeTime(1000);

    const users = document.querySelectorAll(elem);
    if (users.length > 0) {
      users[0].click();
    }
  }
};

const sleepForSomeTime = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
