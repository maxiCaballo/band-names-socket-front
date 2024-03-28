import { SocketProvider } from './context/SocketContext';
import Home from './pages/Home';

SocketProvider;
export const BandNamesApp = () => {
	return (
		<SocketProvider>
			<Home />
		</SocketProvider>
	);
};
