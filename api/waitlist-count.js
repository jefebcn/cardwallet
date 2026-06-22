'use strict';
/* Endpoint pubblico: restituisce il conteggio reale degli iscritti alla waitlist. */

var SUPA_URL = 'https://pfgjsgnafgcbjrpoivgz.supabase.co';
var SUPA_KEY = process.env.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ2pzZ25hZmdjYmpycG9pdmd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDA4OTQsImV4cCI6MjA5NzY3Njg5NH0.q-4SqgrGo7LW0j9sPUzH_QTsgVNHRBxfUGvqJVGsp30';

module.exports = async function (req, res) {
  try {
    var r = await fetch(SUPA_URL + '/rest/v1/waitlist?select=*', {
      method: 'HEAD',
      headers: {
        'apikey': SUPA_KEY,
        'Authorization': 'Bearer ' + SUPA_KEY,
        'Prefer': 'count=exact',
      },
    });
    var range = r.headers.get('content-range') || '';
    var count = parseInt((range.split('/')[1] || '').trim(), 10);
    if (isNaN(count)) count = 0;
    res.setHeader('Cache-Control', 'public, max-age=20, s-maxage=20');
    res.status(200).json({ count: count });
  } catch (e) {
    res.status(200).json({ count: 0 });
  }
};
