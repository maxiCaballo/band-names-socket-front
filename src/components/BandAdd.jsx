import { useState } from 'react';
import PropTypes from 'prop-types';

export const BandAdd = ({ createBand }) => {
	const [value, setValue] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();
		const newName = value;

		if (newName.trim().length === 0) return;

		createBand(newName);
	};
	return (
		<>
			<h3>Add band</h3>

			<form onSubmit={onSubmit}>
				<input
					className='form-control mb-2'
					placeholder='new name band'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button type='submit' className='btn btn-outline-primary'>
					Add band
				</button>
			</form>
		</>
	);
};

BandAdd.propTypes = {
	createBand: PropTypes.func.isRequired,
};
