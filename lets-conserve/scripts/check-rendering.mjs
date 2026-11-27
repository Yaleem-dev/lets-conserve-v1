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
assert.match(learn, /learn-explainer-list/, 'Keep the mobile list in the isolated card layout')
assert.match(learn, /data-explainer=\{topic\.id\}/, 'Each explainer must have one stable DOM identity')
assert.match(learn, /\/art\/ui\/learn-/, 'Affected decorative art must remain a bounded image, not a live SVG grid')
const app = fs.readFileSync(path.join(root, 'src/App.jsx'), 'utf8')
assert.match(app, /className="footer-columns"/, 'Keep the footer sections in their own paint containers')
const css = fs.readFileSync(path.join(root, 'src/index.css'), 'utf8')
assert.match(css, /contain:\s*layout paint/, 'Keep local paint containment')
for (const name of ['learn-climate', 'learn-biodiversity', 'learn-pollution', 'learn-circular', 'learn-forests', 'learn-ocean', 'learn-geography', 'footer-horizon', 'footer-symbols', 'footer-mark']) {
  const bytes = fs.readFileSync(path.join(root, 'public/art/ui', `${name}.png`))
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG', `${name}: PNG signature`)
  assert.ok(bytes.readUInt32BE(16) > 0 && bytes.readUInt32BE(20) > 0, `${name}: explicit non-zero dimensions`)
}
console.log(`PASS: ${files.length} source files; 5 route roots; 10 bounded decorative image assets; isolated Learn/footer paint; no SVG raster filters, backdrop sampling, fixed backgrounds or route-wide transform animation. Sharing, PNG export and Learn content retained.`)
