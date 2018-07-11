export const isWhite = (color: string) =>
  ["white", "#fff", "#ffffff", "hsl(0, 0%, 100%)"].indexOf(color.toLowerCase()) > -1

// Maps strings deterministally to the same color. Avoids similar strings ending up with the same color.
export const colorMapper = (colors: string[]) => {
  return (str: string) => colors[hash32FNV1aUTF(str) % colors.length]
}

/*
* This FNV-1a hash algorithm, often simply called "fnv", disperses hashes throughout
* the 32-bit hash space with very good dispersion and is very fast.
*/
function hash32FNV1aUTF(str: string) {
  let c
  let i
  const l = str.length
  let t0 = 0
  let v0 = 0x9dc5
  let t1 = 0
  let v1 = 0x811c

  for (i = 0; i < l; i = i + 1) {
    c = str.charCodeAt(i)
    if (c < 128) {
      v0 ^= c
    } else if (c < 2048) {
      v0 ^= (c >> 6) | 192
      t0 = v0 * 403
      t1 = v1 * 403
      t1 += v0 << 8
      v1 = (t1 + (t0 >>> 16)) & 65535
      v0 = t0 & 65535
      v0 ^= (c & 63) | 128
    } else if ((c & 64512) === 55296 && i + 1 < l && (str.charCodeAt(i + 1) & 64512) === 56320) {
      i = i + 1
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(i) & 1023)
      v0 ^= (c >> 18) | 240
      t0 = v0 * 403
      t1 = v1 * 403
      t1 += v0 << 8
      v1 = (t1 + (t0 >>> 16)) & 65535
      v0 = t0 & 65535
      v0 ^= ((c >> 12) & 63) | 128
      t0 = v0 * 403
      t1 = v1 * 403
      t1 += v0 << 8
      v1 = (t1 + (t0 >>> 16)) & 65535
      v0 = t0 & 65535
      v0 ^= ((c >> 6) & 63) | 128
      t0 = v0 * 403
      t1 = v1 * 403
      t1 += v0 << 8
      v1 = (t1 + (t0 >>> 16)) & 65535
      v0 = t0 & 65535
      v0 ^= (c & 63) | 128
    } else {
      v0 ^= (c >> 12) | 224
      t0 = v0 * 403
      t1 = v1 * 403
      t1 += v0 << 8
      v1 = (t1 + (t0 >>> 16)) & 65535
      v0 = t0 & 65535
      v0 ^= ((c >> 6) & 63) | 128
      t0 = v0 * 403
      t1 = v1 * 403
      t1 += v0 << 8
      v1 = (t1 + (t0 >>> 16)) & 65535
      v0 = t0 & 65535
      v0 ^= (c & 63) | 128
    }
    t0 = v0 * 403
    t1 = v1 * 403
    t1 += v0 << 8
    v1 = (t1 + (t0 >>> 16)) & 65535
    v0 = t0 & 65535
  }

  return ((v1 << 16) >>> 0) + v0
}
