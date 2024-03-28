import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SocketContext } from '../context/SocketContext';
import { currentBands, addVote, removeBand, updateBandNameMessage } from '../utilities/socketMessages';

export const BandList = () => {
	const [bands, setBands] = useState([]);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on(currentBands, (bands) => {
			setBands(bands);
		});

		return socket.off(currentBands);
	}, [socket]);

	function changeBandName(event, bandId) {
		setBands((bands) =>
			bands.map((band) => {
				if (band.id === bandId) {
					band.name = event.target.value;
				}

				return band;
			}),
		);
	}

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className='btn btn-primary' onClick={() => socket.emit(addVote, band.id)}>
						{' '}
						+1
					</button>
				</td>
				<td>
					<input className='form-control mb-2' value={band.name} onChange={(e) => changeBandName(e, band.id)} />

					<button
						className='btn btn-outline-primary'
						onClick={() => socket.emit(updateBandNameMessage, { id: band.id, name: band.name })}
					>
						Change name
					</button>
				</td>
				<td>
					<h3>{band.votes}</h3>
				</td>
				<td>
					<button className='btn btn-danger' onClick={() => socket.emit(removeBand, band.id)}>
						Delete
					</button>
				</td>
			</tr>
		));
	};

	return (
		<>
			<table className='table table-stripped'>
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Votes</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>{createRows()}</tbody>
			</table>
		</>
	);
};

BandList.propTypes = {
	data: PropTypes.array.isRequired,
};
