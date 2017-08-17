/**
 * @fileoverview Externs for webcomponents polyfills
 * @externs
 */
/* eslint-disable */

var HTMLImports = {
  /**
   * @param {function()} callback
   */
  whenReady: function whenReady(callback) {},

  /**
   * @param {Element} element
   * @returns {Document} document
   */
  importForElement: function importForElement(element) {}
};

window.HTMLImports = HTMLImports;

var ShadyDOM = {
  inUse: false,
  flush: function flush() {},

  /**
   * @param {!Node} target
   * @param {function(Array<MutationRecord>, MutationObserver)} callback
   * @return {MutationObserver}
   */
  observeChildren: function observeChildren(target, callback) {},

  /**
   * @param {MutationObserver} observer
   */
  unobserveChildren: function unobserveChildren(observer) {},

  /**
   * @param {Node} node
   */
  patch: function patch(node) {}
};

window.ShadyDOM = ShadyDOM;

var WebComponents = {};
window.WebComponents = WebComponents;

/** @type {Element} */
HTMLElement.prototype._activeElement;

/**
 * @param {HTMLTemplateElement} template
 */
HTMLTemplateElement.decorate = function (template) {};

/**
 * @param {function(function())} cb callback
 */
CustomElementRegistry.prototype.polyfillWrapFlushCallback = function (cb) {};