// Polyfill for TextEncoder in Jest test environment
global.TextEncoder = require("text-encoding").TextEncoder;
