////////////////////////
// Google Analytics
////////////////////////
// Script that holds on to a visitor and is referenced when a visitor makes a action
import ua from 'universal-analytics';
import { LoadSettings } from 'lib/settings';

const settings = LoadSettings();
const GA = {};

GA.visitor = null;
GA.active = false;
if (
  settings.sendUsageData == null ||
  settings.sendUsageData == undefined ||
  Boolean(settings.sendUsageData) == true
) {
  GA.visitor = ua('UA-117808839-1');
  GA.active = true;
  GA.visitor.set('ul', settings.local || 'en');
}

// Send Screen
// Send A Screen Event to Google, this is like a url hit for websites
// Input :
//     ScreenTitle || String || The Screen To Post
GA.SendScreen = function(ScreenTitle) {
  if (GA.active == false) return;

  GA.visitor.screenview(ScreenTitle, 'Nexus Wallet', APP_VERSION).send();
  console.log(GA.visitor);
  console.log('Sent Screen: ' + ScreenTitle);
};

// Send Event
// Send A regular event to google
// Input :
//     category || String || Event Category, grand scheme
//     action   || String || Event Action, group of events
//     label    || String || Event Label, The actual event being fired
//     value    || NonNegative Int || Event Value, must be NonNegative

GA.SendEvent = function(category, action, lable, value) {
  if (GA.active == false) return;
  GA.visitor.event(category, action, lable, value).send();
};

// Disable Analytics
// Turn off anayltics and destroys the old object
GA.DisableAnalytics = function() {
  if (GA.visitor == null) return;
  GA.visitor = null;
  GA.active = false;
};

// Enable Analytics
// Turn on Analytics and create a new visitor
GA.EnableAnalytics = function() {
  if (GA.visitor != null) return;
  GA.visitor = ua('UA-117808839-1');
  GA.active = true;
  GA.visitor.set('ul', settings.local || 'en');
};

export default GA;
