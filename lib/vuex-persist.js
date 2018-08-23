import pickBy from 'lodash/pickBy'
import merge from 'lodash/merge'

export default function (options) {
  let key = options.key || 'store'
  let storage = options.storage || (typeof window !== 'undefined' ? window.localStorage : {})

  // Set expiration strategy
  let expired = (state) => false
  if (options.expired && typeof expired === 'function') {
    expired = options.expired
  } else if (options.expireAfter && typeof options.expireAfter === 'number') {
    expired = (state) => state.timestamp < options.expireAfter
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
  let setState = (state) => storage.setItem(key, JSON.stringify({ data: state, timestamp: Date.now() }))
  let getState = () => JSON.parse(storage.getItem(key))
  let clearState = () => storage.removeItem(key)

  return store => {
    const savedState = getState()

    if (typeof savedState === 'object' && savedState !== null) {
      if (savedState.data && !expired(savedState)) {
        // Replace store state with persisted one, if it's not expired (Merges recursively)
        store.replaceState(merge(store.state, savedState.data))
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