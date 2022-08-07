var colors = require('colors/safe');
var emoji = require('node-emoji');
colors.enable();

export function logServer(message: string, logEmoji: string = 'computer') {
  const current = new Date();
  console.log(
    emoji.get(logEmoji) +
      colors.green(' SERVER ') +
      colors.yellow(`${current.toLocaleTimeString()}`) +
      ':\t' +
      `${message}`,
  );
}

export function logError(message: string, logEmoji: string = 'no_entry') {
  const current = new Date();
  console.log(
    emoji.get(logEmoji) +
      colors.red(' ERROR ') +
      colors.yellow(`${current.toLocaleTimeString()}`) +
      ':\t' +
      colors.yellow(`${message}`),
  );
}
