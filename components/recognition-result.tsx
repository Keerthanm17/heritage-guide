"use client"

import { useState } from "react"
import { CheckCircle, AlertCircle, ArrowRight, Languages, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { RecognitionDebugPanel } from "./recognition-debug-panel"

interface RecognitionResultProps {
  monumentId?: string
  monumentName?: string
  confidence?: number
  debugInfo?: any
  onViewDetails: () => void
}

export function RecognitionResult({
  monumentId,
  monumentName,
  confidence = 0,
  debugInfo,
  onViewDetails,
}: RecognitionResultProps) {
  const confidencePercent = Math.round(confidence * 100)
  const isHighConfidence = confidencePercent >= 75
  const isMediumConfidence = confidencePercent >= 60

  const getConfidenceColor = () => {
    if (isHighConfidence) return "text-green-500"
    if (isMediumConfidence) return "text-yellow-500"
    return "text-red-500"
  }

  const getProgressColor = () => {
    if (isHighConfidence) return "bg-green-200"
    if (isMediumConfidence) return "bg-yellow-200"
    return "bg-red-200"
  }

  return (
    <div className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            {isHighConfidence ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
            Computer Vision Analysis v24
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-primary">{monumentName}</h3>
            <p className="text-sm text-muted-foreground">Monument ID: {monumentId}</p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Confidence</span>
              <span className={getConfidenceColor()}>{confidencePercent}%</span>
            </div>
            <Progress value={confidencePercent} className={`h-2 ${getProgressColor()}`} />
          </div>

          {!isHighConfidence && (
            <div className="text-xs text-muted-foreground bg-amber-50 p-2 rounded">
              {isMediumConfidence
                ? "✨ Good visual match found! The computer vision system analyzed the image content and found reasonable similarities."
                : "🔍 The visual analysis shows moderate confidence. The system analyzed colors, shapes, and architectural features but needs a clearer image for better accuracy."}
            </div>
          )}

          {isHighConfidence && (
            <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
              🎯 High confidence visual match! The computer vision system successfully analyzed the image's colors,
              architectural features, and visual patterns to identify this monument.
            </div>
          )}

          {/* Single View Details Button */}
          <div className="pt-2">
            <button
              onClick={onViewDetails}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
            >
              View Monument Details
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Debug Panel */}
      <RecognitionDebugPanel debugInfo={debugInfo} />
    </div>
  )
}
