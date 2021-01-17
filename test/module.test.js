import { setupTest, get } from '@nuxt/test-utils'

describe('My test', () => {
  setupTest({
    configFile: 'nuxt.config.ts',
    server: true
  })

  it('renders state', async () => {
    const { body } = await get('/')

    expect(body).toContain('{&quot;works&quot;:true}')
  })
})
