import { useEffect, useState } from 'react';
import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import io from 'socket.io-client';

const connectToScoketServer = () => {
	const socket = io.connect('http://localhost:8080', {
		transports: ['websocket'], //Indicarle a nuestro server con que tipo de comunicacion nos vamos a comunicar
	});
	return socket;
};

const { currentBands, addVote, removeBand, updateBandNameMessage, createBandMessage } = {
	currentBands: 'current-bands',
	addVote: 'vote-band',
	removeBand: 'delete-band',
	updateBandNameMessage: 'update-band-name',
	createBandMessage: 'create-band',
};

function App() {
	const [socket] = useState(connectToScoketServer());
	const [online, setOnline] = useState(false);
	const [bands, setBands] = useState([]);

	useEffect(() => {
		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		socket.on('connect', () => {
			setOnline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket.on('disconnect', () => {
			setOnline(false);
		});
	}, [socket]);

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

export default App;
