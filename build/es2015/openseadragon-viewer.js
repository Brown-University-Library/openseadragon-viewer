"use strict";

/**
 * `openseadragon-viewer`
 * An encapsulation of the openseadragon viewer into a web component custom element.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class OpenSeaDragonViewer extends Polymer.Element {
  constructor() {
    super();
    this.__viewerCounter = OpenSeaDragonViewer._counter;
    return this;
  }

  static get NOT_SUPPLIED_BY_USER() { return "Not Supplied By User"; }

  static get DEFAULT_WIDTH() { return "100%"; }

  static get DEFAULT_HEIGHT() { return "600px"; }

  static get is() { return "openseadragon-viewer"; }

  static get _counter() {
    OpenSeaDragonViewer.__counter = (OpenSeaDragonViewer.__counter || 0) + 1;
    return OpenSeaDragonViewer.__counter;
  }

  get _viewerCounter() {
    return this.__viewerCounter.toString();
  }

  static get properties() {
    return {
      _viewerCount: String,
      width: {
        type: String,
        value: OpenSeaDragonViewer.NOT_SUPPLIED_BY_USER // default will be 100%
      },
      height: {
        type: String,
        value: OpenSeaDragonViewer.NOT_SUPPLIED_BY_USER // default will be 600px
      },
      uri: String
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._viewerCount = this._viewerCounter;

    let constructIFrame = function(iframe) {
      let iframeDoc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
      if (!iframeDoc) {
        setTimeout(constructIFrame, 500);
      } else {
        let headTag = iframeDoc.createElement("head");
        let bodyTag = iframeDoc.createElement("body");

        let headScriptTag = iframeDoc.createElement("script");
        headScriptTag.src = "../../../bower_components/openseadragon/built-openseadragon/openseadragon/openseadragon.min.js";
        headScriptTag.type = "application/javascript";

        headTag.appendChild(headScriptTag);

        let bodyDivTag = iframeDoc.createElement("div");
        bodyDivTag.id = "viewer";
        bodyDivTag.setAttribute("allowfullscreen", "allowfullscreen");
        // let allowfullscreenAttribute = iframeDoc.createAttribute("allowfullscreen");
        // allowfullscreenAttribute.value = "allowfullscreen";
        // bodyDivTag.attributes.setNamedItem(allowfullscreenAttribute);

        let idRow = `element: "viewer"`;
        let prefixUrlRow = `prefixUrl: '/bower_components/openseadragon/built-openseadragon/openseadragon/images/',`;
        let preserveViewportRow = `preserveViewport: true,`;
        let visibilityRatioRow = `visibilityRatio: 1,`;
        let defaultZoomLevelRow = `defaultZoomLevel: 1,`;
        let sequenceMode = `sequenceMode: true,`;
        let tileSourcesRow = this.uri && `tileSources: ["${this.uri}"],` || `tileSources: [],`;

        let bodyScriptTag = iframeDoc.createElement("script");
        bodyScriptTag.textContent =
         `var OpenSeaDragonViewerNS = function() {}
          OpenSeaDragonViewerNS.prototype.make = function() {
            if ('OpenSeadragon' in window) {
              OpenSeadragon({
                ${prefixUrlRow}
                ${preserveViewportRow}
                ${visibilityRatioRow}
                ${defaultZoomLevelRow}
                ${sequenceMode}
                ${tileSourcesRow}
                ${idRow} // needs to be last so everything before it can when it's constructed have a , at the end
              });
            } else {
              window.setTimeout(this.make.bind(this), 500);
            }
          }

          new OpenSeaDragonViewerNS().make();`
        ;

        bodyTag.appendChild(bodyDivTag);
        bodyTag.appendChild(bodyScriptTag);

        let htmlTag = iframeDoc.getElementsByTagName("html")[0];
        htmlTag.replaceChild(headTag, iframeDoc.getElementsByTagName("head")[0]);
        htmlTag.replaceChild(bodyTag, iframeDoc.getElementsByTagName("body")[0]);
      }
    }

    let divId = "container-" + this._viewerCount;
    let divContainer = this.shadowRoot.getElementById(divId);

    let iframe = divContainer.ownerDocument.createElement("iframe");
    iframe.id = "iframe-viewer";
    iframe.src = "javascript:true;";
    //iframe.style = "width:100%;height:100%;border:0;";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";

    let iframeDoc = iframe.contentDocument ? iframe.contentDocument : (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
    if (iframeDoc) {
      constructIFrame.call(this, iframe);
    } else if (window.attachEvent) {
      iframe.attachEvent('onload', constructIFrame.bind(this, iframe));
    } else if (window.addEventListener) {
      iframe.addEventListener('load', constructIFrame.bind(this, iframe), false);
    } else {
      document.addEventListener('DOMContentReady', constructIFrame.bind(this, iframe), false);
    }

    divContainer.appendChild(iframe);

    if (this.style.width === "") {
      if (this.width == OpenSeaDragonViewer.NOT_SUPPLIED_BY_USER) {
        this.style.width = OpenSeaDragonViewer.DEFAULT_WIDTH;
      } else {
        this.style.width = this.width;
      }
    } /* else {
      was set via css
    } */

    if (this.style.height === "") {
      if (this.height == OpenSeaDragonViewer.NOT_SUPPLIED_BY_USER) {
        this.style.height = OpenSeaDragonViewer.DEFAULT_HEIGHT;
      } else {
        this.style.height = this.height;
      }
    } /* else {
      was set via css
    } */
  }
}
customElements.define(OpenSeaDragonViewer.is, OpenSeaDragonViewer);
