import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion.js'

// Image version of Originkit's meshtexthover: same spring mesh, drawn over a picture.
const GRID_W = 48
const GRID_H = 54
const DRAG = 4.5
const SPRING_K = 0.08
const DAMPING = 0.9
const DT = 0.1
const CHROMA = 0.03
const MAX_POINTER_STEP = 0.6
const TAP_FORCE = 16
const REST = 0.0002
// How far around the pointer the mesh is pulled, in clip space.
const REACH = 0.11

const VERT_SRC = `#version 300 es
in vec2 aPos;
in vec2 aUv;
in vec2 aDisp;
out vec2 vUv;
out float vMag;
void main() {
  gl_Position = vec4(aPos + aDisp, 0.0, 1.0);
  vUv = aUv;
  vMag = length(aDisp);
}`

// Red and blue shift one way, green the other, giving magenta and green edges.
const FRAG_SRC = `#version 300 es
precision highp float;
in vec2 vUv;
in float vMag;
out vec4 outColor;
uniform sampler2D uTex;
void main() {
  vec2 offset = vec2(${CHROMA.toFixed(4)} * clamp(vMag * 6.0, 0.0, 1.0), 0.0);
  vec4 shifted = texture(uTex, vUv + offset);
  float green = texture(uTex, vUv - offset).g;
  outColor = vec4(shifted.r, green, shifted.b, 1.0);
}`

const proximityTo = (distance) => Math.max(0, 1 / (1 + distance / REACH) - 0.1)

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

function drawCover(picture, width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const fit = Math.max(width / picture.naturalWidth, height / picture.naturalHeight)
  const drawWidth = picture.naturalWidth * fit
  const drawHeight = picture.naturalHeight * fit
  canvas.getContext('2d').drawImage(picture, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight)
  return canvas
}

function createMesh(canvas, picture) {
  const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: true })
  if (!gl) return null

  const vertCount = (GRID_W + 1) * (GRID_H + 1)
  const positions = new Float32Array(vertCount * 2)
  const uvs = new Float32Array(vertCount * 2)
  const disp = new Float32Array(vertCount * 2)
  const vel = new Float32Array(vertCount * 2)

  for (let y = 0; y <= GRID_H; y += 1) {
    for (let x = 0; x <= GRID_W; x += 1) {
      const i = y * (GRID_W + 1) + x
      const u = x / GRID_W
      const v = y / GRID_H
      positions[i * 2] = u * 2 - 1
      positions[i * 2 + 1] = 1 - v * 2
      uvs[i * 2] = u
      uvs[i * 2 + 1] = v
    }
  }

  const indexCount = GRID_W * GRID_H * 6
  const indices = new Uint32Array(indexCount)
  let index = 0
  for (let y = 0; y < GRID_H; y += 1) {
    for (let x = 0; x < GRID_W; x += 1) {
      const a = y * (GRID_W + 1) + x
      const b = a + 1
      const c = a + GRID_W + 1
      const d = c + 1
      indices.set([a, c, b, b, c, d], index)
      index += 6
    }
  }

  const program = gl.createProgram()
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERT_SRC))
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC))
  gl.linkProgram(program)
  gl.useProgram(program)

  gl.bindVertexArray(gl.createVertexArray())

  const bindAttribute = (name, data, usage) => {
    const buffer = gl.createBuffer()
    const location = gl.getAttribLocation(program, name)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, usage)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0)
    return buffer
  }

  bindAttribute('aPos', positions, gl.STATIC_DRAW)
  bindAttribute('aUv', uvs, gl.STATIC_DRAW)
  const dispBuffer = bindAttribute('aDisp', disp, gl.DYNAMIC_DRAW)

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, drawCover(picture, canvas.width, canvas.height))
  gl.uniform1i(gl.getUniformLocation(program, 'uTex'), 0)
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clearColor(0, 0, 0, 0)

  const cursor = { x: 99, y: 99, px: 99, py: 99, inside: false }
  let frameId = 0

  const step = () => {
    let vx = cursor.x - cursor.px
    let vy = cursor.y - cursor.py
    if (Math.hypot(vx, vy) > MAX_POINTER_STEP) {
      vx = 0
      vy = 0
    }
    cursor.px = cursor.x
    cursor.py = cursor.y

    let energy = Math.abs(vx) + Math.abs(vy)

    for (let i = 0; i < vertCount * 2; i += 2) {
      const proximity = proximityTo(Math.hypot(cursor.x - (positions[i] + disp[i]), cursor.y - (positions[i + 1] + disp[i + 1])))
      vel[i] = (vel[i] + vx * DRAG * proximity - disp[i] * SPRING_K) * DAMPING
      vel[i + 1] = (vel[i + 1] + vy * DRAG * proximity - disp[i + 1] * SPRING_K) * DAMPING
      disp[i] = Math.min(1, Math.max(-1, disp[i] + vel[i] * DT))
      disp[i + 1] = Math.min(1, Math.max(-1, disp[i + 1] + vel[i + 1] * DT))
      energy = Math.max(energy, Math.abs(disp[i]), Math.abs(disp[i + 1]))
    }

    gl.clear(gl.COLOR_BUFFER_BIT)

    if (energy < REST) {
      disp.fill(0)
      vel.fill(0)
      frameId = 0
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, dispBuffer)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, disp)
    gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_INT, 0)
    frameId = requestAnimationFrame(step)
  }

  const wake = () => {
    if (!frameId) frameId = requestAnimationFrame(step)
  }

  return {
    move(x, y) {
      if (!cursor.inside) {
        cursor.px = x
        cursor.py = y
        cursor.inside = true
      }
      cursor.x = x
      cursor.y = y
      wake()
    },
    leave() {
      cursor.inside = false
      cursor.x = 99
      cursor.y = 99
      cursor.px = 99
      cursor.py = 99
    },
    tap(x, y) {
      for (let i = 0; i < vertCount * 2; i += 2) {
        const dx = positions[i] - x
        const dy = positions[i + 1] - y
        const distance = Math.hypot(dx, dy) || 1
        const proximity = proximityTo(distance)
        vel[i] += (dx / distance) * TAP_FORCE * proximity
        vel[i + 1] += (dy / distance) * TAP_FORCE * proximity
      }
      wake()
    },
    destroy() {
      cancelAnimationFrame(frameId)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}

function MeshImage({ src, alt, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const canvas = canvasRef.current
    const picture = new Image()
    let mesh = null
    let cancelled = false

    const toClip = (event) => [
      (event.offsetX / canvas.clientWidth) * 2 - 1,
      1 - (event.offsetY / canvas.clientHeight) * 2,
    ]
    const onMove = (event) => {
      if (event.pointerType !== 'touch') mesh?.move(...toClip(event))
    }
    const onLeave = () => mesh?.leave()
    const onDown = (event) => {
      if (event.pointerType === 'touch') mesh?.tap(...toClip(event))
    }

    picture.onload = () => {
      if (cancelled) return
      const scale = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * scale)
      canvas.height = Math.round(canvas.clientHeight * scale)
      mesh = createMesh(canvas, picture)
    }
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        nearby.disconnect()
        picture.src = src
      },
      { rootMargin: '300px' },
    )
    nearby.observe(canvas)

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerdown', onDown)

    return () => {
      cancelled = true
      nearby.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerdown', onDown)
      mesh?.destroy()
    }
  }, [src])

  return (
    <div className={`overflow-hidden ${className}`}>
      <img loading="lazy" decoding="async" src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
    </div>
  )
}

export default MeshImage
