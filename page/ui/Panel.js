
var ContainerWrapper = require('../container');

var PanelWrapper = Fire.Class({
    name: 'Runtime.PanelWrapper',
    extends: ContainerWrapper,

    constructor: function () {
    },

    properties: {
        childrenN: {
            get: function () {
                var targetN = this.targetN;
                var children = targetN.children.filter(function (child) {
                    return targetN.graphic !== child;
                });
                return children;
            }
        },

        blendMode: {
            get: function () {
                return this.targetN.blendMode;
            },
            set: function (value) {
                this.targetN.blendMode = value;
            },
            type: Runtime.BlendModes
        },

        tint: {
            get: function () {
                var color = Fire.Color.fromHex( this.targetN.tint );
                color.a = this.alpha;
                return color;
            },
            set: function (value) {
                this.targetN.tint = value.toPixiHex();
                this.alpha = value.a;
            },

            type: Fire.Color
        },

        edgeColor : {
            get: function () {
                var color = Fire.Color.fromHex( this.targetN.edgeColor );
                color.a = this.alpha;
                return color;
            },
            set: function (value) {
                this.targetN.edgeColor = value.toPixiHex();
                this.alpha = value.a;
            },
            type: Fire.Color
        },

        edgeWidth : {
            get: function () {
                return this.targetN.edgeWidth;
            },
            set: function (value) {
                this.targetN.edgeWidth = value;
            }
        },

        isButton : {
            get: function () {
                return this.targetN.isButton;
            },
            set: function (value) {
                this.targetN.isButton = value;
            }
        },

        pressColor : {
            get: function () {
                var color = Fire.Color.fromHex( this.targetN.pressColor );
                color.a = this.alpha;
                return color;
            },
            set: function (value) {
                this.targetN.pressColor = value.toPixiHex();
                this.alpha = value.a;
            },
            type: Fire.Color
        },

        showShadow : {
            get: function () {
                return this.targetN.showShadow;
            },
            set: function (value) {
                this.targetN.showShadow = value;
            }
        },

        shadowBlur : {
            get: function () {
                return this.targetN.shadowBlur;
            },
            set: function (value) {
                this.targetN.shadowBlur = value;
            }
        },

        shadowColor : {
            get: function () {
                var color = Fire.Color.fromHex( this.targetN.shadowColor );
                color.a = this.alpha;
                return color;
            },
            set: function (value) {
                this.targetN.shadowColor = value.toPixiHex();
                this.shadowBlur = value.a;
            },
            type: Fire.Color
        },

        shadowX : {
            get: function () {
                return this.targetN.shadowX;
            },
            set: function (value) {
                this.targetN.shadowX = value;
            }
        },

        shadowY : {
            get: function () {
                return this.targetN.shadowY;
            },
            set: function (value) {
                this.targetN.shadowY = value;
            }
        },

        _edgeColor : {
            default: 0x000000
        },

        _edgeWidth: {
            default: 1
        },

        _isButton : {
            default: false
        },

        _pressColor : {
            default: 0x000000
        },

        _showShadow: {
            default: true
        },

        _shadowBlur : {
            default: 1
        },

        _shadowColor: {
            default: 0x000000
        },

        _shadowX: {
            default: 10
        },

        _shadowY: {
            default: 10
        },

        _blendMode: {
            default: Runtime.BlendModes.NORMAL
        },

        _tint: {
            default: 0xffffff
        },
    },

    onBeforeSerialize: function () {
        ContainerWrapper.prototype.onBeforeSerialize.call(this);

        this._tint = this.targetN.tint;
        this._blendMode = this.blendMode;
        this._edgeColor = this.targetN.edgeColor;
        this._edgeWidth = this.edgeWidth;
        this._isButton = this.isButton;
        this._pressColor = this.targetN.pressColor;
        this._showShadow = this.showShadow;
        this._shadowBlur = this.shadowBlur;
        this._shadowColor = this.targetN.shadowColor;
        this._shadowX = this.shadowX;
        this._shadowY = this.shadowY;
    },

    createNode: function (node) {
        ContainerWrapper.prototype.createNode.call(this, node);
 
        node.tint = this._tint;
        node.blendMode = this._blendMode;
        node.edgeColor = this._edgeColor;
        node.edgeWidth = this._edgeWidth;
        node.isButton = this._isButton;
        node.pressColor = this._pressColor;
        node.showShadow = this._showShadow;
        node.shadowBlur = this._shadowBlur;
        node.shadowColor = this._shadowColor;
        node.shadowX = this._shadowX;
        node.shadowY = this._shadowY;

        return node;
    }
});

Runtime.PanelWrapper = module.exports = PanelWrapper;
