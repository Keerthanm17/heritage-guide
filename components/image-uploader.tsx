"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Upload, Loader2, Camera, RefreshCw, ImageIcon, Eye, GitCompare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RecognitionResult } from "@/components/recognition-result"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ImageUploader() {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isViewingDetails, setIsViewingDetails] = useState(false)
  const [isComparing, setIsComparing] = useState(false)
  const [recognitionResult, setRecognitionResult] = useState<{
    monumentId?: string
    monumentName?: string
    confidence?: number
  } | null>(null)
  const [activeTab, setActiveTab] = useState<string>("upload")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreamActive, setIsStreamActive] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      })
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
      })
      return
    }

    setImage(file)
    setRecognitionResult(null)

    // Create a preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const startCamera = async () => {
    try {
      if (!videoRef.current) return

      // Stop any existing stream
      if (isStreamActive && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }

      // Start a new stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      videoRef.current.srcObject = stream
      setIsStreamActive(true)

      // Reset any previous capture
      setImage(null)
      setPreview(null)
      setRecognitionResult(null)

      toast({
        title: "Camera activated",
        description: "Point your camera at an Indian monument and capture.",
      })
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        title: "Camera access failed",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      })
    }
  }

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current || !isStreamActive) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (!blob) return

        // Create a File object from the blob
        const capturedImage = new File([blob], "captured-monument.jpg", { type: "image/jpeg" })

        // Set the captured image as the current image
        setImage(capturedImage)

        // Create a preview
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(capturedImage)

        // Stop the camera stream
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream
          stream.getTracks().forEach((track) => track.stop())
          setIsStreamActive(false)
        }

        toast({
          title: "Image captured",
          description: "Your monument image has been captured successfully.",
        })
      },
      "image/jpeg",
      0.95,
    )
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreamActive(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    // Stop camera if switching away from capture tab
    if (value !== "capture" && isStreamActive) {
      stopCamera()
    }

    // Start camera if switching to capture tab
    if (value === "capture" && !isStreamActive) {
      startCamera()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image) {
      toast({
        title: "No image selected",
        description: "Please select or capture an image to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate progress with 2-second duration
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + 5
      })
    }, 100)

    try {
      const formData = new FormData()
      formData.append("image", image)

      const response = await fetch("/api/image-recognition", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error(`Failed to process image: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (data.monumentId) {
        // Store the uploaded image in sessionStorage
        if (preview) {
          sessionStorage.setItem(`uploaded_image_${data.monumentId}`, preview)
        }

        setRecognitionResult({
          monumentId: data.monumentId,
          monumentName: data.monumentName,
          confidence: data.confidence,
        })

        toast({
          title: "Monument recognized!",
          description: `We identified this as ${data.monumentName} with ${Math.round(
            (data.confidence || 0) * 100,
          )}% confidence.`,
        })
      } else {
        toast({
          title: "Monument not recognized",
          description: data.error || "We couldn't identify this monument. Please try another image.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleViewDetails = async () => {
    if (recognitionResult?.monumentId) {
      setIsViewingDetails(true)

      // 2-second loading animation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      router.push(`/monument/${recognitionResult.monumentId}`)
      setIsViewingDetails(false)
    }
  }

  const handleCompareMonuments = async () => {
    setIsComparing(true)

    // 2-second loading animation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    router.push("/compare")
    setIsComparing(false)
  }

  const handleReset = () => {
    setImage(null)
    setPreview(null)
    setRecognitionResult(null)
    setUploadProgress(0)

    // If on capture tab, restart the camera
    if (activeTab === "capture") {
      startCamera()
    }
  }

  return (
    <Card className="w-full content-container">
      <CardContent>
        <Tabs defaultValue="upload" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Upload Image
            </TabsTrigger>
            <TabsTrigger value="capture" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Capture Image
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed rounded-lg p-4 w-full h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors relative overflow-hidden"
                  onClick={() => document.getElementById("image-input")?.click()}
                >
                  {preview ? (
                    <div className="relative w-full h-full">
                      <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-contain" />
                      <Badge className="absolute top-2 right-2 bg-primary/80">
                        {image?.name?.split(".").pop()?.toUpperCase()}
                      </Badge>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-primary mb-2" />
                      <p className="text-sm text-center">
                        Click to upload or drag and drop
                        <br />
                        JPG, PNG, or WEBP (max 10MB)
                      </p>
                    </>
                  )}
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={isUploading}
                  />
                </div>

                {preview && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {image?.name} ({Math.round((image?.size || 0) / 1024)} KB)
                    </p>
                    <Button variant="ghost" size="sm" onClick={handleReset} disabled={isUploading}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center">
                {recognitionResult ? (
                  <div className="w-full space-y-4">
                    <RecognitionResult
                      monumentId={recognitionResult.monumentId}
                      monumentName={recognitionResult.monumentName}
                      confidence={recognitionResult.confidence}
                      onViewDetails={handleViewDetails}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <Button onClick={handleViewDetails} disabled={isViewingDetails} className="w-full">
                        {isViewingDetails ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading Details...
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            View Monument Details
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={handleCompareMonuments}
                        disabled={isComparing}
                        className="w-full"
                      >
                        {isComparing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading Comparison...
                          </>
                        ) : (
                          <>
                            <GitCompare className="mr-2 h-4 w-4" />
                            Compare Monuments
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      Upload an image of an Indian monument to see the recognition result here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="capture">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-2 rounded-lg p-4 w-full h-64 flex flex-col items-center justify-center relative overflow-hidden">
                  {preview ? (
                    <div className="relative w-full h-full">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Captured"
                        className="w-full h-full object-contain"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary/80">CAPTURED</Badge>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover rounded-md" />
                      {isStreamActive && (
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                          <Badge className="bg-green-500/80 animate-pulse">Camera Active</Badge>
                        </div>
                      )}
                    </div>
                  )}
                  <canvas ref={canvasRef} className="hidden" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  {!preview ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={isStreamActive ? stopCamera : startCamera}
                        className="flex-1"
                      >
                        {isStreamActive ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset Camera
                          </>
                        ) : (
                          <>
                            <Camera className="h-4 w-4 mr-2" />
                            Start Camera
                          </>
                        )}
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={captureImage}
                        disabled={!isStreamActive}
                        className="flex-1"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Capture
                      </Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={handleReset} disabled={isUploading} className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                {recognitionResult ? (
                  <div className="w-full space-y-4">
                    <RecognitionResult
                      monumentId={recognitionResult.monumentId}
                      monumentName={recognitionResult.monumentName}
                      confidence={recognitionResult.confidence}
                      onViewDetails={handleViewDetails}
                    />

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <Button onClick={handleViewDetails} disabled={isViewingDetails} className="w-full">
                        {isViewingDetails ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading Details...
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            View Monument Details
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={handleCompareMonuments}
                        disabled={isComparing}
                        className="w-full"
                      >
                        {isComparing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading Comparison...
                          </>
                        ) : (
                          <>
                            <GitCompare className="mr-2 h-4 w-4" />
                            Compare Monuments
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">
                      {preview
                        ? "Click 'Identify Monument' to recognize this image."
                        : "Capture an image of an Indian monument to see the recognition result here."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isUploading && (
          <div className="space-y-2 mt-4">
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              {uploadProgress < 30
                ? "Uploading image..."
                : uploadProgress < 60
                  ? "Analyzing visual features..."
                  : uploadProgress < 90
                    ? "Matching monument patterns..."
                    : "Finalizing recognition..."}
            </p>
          </div>
        )}

        <Button type="submit" className="w-full mt-6" disabled={!image || isUploading} onClick={handleSubmit}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Identifying Monument...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Identify Monument
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
