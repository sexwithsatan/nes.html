import repaint from './repaint.js'
import fetchJson from './fetch-json.js'

// FIXME: Use dynamic import
import allocate from '@esnes/nes-nrom'

export default
async function emulate(scope, {rom, width, height}) {
  const [
    {program, graphics},
    palette
  ] = await Promise.all([
    allocate(rom),
    fetchJson(scope, '../palette.json')
  ])

  scope.addEventListener('nes:repaint:graphics', function ({detail}) {
    repaint(scope, {graphics, palette, width, height, ...detail})
  })
}