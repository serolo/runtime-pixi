
var PanelWrapper = require('./Panel');

var RectPanelWrapper = Fire.Class({
    name: 'Runtime.RectPanelWrapper',
    extends: PanelWrapper,

    constructor: function () {
    },

    properties: {
    },

    onBeforeSerialize: function () {
        PanelWrapper.prototype.onBeforeSerialize.call(this);
    },

    createNode: function (node) {
        node = node || new FUEL_UI.RectPanel();

        PanelWrapper.prototype.createNode.call(this, node);

        return node;
    }
});

Runtime.RectPanelWrapper = module.exports = RectPanelWrapper;
