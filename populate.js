chrome.runtime.onMessage.addListener(async () => {
  const branchName = document.URL.split("/").reverse()[0].split("?")[0];
  const bugBranchNames = ["bug"];
  const featureBranchNames = ["feature"];
  const isBug = new RegExp(bugBranchNames.join("|")).test(branchName);
  const isFeature = new RegExp(featureBranchNames.join("|")).test(branchName);
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
});

const addReviewers = async () => {
  const reviewerList = [];
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
  document.querySelectorAll(elem)[0].click();
};

const sleepForSomeTime = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
