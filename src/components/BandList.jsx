import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const BandList = ({ data, vote, deleteBand, updateBandName }) => {
	const [bands, setBands] = useState([data]);

	useEffect(() => {
		setBands(data);
	}, [data]);

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

	function updateName(bandId, name) {
		const band = bands.find((band) => band.id === bandId);

		if (!band) return;

		updateBandName({ id: bandId, name });
	}

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className='btn btn-primary' onClick={() => vote(band.id)}>
						{' '}
						+1
					</button>
				</td>
				<td>
					<input className='form-control mb-2' value={band.name} onChange={(e) => changeBandName(e, band.id)} />

					<button className='btn btn-outline-primary' onClick={() => updateName(band.id, band.name)}>
						Change name
					</button>
				</td>
				<td>
					<h3>{band.votes}</h3>
				</td>
				<td>
					<button className='btn btn-danger' onClick={() => deleteBand(band.id)}>
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
	vote: PropTypes.func.isRequired,
	deleteBand: PropTypes.func.isRequired,
	updateBandName: PropTypes.func.isRequired,
	createBand: PropTypes.func.isRequired,
};
