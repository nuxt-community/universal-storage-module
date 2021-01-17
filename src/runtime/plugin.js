import { Storage } from '~storage'

export default function nuxtUniversalStorage(ctx, inject) {
  let options = <%= JSON.stringify(options, null, 2) %>
  const cookie = <%= serialize(options.cookie) %>

  options = {
    ...options,
    cookie
  }

  // Create new instance of Storage class
  const storage = new Storage(ctx, options)

  // Inject into context as $storage
  ctx.$storage = storage
  inject('storage', storage)
}
