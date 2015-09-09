
var PanelWrapper = require('./Panel');

var EllipsePanelWrapper = Fire.Class({
    name: 'Runtime.EllipsePanelWrapper',
    extends: PanelWrapper,

    constructor: function () {
    },

    properties: {
    },

    onBeforeSerialize: function () {
        PanelWrapper.prototype.onBeforeSerialize.call(this);
    },

    createNode: function (node) {
        node = node || new FUEL_UI.EllipsePanel();

        PanelWrapper.prototype.createNode.call(this, node);

        return node;
    }
});

Runtime.EllipsePanelWrapper = module.exports = EllipsePanelWrapper;
