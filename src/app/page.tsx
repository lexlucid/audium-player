import Image from "next/image";
import { AudioPlayer } from "./components/AudioPlayer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Audium Player</h1>
      <AudioPlayer />
    </main>
    
  )
}
