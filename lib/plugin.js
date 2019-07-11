import Storage from './storage'
import { serialize } from 'uri-js';

export default function nuxtUniversalStorage(ctx, inject) {
  const options=<%= JSON.stringify(options, null, 2) %>
  // Create new instance of Storage class
  const storage = new Storage(ctx, options)

  // Synchronise initial values
  for(let key in options.initialState) {
  storage.syncUniversal(key, options.initialState[key])
  }
  // Inject into context as $storage
  inject('storage', storage)
}
