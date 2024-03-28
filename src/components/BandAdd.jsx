import { useContext, useState } from 'react';
import { createBandMessage } from '../utilities/socketMessages';
import { SocketContext } from '../context/SocketContext';

export const BandAdd = () => {
	const [value, setValue] = useState('');
	const { socket } = useContext(SocketContext);

	const onSubmit = (e) => {
		e.preventDefault();
		const newName = value;

		if (newName.trim().length === 0) return;

		socket.emit(createBandMessage, newName);
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
