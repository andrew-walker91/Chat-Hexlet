import { useContext } from 'react';

import { SocketContext } from '../contexts';

const useSocket = () => useContext(SocketContext);

export default useSocket;
