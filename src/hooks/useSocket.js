import { useMemo, useState, useEffect } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath) => {
	const [online, setOnline] = useState(false);
	const socket = useMemo(
		() =>
			io.connect(serverPath, {
				transports: ['websocket'], //Indicarle a nuestro server con que tipo de comunicacion nos vamos a comunicar
			}),
		[serverPath],
	);

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

	return {
		socket,
		online,
	};
};
