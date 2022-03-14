A Pomodoro timer is a simple application that keeps you focused and productive by scheduling work and break sessions consecutively. 

Pomodoro is a time management technique developed in the 1980s which uses a timer to break down work into intervals, traditionally 25 minutes in length, followed by five-minute breaks and a longer 15-minute break after four consecutive focus sessions. These will be triggered automatically after each session in the web application.

The countdown for each session will be reflected in the page title and the user will also be notified when transitioning between sessions with different play sounds for each session. 

When the webpage is first loaded, you can also allow notifications to enable the displaying of notifications when transitioning between sessions.	

## Prerequisites

Basic html, css and javascript

You must have [Node.js](https://nodejs.org/en/download/) and
[npm](https://www.npmjs.com/get-npm) installed on your machine. This project was
built against the following versions:

# Node v14.17.6
# npm v6.14.15

## Get started

Clone this repository to your local machine with:

`$ git clone https://github.com/Ecksdee03/pomodoro-timer.git`

`cd` into the downloaded directory

Next, run the following command to install the browser-sync dependency which is used to automatically refresh the browser once a file is changed.

`npm install`

Finally, start the app on http://localhost:3000 using the following command:

`npm start`

