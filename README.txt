MCTiers-like Leaderboard (final package)
Files:
- index.html      -> Public leaderboard (fetches /players)
- admin.html      -> Admin dashboard (requires server login password)
- server.js       -> Express backend (login + players CRUD)
- players.json    -> Data file (updated by server)
- style.css       -> Styles
- package.json    -> npm config

Admin password: ammar2130405060
How to run:
1. Install Node.js (>=14)
2. In project folder run: npm install
3. Start server: npm start
4. Open browser at file://<path>/index.html for public view, and file://<path>/admin.html for admin (or serve statically)
Notes:
- Admin requires running server; no demo/backdoor allowed.
- Data persisted in players.json