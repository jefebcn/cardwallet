#!/usr/bin/env node
'use strict';
/* Genera un CSV importabile in massa in uno scheduler (Metricool, Publer, Later...).
   Uso:  node make-schedule.js [YYYY-MM-DD] [oraFeed] [postEveryDays]
   Es.:  node make-schedule.js 2026-08-01 19:00 2
   - Assegna ai POST una data ogni N giorni (default 2) all'ora indicata (default 19:00)
   - Le STORIE vengono intercalate nei giorni "vuoti" tra un post e l'altro
   Output: schedule.csv nella stessa cartella. */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const cfg = JSON.parse(fs.readFileSync(path.join(DIR, 'content.json'), 'utf8'));

const start = process.argv[2] || '2026-08-01';
const timeFeed = process.argv[3] || '19:00';
const everyDays = parseInt(process.argv[4] || '2', 10);
const timeStory = '12:30';

function addDays(iso, n) {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

const posts = cfg.posts.filter(p => p.type === 'post');
const stories = cfg.posts.filter(p => p.type === 'story');
const base = (cfg.hashtagsBase || '').trim();

const rows = [];
// POST: uno ogni `everyDays` giorni
posts.forEach((p, i) => {
  const date = addDays(start, i * everyDays);
  const caption = p.caption + (base ? '\n\n' + base : '');
  rows.push({ date, time: timeFeed, file: p.file, type: 'Post', caption });
});
// STORIE: nel giorno intermedio tra i post (offset +1), a rotazione
stories.forEach((s, i) => {
  const date = addDays(start, i * everyDays + 1);
  rows.push({ date, time: timeStory, file: s.file, type: 'Story', caption: s.caption });
});

rows.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

function esc(v) { return '"' + String(v).replace(/"/g, '""') + '"'; }
const header = ['Date', 'Time', 'Media', 'Type', 'Caption'];
const csv = [header.map(esc).join(',')]
  .concat(rows.map(r => [r.date, r.time, 'png/' + r.file, r.type, r.caption].map(esc).join(',')))
  .join('\n');

fs.writeFileSync(path.join(DIR, 'schedule.csv'), csv + '\n');
console.log('✓ schedule.csv —', rows.length, 'righe (', posts.length, 'post +', stories.length, 'storie )');
console.log('  dal', start, 'a cadenza 1 post ogni', everyDays, 'giorni, ore', timeFeed);
