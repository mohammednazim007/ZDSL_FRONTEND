/* eslint-disable import/no-extraneous-dependencies */
'use client'

import { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'

interface LottieAnimationProps {
  path: string
  width: number
  height: number
  loop?: boolean
  autoplay?: boolean
  style?: React.CSSProperties
}

const LottiePlay: React.FC<LottieAnimationProps> = ({
  path,
  width,
  height,
  loop = true,
  autoplay = true,
  style,
}) => {
  const animationContainer = useRef<HTMLDivElement>(null)
  let animationInstance: AnimationItem | null = null

  useEffect(() => {
    if (animationContainer.current)
      animationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop,
        autoplay,
        path,
      })

    return () => {
      if (animationInstance) animationInstance.destroy()
    }
  }, [path, loop, autoplay])

  return (
    <div
      ref={animationContainer}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
    />
  )
}

export default LottiePlay
