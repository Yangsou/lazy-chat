export interface ILogger {
  debug(...params: any[]);
  info(...params: any[]);
  warn(...params: any[]);
  error(...params: any[]);
}
