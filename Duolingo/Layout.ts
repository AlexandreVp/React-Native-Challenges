import { SharedValues } from "../components/AnimatedHelpers";

export const MARGIN_TOP = 150;
export const MARGIN_LEFT = 32;
export const NUMBER_OF_LINES = 3;
export const WORD_HEIGHT = 55;
export const SENTENCE_HEIGHT = (NUMBER_OF_LINES - 1) * WORD_HEIGHT;

export type Offset = SharedValues<{
	order: number;
	width: number;
	height: number;
	x: number;
	y: number;
	originalX: number;
	originalY: number;
}>;

const isNotInBank = (offset: Offset) => {
	"Worklet";
	return offset.order.value !== -1;
};
  
const byOrder = (a: Offset, b: Offset) => {
	"Worklet";
	return a.order.value > b.order.value ? 1 : -1;
};

export const calculateLayout = (input: Offset[], containerWidth: number) => {
	"Worklet";
	const offsets = input.filter(isNotInBank).sort(byOrder);
	
	if (offsets.length === 0) {
		return;
	}
	
	let lineNumber = 0;
	let lineBreak = 0;
	
	offsets.forEach((offset, index) => {
		const total = offsets
			.slice(lineBreak, index)
			.reduce((acc, o) => acc + o.width.value, 0);

		if (total + offset.width.value > containerWidth) {
			lineNumber += 1;
			lineBreak = index;
			offset.x.value = 0;
		} else {
			offset.x.value = total;
		}

		offset.y.value = WORD_HEIGHT * lineNumber;
	});
};
