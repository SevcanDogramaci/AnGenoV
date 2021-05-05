import React, { useState, useEffect } from 'react';

let count = 0;

const RunningText = (props) => {
	const [counter, setCounter] = useState(0);
	const [timer, setTimer] = useState(null);
	const { stop } = props;

	const increment = () => setCounter((count = count === 0 ? 1 : 0));

	const handleTimerChange = () => {
		console.log('Handling timer');
		let timerValue = setInterval(increment, 1000);
		setTimer(timerValue);
	};

	useEffect(() => {
		console.log('Stop ? ', stop);

		if (!stop) {
			console.log('Timer - ', timer);
			if (timer === null) {
				handleTimerChange();
				console.log('setInterval with stop');
			}
		} else {
			console.log('Clear interval');
			clearInterval(timer);
			setTimer(null);
		}
	}, [stop]);

	return <div>Running .{counter % 2 == 0 ? '/' : '\\'}</div>;
};

export default RunningText;
