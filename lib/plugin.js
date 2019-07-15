import Storage from './storage'

export default function nuxtUniversalStorage(ctx, inject) {
  const options = <%= JSON.stringify(options, null, 2) %>

  // Create new instance of Storage class
  const storage = new Storage(ctx, options)

  // Inject into context as $storage
  ctx.$storage = storage
  inject('storage', storage)
}
