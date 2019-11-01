export function camelCaseToPascal(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export function sanitizeString(s: string): string {
  let slug = '';
  // Change to lower case
  const titleLower = s.toLowerCase();
  // Letter "e"
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
  // Letter "a"
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
  // Letter "o"
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
  // Letter "u"
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
  // Letter "i"
  slug = slug.replace(/i|ì|í|ỉ|ĩ|ị/gi, 'i');
  // Letter "d"
  slug = slug.replace(/đ/gi, 'd');
  // Trim the last whitespace
  slug = slug.replace(/\s*$/g, '');

  return slug;
}

export function multiLineText(s: string): string {
  return s.replace(/[^(\s)(\d)\.\,]/g, (x) => `\n${x}`).replace('/', '÷ \n').replace('*', '× \n');
}

export function expresstionToArray(s: string): string[] {
  return s.replace(/[^(\s)(\d)\.\,]/g, (x) => `\n${x}`)
    .replace(/[(\*)(\/)(\+)]/g, '')
    .split('\n')
    .filter((e) => e !== '');
}

export function formatCurrency(n: any) {
  n = n.toString();
  if (/\./.test(n)) {
    return n.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  }

  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  // return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

}
