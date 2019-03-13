const R = require( 'ramda' );
// given position, is the object at `pos` of size `size` visible
// within `cam`
const isVisible = R.curry( ( cam, size, pos ) =>
      pos.x + size >= cam.x &&
      pos.x < cam.x + cam.maxX &&
      pos.y + size >= cam.y &&
      pos.y < cam.y + cam.maxY );

module.exports = {
    isVisible
};
