function value(src: any, next: any) {
  let k
  if (src && next && typeof src === 'object' && typeof next === 'object') {
    if (Array.isArray(next)) {
      for (k = 0; k < next.length; k++) {
        src[k] = value(src[k], next[k])
      }
    } else {
      for (k in next) {
        src[k] = value(src[k], next[k])
      }
    }
    return src
  }
  return next
}

export function merge(target: any, ...args: any) {
  let len: number = args.length
  for (let i = 0; i < len; i++) {
    target = value(target, args[i])
  }
  return target
}
