import { toast } from "sonner"
import { DecodeOnce, DeleteTracks, ScanInit, StartCamera } from "./types"
import { ChecksumException, FormatException, NotFoundException } from "@zxing/library"

export const scanInit: ScanInit = async ({ 
  setCameras, setCamera, cameras, errors 
}) => {
  await navigator.mediaDevices.getUserMedia({audio: true, video: true})
  navigator.mediaDevices.enumerateDevices().then(devices => {
    devices = devices.filter(device => device.kind === 'videoinput')
    !cameras?.length && setCameras(devices)
    setCamera(devices[0].deviceId)
  }).catch(error => errors && toast.error(`Error enumerating devices: ${error}`))
}

export const startCamera: StartCamera = ({ 
  codeReader, camera, videoRef, errors, setBarcode
}) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: {deviceId: { exact: camera }}
    })
    .then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.setAttribute("playsinline", "true")
        videoRef.current.play().catch(() => {})
        decodeOnce({ camera, codeReader, setBarcode, errors, video: videoRef.current })
      }
    })
    .catch(error => errors && toast.error(`Error starting camera: ${error}`))
  } else errors && toast.error('Your browser does not support camera access')
}

export const decodeOnce: DecodeOnce = ({ 
  codeReader, video, camera, errors, setBarcode 
}) => {
  codeReader.decodeFromVideoDevice(camera!, video, 
    (result, err) => {
      if (result) {
        setBarcode(result.getText())
        // codeReader.reset()
        // deleteTracks()
      }
      if (err && !(
        err instanceof NotFoundException || 
        err instanceof ChecksumException || 
        err instanceof FormatException)) {
        errors && toast.error(`Error decoding barcode: ${err}`)
      }
    }
  )
}

export const deleteTracks: DeleteTracks = ({ videoRef }) => {
  if (videoRef.current && videoRef.current.srcObject) {
    const mediaStream: MediaStream = videoRef.current.srcObject as MediaStream
    mediaStream.getTracks().forEach(track => track.stop())
  }
}