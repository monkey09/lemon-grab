import { 
  Select, 
  SelectItem, 
  SelectValue,
  SelectContent, 
  SelectTrigger, 
} from "@/components/ui/select"
import { CamerasProps } from "./types"

export const Cameras = ({ camera, setCamera, cameras }: CamerasProps) => {
  return (
    <Select onValueChange={setCamera} value={camera}>
      <SelectTrigger className="">
        <SelectValue placeholder="select camera" />
      </SelectTrigger>
      <SelectContent>
        {cameras?.map(item => (
          <SelectItem key={item.deviceId} value={item.deviceId}>{item.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}