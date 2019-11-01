export function swapMap(a: any[], i: number, j: number) {
  return a.map((v, k) => {
    switch (k) {
    case i: return a[j];
    case j: return a[i];
    default: return v;
    }
  });
}
