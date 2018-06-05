/* eslint
  no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["childEl"] }] */

import { Controller } from 'stimulus';

// This controller makes the header row of an HTML table sticky to the top of
// the page, when scrolling through a long table.
//
// @author John Beatty
export default class extends Controller {
  static targets = ['table']

  connect() {
    this.originalDimensions = this.tableTarget.getBoundingClientRect();
    this.tableHeader = this.tableTarget.tHead;
    this.onScrollRunning = true;
    this.resizeHeader();
  }

  onScroll() {
    if (!this.onScrollRunning) {
      this.onScrollRunning = true;
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.scrollTableHeader.bind(this));
      } else {
        setTimeout(this.scrollTableHeader.bind(this), 66);
      }
    }
  }

  scrollTableHeader() {
    if (window.scrollY >= this.originalDimensions.top) {
      this.placeholder.setAttribute('style', 'opacity: 0;');
      this.width = this.placeholder.getBoundingClientRect().width;
      this.tableHeader.setAttribute('style', `top: 0px; position: fixed; margin-top: 0px; z-index: 3; width: ${this.width} px;`);
    } else {
      // Reset Style
      this.placeholder.setAttribute('style', 'display: none; opacity: 0;');
      this.tableHeader.setAttribute('style', '');
    }
    this.onScrollRunning = false;
  }

  resizeHeader() {
    this.tableHeader.childNodes.forEach((el) => {
      el.childNodes.forEach((childEl) => {
        if (childEl.nodeName === 'TH') {
          const style = window.getComputedStyle(childEl);
          const buffer = parseFloat(style.paddingRight) + parseFloat(style.paddingLeft)
                        + parseFloat(style.borderRightWidth) + parseFloat(style.borderLeftWidth);
          childEl.style.width = `${childEl.getBoundingClientRect().width - buffer} px;`;
        }
      });
    });

    if (this.placeholder) {
      this.width = this.placeholder.getBoundingClientRect().width;
      this.placeholder.remove();
    } else {
      this.width = this.tableHeader.getBoundingClientRect().width;
    }
    this.placeholder = this.tableHeader.cloneNode(true);
    this.placeholder.setAttribute('data-target', '');
    this.placeholder.setAttribute('style', 'display: none; opacity: 0;');
    this.tableHeader.insertAdjacentElement('afterend', this.placeholder);

    this.scrollTableHeader();
  }
}
