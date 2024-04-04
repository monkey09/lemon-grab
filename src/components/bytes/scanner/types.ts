import { BrowserMultiFormatReader } from "@zxing/library"
import { Dispatch, RefObject, SetStateAction } from "react"

export interface ScannerProps {
  setBarcode: (barcode: string) => void
  errors?: boolean
}

export interface CamerasProps {
  setCamera: Dispatch<SetStateAction<string | undefined>>
  cameras: MediaDeviceInfo[] | undefined
  camera: string | undefined
}

export interface ScanInit {
  (args: {
    setCameras: Dispatch<SetStateAction<MediaDeviceInfo[] | undefined>>
    setCamera: Dispatch<SetStateAction<string | undefined>>
    cameras: MediaDeviceInfo[] | undefined
    errors: boolean
  }): void
}

export interface StartCamera {
  (args: {
    videoRef: RefObject<HTMLVideoElement>
    codeReader: BrowserMultiFormatReader
    setBarcode: (barcode: string) => void
    errors: boolean
    camera: string
  }): void
}

export interface DecodeOnce {
  (args: {
    setBarcode: (barcode: string) => void
    codeReader: BrowserMultiFormatReader
    errors: boolean
    video: HTMLVideoElement
    camera: string
  }): void
}

export interface DeleteTracks {
  (args: {
    videoRef: RefObject<HTMLVideoElement>
  }): void
}