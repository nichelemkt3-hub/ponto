const API_URL = 'https://script.google.com/macros/s/AKfycbwvZP_6-UFLnGb23viNtwf2GJ5aEaAK0zuj171SYOnFsEEwDyEqZBuRQRnea8-ejUYBKA/exec';

async function api(payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.json();
}
