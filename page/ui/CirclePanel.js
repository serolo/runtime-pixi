
var PanelWrapper = require('./Panel');

var CirclePanelWrapper = Fire.Class({
    name: 'Runtime.CirclePanelWrapper',
    extends: PanelWrapper,

    constructor: function () {
    },

    properties: {

        radius : {
            get: function () {
                return this.targetN.radius;
            },
            set: function (value) {
                this.targetN.radius = value;
            }
        },

        _radius : {
            default: 50
        }

    },

    onBeforeSerialize: function () {
        PanelWrapper.prototype.onBeforeSerialize.call(this);

        this._radius = this.radius;
    },

    createNode: function (node) {
        node = node || new FUEL_UI.CirclePanel();

        PanelWrapper.prototype.createNode.call(this, node);

        return node;
    }
});

Runtime.CirclePanelWrapper = module.exports = CirclePanelWrapper;
