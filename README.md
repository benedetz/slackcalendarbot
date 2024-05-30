# Slack Calendar Bot
A Node.js bot that posts the day's Google Calendar events to a Slack channel every day at 10am.

Features

Fetches events from a specified Google Calendar.
Posts the events to a specified Slack channel at 10am each day.
Utilizes node-cron for scheduling daily tasks.
Prerequisites

Node.js and npm installed.
Google Calendar API enabled.
Slack app with a bot user.
Setup

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/slack-calendar-bot.git
cd slack-calendar-bot
Install dependencies:

bash
Copy code
npm install
Configure environment variables:

Create a .env file in the root of the project and add the following variables:

env
Copy code
SLACK_TOKEN=xoxb-your-slack-bot-token
SLACK_CHANNEL=#your-channel
CALENDAR_ID=your-calendar-id
GOOGLE_API_KEY=your-google-api-key
SLACK_TOKEN: Your Slack bot token.
SLACK_CHANNEL: The Slack channel ID where the bot will post messages.
CALENDAR_ID: The ID of the Google Calendar you want to fetch events from.
GOOGLE_API_KEY: Your Google API key.
Running the Bot

Run the bot:

bash
Copy code
node bot.js
This will start the bot and schedule it to post daily at 10am.

Deploying

To run your bot continuously, consider deploying it to a cloud service like Heroku, AWS, or a VPS.

Example Deployment on Heroku
Login to Heroku:

bash
Copy code
heroku login
Create a new Heroku app:

bash
Copy code
heroku create your-app-name
Add environment variables to Heroku:

bash
Copy code
heroku config:set SLACK_TOKEN=xoxb-your-slack-bot-token
heroku config:set SLACK_CHANNEL=#your-channel
heroku config:set CALENDAR_ID=your-calendar-id
heroku config:set GOOGLE_API_KEY=your-google-api-key
Push code to Heroku:

bash
Copy code
git push heroku master
Customization

Change Posting Time:
Modify the cron schedule in bot.js to change the posting time. The current schedule cron.schedule('0 10 * * *', postEventsToSlack); is set to 10am daily.

Error Handling and Logging:
Add additional error handling and logging as needed to make the bot more robust.

Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

License

This project is licensed under the MIT License. See the LICENSE file for details.

