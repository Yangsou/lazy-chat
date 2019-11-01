export function parseLogger(m: string) {
  return `==============${m}==============`;
}

export function configLogger() {
  return {
    // optional : defaults to true if not specified
    isEnabled: true,
    // required ['debug', 'info', 'warn', 'error', 'fatal']
    logLevel: process.env.LOG_LEVEL || 'debug',
    // optional : defaults to false if not specified
    stringifyArguments: false,
    // optional : defaults to false if not specified
    showLogLevel: false,
    // optional : defaults to false if not specified
    showMethodName: false,
    // optional : defaults to '|' if not specified
    separator: '|',
    // optional : defaults to false if not specified
    showConsoleColors: false
  };
}
