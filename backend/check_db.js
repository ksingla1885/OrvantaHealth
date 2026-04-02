const dns = require('dns');
const net = require('net');

const uri = 'orvanta.08o33dy.mongodb.net';

dns.resolveSrv('_mongodb._tcp.' + uri, (err, addresses) => {
    if (err) {
        console.error('SRV lookup error:', err);
        return;
    }
    console.log('SRV Addresses:', addresses);
    
    addresses.forEach(addr => {
        const client = new net.Socket();
        console.log(`Checking TCP connection to ${addr.name}:${addr.port}...`);
        client.connect(addr.port, addr.name, () => {
            console.log(`✓ Connected to ${addr.name}:${addr.port}`);
            client.destroy();
        });
        client.on('error', (err) => {
            console.error(`✗ Error connecting to ${addr.name}:${addr.port}:`, err.message);
        });
    });
});
