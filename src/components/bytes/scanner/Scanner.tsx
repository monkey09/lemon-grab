"use client"

import { Cameras } from './Cameras'
import { ScannerProps } from './types'
import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
import { deleteTracks, scanInit, startCamera } from './utils'

export const Scanner = ({ setBarcode, errors = false }: ScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>()
  const [camera, setCamera] = useState<string>()

  useEffect(() => {scanInit({ cameras, setCamera, setCameras, errors })}, [])

  useEffect(() => {
    if (camera) {
      const codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader()
      codeReader.timeBetweenDecodingAttempts = 2000
      startCamera({ codeReader, camera, errors, videoRef, setBarcode })
      return () => {
        codeReader.reset()
        deleteTracks({ videoRef })
      }
    }
  }, [camera])

  return (
    <>
      <Cameras {...{camera, cameras, setCamera}} />
      <video ref={videoRef} width="100%" disablePictureInPicture></video>
    </>
  )
}