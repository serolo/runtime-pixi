
var ContainerWrapper = require('../container');
var TextWrapper = require('../text');

var ButtonWrapper = Fire.Class({
    name: 'Runtime.ButtonWrapper',
    extends: ContainerWrapper,

    constructor: function () {
        this._anchor = [0.5, 0.5];
    },

    properties: {
        normalTexture: {
            get: function () {
                return this._normalTexture;
            },
            set: function ( value ) {
                this._normalTexture = value;
                this.targetN.upTexture = value;
            },
            url: Fire.Texture
        },

        pressedTexture: {
            get: function () {
                return this._pressedTexture;
            },
            set: function ( value ) {
                this._pressedTexture = value;
                this.targetN.downTexture = value;
            },
            url: Fire.Texture
        },

        disabledTexture: {
            get: function () {
                return this._disabledTexture;
            },
            set: function ( value ) {
                this._disabledTexture = value;
                this.targetN.disabledTexture = value;
            },
            url: Fire.Texture
        },

        blendMode: {
            get: function () {
                return this.targetN.sprite.blendMode;
            },
            set: function (value) {
                this.targetN.sprite.blendMode = value;
            },
            type: Runtime.BlendModes
        },

        anchor: {
            get: function () {
                return Fire.v2(this.targetN.sprite.anchor.x, this.targetN.sprite.anchor.y);
            },
            set: function (value) {
                this.targetN.sprite.anchor.set(value.x, value.y);
            }
        },

        tint: {
            get: function () {
                var color = Fire.Color.fromHex( this.targetN.sprite.tint );
                color.a = this.alpha;
                return color;
            },
            set: function (value) {
                this.targetN.sprite.tint = value.toPixiHex();
                this.alpha = value.a;
            },

            type: Fire.Color
        },

        _normalTexture: {
            default: '',
            url: Fire.Texture
        },

        _pressedTexture: {
            default: '',
            url: Fire.Texture
        },

        _disabledTexture: {
            default: '',
            url: Fire.Texture
        },

        _blendMode: {
            default: Runtime.BlendModes.NORMAL
        },

        _anchor: {
            default: null
        },

        _tint: {
            default: 0xffffff
        },
    },

    onBeforeSerialize: function () {
        ContainerWrapper.prototype.onBeforeSerialize.call(this);

        this._anchor = [this.anchor.x, this.anchor.y];
        this._tint = this.targetN.tint;
        this._blendMode = this.blendMode;
    },

    createNode: function (node) {

        node = node || new FUEL_UI.Button();

        ContainerWrapper.prototype.createNode.call(this, node);

        if (this._anchor) {
            node.sprite.anchor.set(this._anchor[0], this._anchor[1]);
        }

        if(this._normalTexture){
            node.upTexture = this._normalTexture; 
        }

        if(this._pressedTexture){
            node.downTexture = this._pressedTexture; 
        }

        if(this._disabledTexture){
            node.disabledTexture = this._disabledTexture; 
        }

        node.sprite.tint = this._tint;
        node.sprite.blendMode = this._blendMode;

        return node;
    }
});

Runtime.ButtonWrapper = module.exports = ButtonWrapper;
