chrome.runtime.onMessage.addListener(async () => {
  const splitUrl = document.URL.split("/").reverse();
  const branchType = splitUrl[1];
  const branchName = splitUrl[0].split("?")[0];
  const bugBranchNames = prHelperConfig.branchSelector.bug;
  const featureBranchNames = prHelperConfig.branchSelector.feature;
  const isBug = new RegExp(bugBranchNames.join("|")).test(branchType);
  const isFeature = new RegExp(featureBranchNames.join("|")).test(branchType);
  let labelText = "";
  if (isBug) {
    labelText = "bug";
  } else if (isFeature) {
    labelText = "enhancement";
  }

  // Add reviewers
  await addReviewers();
  // Add label
  await addLabel(labelText);

  // Add description
  const newLine = String.fromCharCode(13, 10);
  const prDescription = prHelperConfig.prText
    .replaceAll("{BRANCH_NAME}", branchName)
    .replaceAll("{NEWLINE}", newLine);
  document.getElementById("pull_request_body").value = prDescription;

  // Add Title
  document.getElementById(
    "pull_request_title"
  ).value = prHelperConfig.prTitle.replaceAll("{ID}", branchName);
  document
    .getElementById("pull_request_title")
    .dispatchEvent(new Event("input", { bubbles: true }));
});

const addReviewers = async () => {
  const reviewerList = prHelperConfig.reviewerList;
  await togglePopup("#reviewers-select-menu .discussion-sidebar-toggle");
  for (let i = 0; i < reviewerList.length; i++) {
    await selectElementInPopup(
      reviewerList[i],
      "review-filter-field",
      "#reviewers-select-menu .select-menu-item:not([hidden])"
    );
  }
  await togglePopup("#reviewers-select-menu .discussion-sidebar-toggle");
};

const addLabel = async (labelText) => {
  await togglePopup("#labels-select-menu .discussion-sidebar-toggle");
  await selectElementInPopup(
    labelText,
    "label-filter-field",
    "#labels-select-menu .select-menu-item:not([hidden])"
  );
  await togglePopup("#labels-select-menu .discussion-sidebar-toggle");
};

const togglePopup = async (cogIcon) => {
  document.querySelectorAll(cogIcon)[0].click();
  await sleepForSomeTime(1000);
};

const selectElementInPopup = async (searchText, searchElem, elem) => {
  document.getElementById(searchElem).value = searchText;
  document
    .getElementById(searchElem)
    .dispatchEvent(new Event("input", { bubbles: true }));
  await sleepForSomeTime(1000);
  const users = document.querySelectorAll(elem);
  if (users.length > 0) {
    users[0].click();
  }
};

const sleepForSomeTime = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
