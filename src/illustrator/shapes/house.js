var BaseShape = require("./base.js");
var Measure   = require("../geometry/measure.js");

/**
 * Draw a House
 * 
 * @implements BaseShape
 */
class House extends BaseShape {
    constructor(key) {
        super(key);
        this._margin = 4;
        this._house = new Measure(16, 16);
        this._updateDimensions();
    };

    _updateDimensions() {
        this.dimensions.length = this._house.length + (2 * this._margin),
        this.dimensions.width  = this._house.width  + (2 * this._margin)
    };

    set size(val) {
        this._house.length = val;
        this._house.width  = val;
        this._updateDimensions();
    };

    draw(parentPosition, parentRotation) {
        // TODO
        throw 'not yet implemented';
        super.draw(parentPosition, parentRotation);
    };
}

module.exports = House;
