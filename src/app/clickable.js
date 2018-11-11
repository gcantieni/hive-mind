const { Map } = require('immutable')

function addClickable(clickMap, data) {
	while(true) {
		const colorKey = getRandomColor();
		const hasKey = clickables.get(colorKey);
		if (hasKey) {
			continue;
		}
		return clickables.set(colorKey, data);
	}
}
function getRandomColor() {
	const r = Math.round(Math.random() * 255);
	const g = Math.round(Math.random() * 255);
	const b = Math.round(Math.random() * 255);
	return `rgb(${r},${g},${b})`;
}

module.exports = addClickable
