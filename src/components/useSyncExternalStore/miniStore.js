let counter = 0
const listeners = new Set()

function emit() {
  listeners.forEach((cb) => cb())
}

export function getSimpleCount() {
  return counter
}

export function bumpSimpleCount() {
  counter += 1
  console.log('[useSyncExternalStore simple] bump →', counter)
  emit()
}

export function subscribeSimple(cb) {
  listeners.add(cb)
  console.log('[useSyncExternalStore simple] subscribe, listeners:', listeners.size)
  return () => {
    listeners.delete(cb)
    console.log('[useSyncExternalStore simple] unsubscribe, listeners:', listeners.size)
  }
}
