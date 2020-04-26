import { createTest, destroyVM } from '../util'
import <%= CompName %> from 'packages/<%= compname %>'

describe('${CompName}', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(<%= CompName %>, true)
    expect(vm.$el).to.exist
  })
})