export function getSystemLanguages(): string[] {
  return <any> window.navigator.languages || [window.navigator.language];
}
