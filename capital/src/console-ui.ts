import ConsoleLogHTML from 'console-log-html';

const container = document.createElement('ul');
container.className = 'console-log';
document.body.appendChild(container);
ConsoleLogHTML.connect(container); // Redirect log messages
// ConsoleLogHTML.disconnect(); // Stop redirecting
