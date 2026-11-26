import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(dir, entry.name)
    return entry.isDirectory() ? sourceFiles(file) : /\.(jsx?|css)$/.test(file) ? [file] : []
  })
}
const files = sourceFiles(path.join(root, 'src'))
for (const file of files) {
  const source = fs.readFileSync(file, 'utf8')
  const label = path.relative(root, file)
  assert.doesNotMatch(source, /<(?:filter|feTurbulence|feDisplacementMap)\b/, `${label}: SVG raster filters must not be reintroduced`)
  assert.doesNotMatch(source, /backdrop-(?:blur|filter)|backdrop-filter\s*:/, `${label}: avoid backdrop sampling over scrolling pages`)
  assert.doesNotMatch(source, /background-attachment\s*:\s*fixed/, `${label}: avoid fixed tiled backgrounds`)
  assert.doesNotMatch(source, /@keyframes\s+fade-up/, `${label}: route-wide transformed animation must stay removed`)
}
for (const name of ['Home', 'Learn', 'Discover', 'Quest', 'Explore']) {
  const source = fs.readFileSync(path.join(root, 'src/views', `${name}.jsx`), 'utf8')
  assert.match(source, /className="route-view"/, `${name}: use a normal, non-transformed route root`)
}
const card = fs.readFileSync(path.join(root, 'src/components/CreatureShareCard.jsx'), 'utf8')
assert.match(card, /toBlob/, 'PNG export must remain available')
assert.match(card, /navigator\.share/, 'Native sharing must remain available')
const learn = fs.readFileSync(path.join(root, 'src/views/Learn.jsx'), 'utf8')
assert.match(learn, /youtube-nocookie/, 'Keep the Learn videos')
assert.match(learn, /learn\.refresh/, 'Keep fresh Learn content')
console.log(`PASS: ${files.length} source files; 5 route roots; no SVG raster filters, backdrop sampling, fixed backgrounds or route-wide transform animation. Sharing, PNG export and Learn content retained.`)
