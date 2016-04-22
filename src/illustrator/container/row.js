var BaseContainer = require("./base.js");
var Point         = require("../geometry/point.js");

/**
 * Rows Elements one after the other
 * 
 * @implements BaseContainer
 * @implements BaseShape
 */
class RowContainer extends BaseContainer {
    static get ALIGNMENT_LEFT() { return -1; }
    static get ALIGNMENT_RIGHT() { return 1; }

    constructor(key, alignment) {
        super(key);
        this._shapeList = [];
        this._alignment = alignment;
    };

    _updateDimensions(newShapeDimensions) {
        this.dimensions.length = Math.max(newShapeDimensions.length, this.dimensions.length);
        this.dimensions.width += newShapeDimensions.width;
    }

    add(shape) {
        shape.rotate(90 * this._alignment);
        this._shapeList.push(shape);
        this._updateDimensions(shape.displayDimensions)

    };

    get countElements() {
        return this._shapeList.length;
    }

    finalize() {
        if (!this._shapeList.length) {
            return;
        }

        var barrierXAxis = (this.dimensions.length / 2) * this._alignment;
        var firstFreePosition = - (this.dimensions.width / 2);

        this._shapeList.forEach(function(shape) {
            shape.relativePosition.x = barrierXAxis - (shape.centroid.x * this._alignment);
            shape.relativePosition.y = firstFreePosition + shape.centroid.y;
            firstFreePosition += shape.displayDimensions.width;
        }.bind(this));
    };

    draw(parentPosition, parentRotation) {
        // TODO
        throw 'not yet implemented';
        super.draw(parentPosition, parentRotation);
    };
}

module.exports = RowContainer;
