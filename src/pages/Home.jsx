import { useContext } from 'react';
import { BandAdd } from '../components/BandAdd';
import { BandList } from '../components/BandList';
import { SocketContext } from '../context/SocketContext';
import { BandChart } from '../components/BandChart';

function Home() {
	const { online } = useContext(SocketContext);

	return (
		<div className='container'>
			<div className='alert'>
				<p>
					Service status:
					{online ? <span className='text-success'>Online</span> : <span className='text-danger'>Offline</span>}
				</p>
			</div>

			<h1>Band Names</h1>
			<div className='row'>
				<div className='col'>
					<BandChart />
				</div>
			</div>

			<hr />

			<div className='row'>
				<div className='col-8'>
					<BandList />
				</div>
				<div className='col-4'>
					<BandAdd />
				</div>
			</div>
		</div>
	);
}

export default Home;
