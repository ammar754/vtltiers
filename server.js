// server.js - Express backend for MCTiers-like leaderboard
// Install: npm install
// Run: npm start
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const DATA_FILE = path.join(__dirname, 'players.json');
const ADMIN_PASSWORD = 'ammar2130405060';
const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// simple token store (in-memory)
const tokens = new Set();

function readData(){
  try{
    const txt = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(txt || '[]');
  }catch(e){
    return [];
  }
}
function writeData(data){
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// ---------- Auth ----------
app.post('/login', (req, res) => {
  const password = req.body && req.body.password;
  if(!password) return res.status(400).json({ error: 'password required' });
  if(password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'invalid password' });
  const token = Math.random().toString(36).slice(2);
  tokens.add(token);
  res.json({ token });
});

function requireToken(req, res, next){
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '');
  if(!token || !tokens.has(token)) return res.status(401).json({ error: 'unauthorized' });
  next();
}

// ---------- Players CRUD ----------
// Get all players (public)
app.get('/players', (req, res) => {
  const data = readData();
  res.json(data);
});

// Create player (admin)
app.post('/players', requireToken, (req, res) => {
  const { name, region, tier, points, avatar } = req.body || {};
  if(!tier || typeof points === 'undefined') return res.status(400).json({ error: 'tier and points required' });
  const data = readData();
  const id = 'p_' + Math.random().toString(36).slice(2,9);
  const obj = { id, name: name || 'Hidden', region: region || 'Global', tier, points: Number(points) || 0, avatar: avatar || '' };
  data.push(obj);
  writeData(data);
  res.json(obj);
});

// Update player (admin)
app.put('/players/:id', requireToken, (req, res) => {
  const id = req.params.id;
  const data = readData();
  const idx = data.findIndex(x => x.id === id);
  if(idx < 0) return res.status(404).json({ error: 'not found' });
  const { name, region, tier, points, avatar } = req.body || {};
  data[idx] = {
    ...data[idx],
    name: typeof name !== 'undefined' ? name : data[idx].name,
    region: typeof region !== 'undefined' ? region : data[idx].region,
    tier: typeof tier !== 'undefined' ? tier : data[idx].tier,
    points: typeof points !== 'undefined' ? Number(points) : data[idx].points,
    avatar: typeof avatar !== 'undefined' ? avatar : data[idx].avatar
  };
  writeData(data);
  res.json(data[idx]);
});

// Delete player (admin)
app.delete('/players/:id', requireToken, (req, res) => {
  const id = req.params.id;
  let data = readData();
  const idx = data.findIndex(x => x.id === id);
  if(idx < 0) return res.status(404).json({ error: 'not found' });
  const removed = data.splice(idx,1)[0];
  writeData(data);
  res.json({ removed });
});

app.listen(PORT, () => console.log('Server listening on port', PORT));