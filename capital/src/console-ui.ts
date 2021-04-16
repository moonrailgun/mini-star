import ConsoleLogHTML from 'console-log-html';

const container = document.createElement('ul');
document.body.appendChild(container);
ConsoleLogHTML.connect(container); // Redirect log messages
// ConsoleLogHTML.disconnect(); // Stop redirecting
