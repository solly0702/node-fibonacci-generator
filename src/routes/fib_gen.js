import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
	const fibSequence = req.query.fib_sequence;

	if (fibSequence) {
		fibGen(fibSequence, res);
	} else {
		res.status(200).json({
			payload: "generates fib sequence of up to param of fib_sequence"
		});
	}
});

router.post("/", (req, res) => {
	const fibSequence = req.body.fib_sequence;

	if (fibSequence) {
		fibGen(fibSequence, res);
	} else {
		res.status(400).json({
			error: "fib_sequence is required field"
		});
	}
});

function fibGen(fibSequence, res) {
	const validFlag = isValidParam(fibSequence);

	if (typeof validFlag === "string") {
		res.status(400).json({ error: validFlag });
	} else {
		const fibSequenceArr = fibSequenceGen(fibSequence);
		if (fibSequenceArr.length) {
			res.status(200).json({ payload: fibSequenceArr });
		} else {
			res.status(400).json({
				error:
					"Out of bounds of maximum positive number possible in fibonacci sequence"
			});
		}
	}
}

function isValidParam(fibSequence) {
	if (!isNum(fibSequence)) {
		return "invalid syntax";
	} else if (parseInt(fibSequence, 10) < 1) {
		return "field must be positive number";
	}
	return true;
}

function isNum(inputStr) {
	return /^-{0,1}\d+$/.test(inputStr);
}

function fibSequenceGen(fibSequence) {
	const maxNum = Number.MAX_VALUE;
	const intFibSequence = parseInt(fibSequence, 10);
	let fibSequenceArr = [];
	let x = 0;
	let y = 1;
	let temp = 0;
	let idx = 0;

	while (idx < intFibSequence) {
		if (maxNum > x && temp >= 0) {
			fibSequenceArr.push(String(x));
			temp = x + y;
			x = y;
			y = temp;
		} else {
			fibSequenceArr = [];
			break;
		}
		idx += 1;
	}

	return fibSequenceArr;
}

export default router;
