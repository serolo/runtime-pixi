var PanelWrapper = require('./Panel');

var RoundedRectPanelWrapper = Fire.Class({
    name: 'Runtime.RoundedRectPanelWrapper',
    extends: PanelWrapper,

    constructor: function () {
    },

    properties: {

        flatSide: {
            get: function () {
                return this.targetN.flatSide;
            },
            set: function (value) {
                this.targetN.flatSide = value;
            },
            type: Runtime.Borders
        },

        radius : {
            get: function () {
                return this.targetN.radius;
            },
            set: function (value) {
                this.targetN.radius = value;
            }
        },

        _flatSide: {
            default: Runtime.BlendModes.NONE
        },

        _radius : {
            default: 20
        }

    },

    onBeforeSerialize: function () {
        PanelWrapper.prototype.onBeforeSerialize.call(this);
        this._flatSide = this.flatSide;
        this._radius = this.radius;
    },

    createNode: function (node) {
        node = node || new FUEL_UI.RoundedRectPanel();

        PanelWrapper.prototype.createNode.call(this, node);

        node.flatSide = this._flatSide;
        node.radius = this._radius;

        return node;
    }
});

Runtime.RoundedRectPanelWrapper = module.exports = RoundedRectPanelWrapper;
