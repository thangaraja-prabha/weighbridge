const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// --- Standard Industrial Serial Settings ---
const SERIAL_SETTINGS = {
    baudRates: [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200],
    dataBits: [7, 8],
    parity: ['none', 'even', 'odd', 'mark', 'space'],
    stopBits: [1, 1.5, 2]
};

// --- Default Configuration (Adjust matches specific hardware if known) ---
const DEFAULT_CONFIG = {
    path: 'COM3', // Default port, user might need to change this
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    autoOpen: false
};

/**
 * Lists available serial ports.
 */
async function listPorts() {
    try {
        const ports = await SerialPort.list();
        if (ports.length === 0) {
            console.log('No serial ports found.');
            return;
        }
        console.log('Available Serial Ports:');
        ports.forEach(port => {
            console.log(`  - ${port.path}\t(Manufacturer: ${port.manufacturer || 'Unknown'})`);
        });
    } catch (err) {
        console.error('Error listing ports:', err);
    }
}

/**
 * Starts reading from the specified serial port.
 */
function startReading(config) {
    console.log(`\nAttempting to connect with settings:
  Port:      ${config.path}
  Baud Rate: ${config.baudRate}
  Data Bits: ${config.dataBits}
  Parity:    ${config.parity}
  Stop Bits: ${config.stopBits}
  `);

    const port = new SerialPort({
        path: config.path,
        baudRate: config.baudRate,
        dataBits: config.dataBits,
        parity: config.parity,
        stopBits: config.stopBits,
        autoOpen: false
    });

    const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

    port.open((err) => {
        if (err) {
            return console.error('Error opening port:', err.message);
        }
        console.log(`Connected to ${config.path}. Waiting for data...`);
    });

    // Open errors will be emitted as an error event
    port.on('error', (err) => {
        console.error('Serial Port Error:', err.message);
    });

    parser.on('data', (data) => {
        // Timestamp for logging
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Weight Data: ${data}`);

        // TODO: Process data (parse weight, unit, stability, etc.)
    });

    // Close handler
    port.on('close', () => {
        console.log('Port closed.');
    });
}

// --- Main Execution ---

const args = process.argv.slice(2);

if (args.includes('--list') || args.includes('-l')) {
    listPorts();
} else {
    // Simple argument parsing for override (very basic)
    // Usage: node read_weight.js [COM_PORT] [BAUD_RATE]
    // Example: node read_weight.js COM4 19200

    const config = { ...DEFAULT_CONFIG };

    if (args[0] && !args[0].startsWith('-')) {
        config.path = args[0];
    }

    if (args[1]) {
        const baudRef = parseInt(args[1], 10);
        if (SERIAL_SETTINGS.baudRates.includes(baudRef)) {
            config.baudRate = baudRef;
        } else {
            console.warn(`Warning: ${args[1]} is not a standard baud rate. using default ${config.baudRate}`);
        }
    }

    // Check if port exists before trying to connect (optional but good UX)
    SerialPort.list().then(ports => {
        const found = ports.find(p => p.path === config.path);
        if (!found) {
            console.warn(`Warning: Port ${config.path} not found in available list. Attempting to open anyway...`);
        }
        startReading(config);
    }).catch(err => {
        // connecting anyway on list error
        startReading(config);
    });
}
