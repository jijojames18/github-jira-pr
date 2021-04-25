// Helper functions

export const sleepForSomeTime = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const togglePopup = async (cogIcon) => {
  document.querySelectorAll(cogIcon)[0].click();
  await sleepForSomeTime(1000);
};

export const selectElementInPopup = async (searchText, searchElem, elem) => {
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
