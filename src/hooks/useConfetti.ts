'use client'

import confetti from 'canvas-confetti'

export function useConfetti() {
  // Confetti básico
  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  // Explosão de confetti
  const fireExplosion = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  // Chuva de confetti
  const fireRain = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.4 },
        colors: ['#9333ea', '#c084fc', '#e879f9']
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.4 },
        colors: ['#9333ea', '#c084fc', '#e879f9']
      })
    }, 50)
  }

  // Confetti de celebração (para plano premium)
  const firePremiumCelebration = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 10000
    }

    const fire = (particleRatio: number, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFD700', '#FFA500', '#FF8C00']
    })
    fire(0.2, {
      spread: 60,
      colors: ['#9333ea', '#c084fc']
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#FFD700', '#9333ea']
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FFA500', '#c084fc']
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#FFD700', '#e879f9']
    })
  }

  // Confetti lateral (entrada)
  const fireSide = () => {
    const end = Date.now() + 1000

    const colors = ['#9333ea', '#c084fc', '#e879f9']

    ;(function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        zIndex: 10000
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        zIndex: 10000
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }

  // Confetti em forma de coração
  const fireHeart = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ['#FF0080', '#FF6090', '#FFA0C0'],
      zIndex: 10000
    }

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 1.2
      })

      confetti({
        ...defaults,
        particleCount: 25,
        scalar: 2
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
  }

  // Fogos de artifício
  const fireFireworks = () => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
        colors: ['#9333ea', '#c084fc', '#e879f9', '#FFD700']
      })
    }, 250)
  }

  return {
    fireConfetti,
    fireExplosion,
    fireRain,
    firePremiumCelebration,
    fireSide,
    fireHeart,
    fireFireworks
  }
}
