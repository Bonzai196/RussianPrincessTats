document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('bookingForm');
  const statusEl = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    // If no action attribute (no backend), switch to mailto fallback.
    if (!form.getAttribute('action')) {
      // Compose mailto
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Tattoo Booking Request');
      let body = '';
      for (const [k,v] of data.entries()) {
        if (k === 'attachments') continue;
        body += `${k}: ${v}\n`;
      }
      window.location.href = `mailto:booking@example.com?subject=${subject}&body=${encodeURIComponent(body)}`;
      return;
    }

    e.preventDefault();
    statusEl.textContent = 'Submitting…';
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Request sent! Check your email in a few days.';
      } else {
        throw new Error('Network response not ok');
      }
    } catch(err) {
      statusEl.textContent = 'Submission failed. You can email directly: booking@example.com';
      console.error(err);
    }
  });
});pie