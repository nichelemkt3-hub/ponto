const API_URL = 'https://script.google.com/macros/s/AKfycbw6T084_OIjLNPikozHFm-5tA_WZAvRPC2Dyvw7WfdvuYJ2wdazgMszqY5naXWo5kyx/exec';

async function postAPI(payload) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return res.json();
}
