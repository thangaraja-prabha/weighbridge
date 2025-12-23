import { SerialPort } from 'serialport';

async function list() {
    try {
        console.log('Attempting to list ports...');
        const ports = await SerialPort.list();
        console.log('Ports found:', ports);
    } catch (e) {
        console.error('Error:', e);
    }
}

list();
