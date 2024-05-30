const { WebClient } = require('@slack/web-api');
const { google } = require('googleapis');
const cron = require('node-cron');
require('dotenv').config();

const slackToken = process.env.SLACK_TOKEN;
const slackChannel = process.env.SLACK_CHANNEL;
const calendarId = process.env.CALENDAR_ID;
const googleApiKey = process.env.GOOGLE_API_KEY;

const slackClient = new WebClient(slackToken);

// Configure Google Calendar API
const calendar = google.calendar({ version: 'v3', auth: googleApiKey });

async function fetchEvents() {
  const today = new Date();
  const start = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const end = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  const response = await calendar.events.list({
    calendarId: calendarId,
    timeMin: start,
    timeMax: end,
    singleEvents: true,
    orderBy: 'startTime'
  });

  return response.data.items;
}

async function postEventsToSlack() {
  const events = await fetchEvents();
  if (events.length === 0) {
    await slackClient.chat.postMessage({
      channel: slackChannel,
      text: 'No events scheduled for today.'
    });
  } else {
    const eventList = events.map(event => {
      const start = event.start.dateTime || event.start.date;
      const end = event.end.dateTime || event.end.date;
      return `${start} - ${end}: ${event.summary}`;
    }).join('\n');

    await slackClient.chat.postMessage({
      channel: slackChannel,
      text: `Today's events:\n${eventList}`
    });
  }
}

// Schedule task to run at 10am every day
cron.schedule('0 10 * * *', postEventsToSlack);

// Run the bot
postEventsToSlack();
