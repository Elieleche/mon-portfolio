import { useRef, useEffect } from 'react'

const PIXEL_COUNT = 300

function rand(min, max) { return Math.random() * (max - min) + min }

export default function GlitchCanvas({ intensity = 1 }) {
  const canvasRef = useRef(null)
  const pixelsRef = useRef([])
  const intensityRef = useRef(intensity)
  const convergeRef = useRef({ progress: 0, done: false })
  intensityRef.current = intensity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let gridCols = 0
    let gridRows = 0

    function resize() {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
      const w = canvas.width
      const h = canvas.height
      gridCols = Math.ceil(Math.sqrt(PIXEL_COUNT * (w / h)))
      gridRows = Math.ceil(PIXEL_COUNT / gridCols)
      init()
    }

    function init() {
      const w = canvas.width
      const h = canvas.height
      const p = []
      for (let i = 0; i < PIXEL_COUNT; i++) {
        const col = i % gridCols
        const row = Math.floor(i / gridCols)
        const cellW = w / gridCols
        const cellH = h / gridRows
        p.push({
          x: rand(0, w),
          y: rand(0, h),
          tx: col * cellW + cellW / 2,
          ty: row * cellH + cellH / 2,
          targetSize: Math.max(cellW, cellH) + 1,
          size: rand(1.5, 5),
          baseAlpha: rand(0.1, 0.6),
          glitchTimer: rand(0, 120),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.15, 0.15),
          flickerSpeed: rand(0.02, 0.08),
        })
      }
      pixelsRef.current = p
    }

    let frame = 0
    let convergeProgress = 0
    let convergeDone = false

    function draw() {
      frame++
      const w = canvas.width
      const h = canvas.height
      if (w === 0 || h === 0) { animId = requestAnimationFrame(draw); return }

      const p = pixelsRef.current
      const currentIntensity = intensityRef.current
      const shouldConverge = currentIntensity < 0.06 && !convergeDone

      if (shouldConverge) {
        convergeProgress = Math.min(convergeProgress + 0.025, 1)

        // Draw all pixels converging to grid
        for (let i = 0; i < p.length; i++) {
          const pix = p[i]

          // Rush toward target grid position with easing
          const ease = 0.12 + convergeProgress * 0.15
          pix.x += (pix.tx - pix.x) * ease
          pix.y += (pix.ty - pix.y) * ease

          // Grow to fill cell
          pix.size += (pix.targetSize - pix.size) * 0.1

          ctx.fillStyle = `rgba(212, 255, 0, ${Math.min(1, convergeProgress * 2)})`
          ctx.fillRect(pix.x - pix.size / 2, pix.y - pix.size / 2, pix.size, pix.size)
        }

        // Solid green overlay at the end
        if (convergeProgress >= 0.85) {
          ctx.fillStyle = '#D4FF00'
          ctx.fillRect(0, 0, w, h)
        }

        if (convergeProgress >= 1) {
          convergeDone = true
          convergeRef.current.done = true
        }

        animId = requestAnimationFrame(draw)
        return
      }

      if (convergeDone) {
        // Freeze on solid green
        animId = requestAnimationFrame(draw)
        return
      }

      // ─── Normal glitch mode ───
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < p.length; i++) {
        const pix = p[i]
        pix.glitchTimer--

        if (pix.glitchTimer <= 0) {
          if (Math.random() < 0.25 * currentIntensity) {
            pix.x = rand(0, w)
            pix.y = rand(0, h)
          }
          if (Math.random() < 0.4 * currentIntensity) {
            pix.x += rand(-15, 15) * currentIntensity
          }
          pix.glitchTimer = rand(20, 100) / Math.max(0.1, currentIntensity)
        }

        pix.x += pix.vx * currentIntensity
        pix.y += pix.vy * currentIntensity

        if (pix.x < -10) pix.x = w + 10
        if (pix.x > w + 10) pix.x = -10
        if (pix.y < -10) pix.y = h + 10
        if (pix.y > h + 10) pix.y = -10

        const flicker = 0.7 + Math.sin(frame * pix.flickerSpeed + i) * 0.3
        const alpha = pix.baseAlpha * currentIntensity * flicker

        if (alpha < 0.01) continue

        ctx.fillStyle = `rgba(212, 255, 0, ${alpha})`
        ctx.fillRect(pix.x, pix.y, pix.size, pix.size)

        if (currentIntensity > 0.5 && Math.random() < 0.002 * currentIntensity) {
          ctx.fillStyle = `rgba(212, 255, 0, ${alpha * 2})`
          ctx.fillRect(pix.x - 1, pix.y - 1, pix.size + 2, pix.size + 2)
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
