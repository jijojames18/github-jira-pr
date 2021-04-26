// Content script
import config from "@/config";
import {
  DOM_ELEMENT_SELECTORS,
  DEFAULT_CONFIG,
  MENU_EVENT,
} from "@js/common/constants";
import extensionWindow from "@js/common/context";
import { togglePopup, selectElementInPopup } from "@js/common/functions";

class ContentScript {
  constructor(branchType, branchName, config) {
    this.config = Object.assign({}, DEFAULT_CONFIG, config);
    this.PRLabel = this.getLabelText(branchType);
    this.branchName = branchName;
  }

  async exec() {
    // Add reviewers
    await this.addReviewers();

    if (this.PRLabel) {
      // Add label
      await this.addLabel();
    }

    // Add description
    const bodyElem = document.getElementById(DOM_ELEMENT_SELECTORS.body);
    if (bodyElem) {
      const newLine = String.fromCharCode(13, 10);
      const prDescription = this.config.prText
        .replaceAll("{BRANCH_NAME}", this.branchName)
        .replaceAll("{NEWLINE}", newLine);
      bodyElem.value = prDescription;
    }

    // Add Title
    await this.addTitle();
  }

  /**
   * Identifies the label to be used for the pull request
   * @returns String
   */
  getLabelText(type) {
    if (new RegExp(this.config.branchSelector.bug.join("|")).test(type)) {
      return "bug";
    } else if (
      new RegExp(this.config.branchSelector.feature.join("|")).test(type)
    ) {
      return "enhancement";
    }
  }

  async addReviewers() {
    const reviewerList = this.config.reviewerList;
    await togglePopup(DOM_ELEMENT_SELECTORS.reviewers.popup);
    for (let i = 0; i < reviewerList.length; i++) {
      await selectElementInPopup(
        reviewerList[i],
        DOM_ELEMENT_SELECTORS.reviewers.input,
        DOM_ELEMENT_SELECTORS.reviewers.select
      );
    }
    await togglePopup(DOM_ELEMENT_SELECTORS.reviewers.popup);
  }

  async addLabel() {
    await togglePopup(DOM_ELEMENT_SELECTORS.labels.popup);
    await selectElementInPopup(
      this.PRLabel,
      DOM_ELEMENT_SELECTORS.labels.input,
      DOM_ELEMENT_SELECTORS.labels.select
    );
    await togglePopup(DOM_ELEMENT_SELECTORS.labels.popup);
  }

  async addTitle() {
    const titleElem = document.getElementById(DOM_ELEMENT_SELECTORS.title);
    if (titleElem) {
      // If only 1 commit is present, use its text.
      const commitElements = document.querySelectorAll(
        DOM_ELEMENT_SELECTORS.commits.timeline
      );
      if (commitElements.length === 1) {
        const commitMessage = document.querySelectorAll(
          DOM_ELEMENT_SELECTORS.commits.commit
        );
        titleElem.value = commitMessage[1].text.trim();
      } else {
        titleElem.value = this.config.prTitle.replaceAll("{ID}", branchName);
      }
      titleElem.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
}

extensionWindow.runtime.onMessage.addListener(async (eventDetails) => {
  if (typeof eventDetails === "object" && eventDetails.event === MENU_EVENT) {
    const splitUrl = document.URL.split("/").reverse();
    const contentScript = new ContentScript(
      splitUrl[1], // Branch type
      splitUrl[0].split("?")[0], // JIRA ID
      config
    );
    contentScript.exec();
  }
});
