import pickBy from 'lodash/pickBy'
import merge from 'lodash/merge'

let noop = () => {}

/**
 * Creator of vuex plugin
 *
 * @param {Object} options
 * @param {String} options.key
 * @param {Storage} options.storage
 * @param {function(boolean)} options.expired - Returns true if savedState is not valid and should be cleared
 * @param {Number} options.expireAfter - Sets expiration time limit. (shouldn't appear with expired)
 * @param {function(boolean)} options.filter - Ignores some mutations
 * @param {function(Object)} options.reducer - Reduce state for persistence
 * @param {Array} options.only - Defines only keys in state to be persist (shouldn't appear with `ignore` or `reducer`)
 * @param {Array} options.ignore - Defines keys to ignore in state to be persist (shouldn't appear with `only` or `reducer`)
 * @returns {function(*)}
 */
export default function (options) {
  let key = options.key || 'store'
  let storage = options.storage || (typeof window !== 'undefined' ? window.localStorage : {})
  if (!storage) {
    throw new function () { this.msg = 'Storage is not valid.' }()
  }

  // Set expiration strategy
  let expired = (state) => false
  if (options.expired && typeof expired === 'function') {
    expired = options.expired
  } else if (options.expireAfter && typeof options.expireAfter === 'number') {
    expired = (state) => Date.now() > state.timestamp + options.expireAfter * 1000
  }

  // Set filters for mutations (ignores some mutations to sync with storage)
  let filter = (mutation) => true
  if (options.filter && typeof options.filter === 'function') {
    filter = options.filter
  }

  // Sets a reducer to define which keys of state needed to be persisted
  let reducer = (state) => state
  if (options.reducer && typeof options.reducer === 'function') {
    reducer = options.reducer
  } else if (options.only) {
    reducer = (state) => pickBy(state, (value, key) => options.only.indexOf(key) >= 0)
  } else if (options.ignore) {
    reducer = (state) => pickBy(state, (value, key) => options.ignore.indexOf(key) === -1)
  }

  // Initial Getter, Setter, Clear for defined storage
  let setState = noop
  let getState = noop
  let clearState = noop
  if (storage.setItem && storage.getItem && storage.removeItem) {
    setState = (state) => storage.setItem(key, JSON.stringify({ data: state, timestamp: Date.now() }))
    getState = () => JSON.parse(storage.getItem(key))
    clearState = () => storage.removeItem(key)
  }

  return store => {
    const savedState = getState()

    if (typeof savedState === 'object' && savedState !== null) {
      if (savedState.data && !expired(savedState)) {
        // Replace store state with persisted one, if it's not expired (Merges recursively)
        // SetTimeout is used to prevent SSR to unexpectedly change state
        setTimeout(() => {
          store.replaceState(merge({}, store.state, savedState.data))
        }, 1);
      } else {
        // Clear state if expired
        clearState()
      }
    }

    // Listen to all mutations that passes the filter to persist the state
    store.subscribe((mutation, state) => {
      if (filter(mutation)) {
        setState(reducer(state))
      }
    })
  }
}