import { useContext, useEffect, useState } from 'react';
import { BandAdd } from '../components/BandAdd';
import { BandList } from '../components/BandList';
import { SocketContext } from '../context/SocketContext';

const { currentBands, addVote, removeBand, updateBandNameMessage, createBandMessage } = {
	currentBands: 'current-bands',
	addVote: 'vote-band',
	removeBand: 'delete-band',
	updateBandNameMessage: 'update-band-name',
	createBandMessage: 'create-band',
};

function Home() {
	const [bands, setBands] = useState([]);
	const { socket, online } = useContext(SocketContext);

	useEffect(() => {
		socket.on(currentBands, (bands) => {
			setBands(bands);
		});
	}, [socket]);

	const vote = (id) => {
		socket.emit(addVote, id);
	};
	const deleteBand = (id) => {
		socket.emit(removeBand, id);
	};
	const updateBandName = ({ id, name }) => {
		socket.emit(updateBandNameMessage, { id, name });
	};

	const createBand = (name) => {
		socket.emit(createBandMessage, name);
	};

	return (
		<div className='container'>
			<div className='alert'>
				<p>
					Service status:
					{online ? <span className='text-success'>Online</span> : <span className='text-danger'>Offline</span>}
				</p>
			</div>

			<h1>Band Names</h1>

			<hr />

			<div className='row'>
				<div className='col-8'>
					<BandList data={bands} vote={vote} deleteBand={deleteBand} updateBandName={updateBandName} />
				</div>
				<div className='col-4'>
					<BandAdd createBand={createBand} />
				</div>
			</div>
		</div>
	);
}

export default Home;
