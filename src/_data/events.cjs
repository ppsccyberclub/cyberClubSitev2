const ical = require('node-ical');

module.exports = async function() {
  // The raw public .ics URL from Google Calendar
  const ICS_URL = 'https://calendar.google.com/calendar/ical/ppsccyberclub%40gmail.com/public/basic.ics';

  try {
    // Node fetches the raw text feed — zero CORS errors, zero iframes
    const rawEvents = await ical.async.fromURL(ICS_URL);
    
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Include events happening today

    return Object.values(rawEvents)
      .filter(item => item.type === 'VEVENT' && item.start)
      .map(event => {
        const start = new Date(event.start);
        return {
          title: event.summary || 'Club Meeting',
          date: start,
          description: event.description ? event.description.trim() : '',
          formattedDate: start.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }),
          formattedTime: start.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
          })
        };
      })
      // Drop past events automatically:
      .filter(e => e.date >= now)
      // Sort upcoming events closest to farthest:
      .sort((a, b) => a.date - b.date);

  } catch (err) {
    console.error('Calendar fetch error:', err);
    return [];
  }
};