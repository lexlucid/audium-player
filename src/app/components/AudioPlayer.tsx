'use client'
import { JSX, SVGProps, useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import * as slider from "@/components/ui/slider"
import { PlayIcon } from "./icons/PlayIcon"
import { PauseIcon } from "./icons/PauseIcon"
import { SlSpeedometer } from "react-icons/sl";


export function AudioPlayer() {
    // state
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    // reference
    const audioPlayer = useRef<HTMLAudioElement | null>(null) // reference audio component
    const progressSlider = useRef<HTMLInputElement | null>(null) // reference progress slider

    useEffect(() => {
        if (audioPlayer.current && audioPlayer.current.readyState >= 2) {
            const seconds = Math.floor(audioPlayer.current.duration)
            setDuration(seconds)
            if (progressSlider.current) {
                progressSlider.current.max = seconds.toString() // update the code to set the max attribute as a string
            }
        }
    }, [audioPlayer?.current?.onloadedmetadata, audioPlayer?.current?.readyState])

    const calculateTime =  (sec: number) => {
        const minutes = Math.floor(sec / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(sec % 60)
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMinutes}:${returnedSeconds}`
    }

    const togglePlayPause = () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (audioPlayer.current) {
            if (!prevValue) {
                audioPlayer.current.play();
            } else {
                audioPlayer.current.pause();
            }
        }
    }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md mx-auto dark:bg-gray-900">
        <audio src="https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav" ref={audioPlayer}/>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <img
            alt="Album Cover"
            className="w-10 h-10 rounded-md object-cover"
            height="40"
            src="/placeholder.svg"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Audium Player</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Text-to-Speech</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            size="icon"
            variant="ghost"
          >
            <RewindIcon className="w-5 h-5" />
          </Button>
          <Button
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 rounded-full"
            size="lg"
            variant="ghost"
            onClick={togglePlayPause}
          >
            { isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" /> }
            
          </Button> 
          <Button
            className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 text-lg"
            size="icon"
            variant="ghost">
                2.5x
            </Button>
        </div>
        {/* <div className="flex items-center space-x-2">
            <Button
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                size="icon"
                variant="ghost"
            >
                <SlSpeedometer className="w-5 h-5" />
            </Button>
            <slider.Slider
                className="w-20 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300 [&_[role=slider]]:bg-gray-900 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-gray-900 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform dark:[&>span:first-child]:bg-gray-700 dark:[&_[role=slider]]:bg-gray-50 dark:[&>span:first-child_span]:bg-gray-50"
                defaultValue={[50]}
            />
        </div> */}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{calculateTime(currentTime)}</span>
        <slider.Slider
          className="flex-1 mx-4 [&>span:first-child]:h-1 [&>span:first-child]:bg-gray-300 [&_[role=slider]]:bg-gray-900 [&_[role=slider]]:w-full [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-gray-900 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform dark:[&>span:first-child]:bg-gray-700 dark:[&_[role=slider]]:bg-gray-50 dark:[&>span:first-child_span]:bg-gray-50"
          defaultValue={[0]}
          ref={progressSlider}
        />
        <span className="text-sm text-gray-500 dark:text-gray-400">
            {(duration && !isNaN(duration) && calculateTime(duration))}
        </span>
      </div>
    </div>
  )
}



function RewindIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 19 2 12 11 5 11 19" />
      <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
  )
}





function Volume2Icon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}