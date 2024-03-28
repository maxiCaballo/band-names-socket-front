import { createContext, useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { currentBands } from '../utilities/socketMessages';
import PropTypes from 'prop-types';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	const { socket, online } = useSocket('http://localhost:8080');
	const [bands, setBands] = useState([]);

	useEffect(() => {
		socket.on(currentBands, (bands) => {
			setBands(bands);
		});

		return () => socket.off(currentBands);
	}, [socket]);

	return <SocketContext.Provider value={{ socket, online, bands, setBands }}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
