import { Chart, registerables } from 'chart.js';
import { useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {
	const { bands } = useContext(SocketContext);

	useEffect(() => {
		const chart = createChart(bands);

		return () => chart.destroy();
	}, [bands]);

	const createChart = (bands = []) => {
		Chart.register(...registerables);
		const ctx = document.getElementById('myChart');
		const chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: bands.map((band) => band.name),
				datasets: [
					{
						label: '# of Votes',
						data: bands.map((band) => band.votes),
						borderWidth: 1,
					},
				],
			},
			options: {
				animation: false,
				indexAxis: 'y',
				scales: {
					x: {
						beginAtZero: true,
					},
				},
			},
		});
		return chart;
	};

	return (
		<>
			<canvas id='myChart'></canvas>
		</>
	);
};
