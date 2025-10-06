export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    message: 'DevOps Assessment API by Ritika Singh',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    author: 'Ritika Singh'
  });
}