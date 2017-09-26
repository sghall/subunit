import { select } from 'subunit'
import { scaleLinear, scaleBand } from 'd3-scale'
import { range, extent } from 'd3-array'
import THREE from './three'

const data = range(50).map(d => ({ frequency: (d + 1) * 200 }))

let bars, renderer, scene, camera, geometry, material, mesh

const size = [window.innerWidth, window.innerHeight]

function init() {
  renderer = new THREE.WebGLRenderer()
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.gammaInput = true
  renderer.gammaOutput = true

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, size[0] / size[1], 1, 2000)
  camera.position.set(0, 700, 700)

  const controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.minDistance = 20
  controls.maxDistance = 2000

  const ambient = new THREE.AmbientLight(0xffffff, 0.1)
  scene.add(ambient)

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.position.set(0, 500, 0)
  spotLight.angle = Math.PI / 4
  spotLight.penumbra = 0.05
  spotLight.decay = 2
  spotLight.distance = 1200
  spotLight.castShadow = true
  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024
  spotLight.shadow.camera.near = 10
  spotLight.shadow.camera.far = 2000
  scene.add(spotLight)

  material = new THREE.MeshPhongMaterial({
    color: 0x808080,
    dithering: true,
  })

  geometry = new THREE.BoxBufferGeometry(2000, 1, 2000)
  mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(0, -201, 0)
  mesh.receiveShadow = true
  scene.add(mesh)

  material = new THREE.MeshPhongMaterial({
    color: 0x00bcd4,
    dithering: true,
  })

  controls.update()
  window.addEventListener('resize', onResize, false)

  const barSize = [600, 300]

  const x = scaleBand()
    .padding(0.2)
    .range([0, barSize[0]])

  const y = scaleLinear().range([barSize[1], 0])

  x.domain(range(data.length))
  y.domain(extent(data, d => d.frequency))

  const rootNode = select(scene)
  const container = rootNode.append('object')
  container.node().position.set(-barSize[0] / 2, -100, 0)

  const sorted = data.sort((a, b) => {
    return b.frequency - a.frequency
  })

  bars = container
    .selectAll('bar')
    .data(() => {
      return sorted
    })
    .enter()
    .append('mesh')
    .attr('tags', 'bar')
    .attr('material', material)
    .attr('geometry', d => {
      const w = x.bandwidth()
      const h = barSize[1] - y(d.frequency)
      return new THREE.BoxGeometry(w, h, 5)
    })
    .each(function setBarPosition(d, i) {
      const x0 = x(i) + x.bandwidth() / 2
      const y0 = barSize[1] / 2
      this.castShadow = true
      this.position.set(x0, y0, 0)
    })
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function updateBars(d, i) {
  this.rotation.x += 0.001 * ((i + 1) * 2)
}

function render() {
  requestAnimationFrame(render)
  bars.each(updateBars)
  renderer.render(scene, camera)
}

init()
render()
