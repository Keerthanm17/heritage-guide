"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Eye, Zap, Target } from "lucide-react"

interface RecognitionDebugPanelProps {
  debugInfo?: any
}

export function RecognitionDebugPanel({ debugInfo }: RecognitionDebugPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!debugInfo) return null

  return (
    <Card className="mt-4 border-orange-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Computer Vision Analysis v24 (No Filename Dependency)
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Method Used */}
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Recognition Method
            </h4>
            <Badge variant="secondary">{debugInfo.method || "advanced_cv_analysis"}</Badge>
          </div>

          {/* Image Analysis Results */}
          {debugInfo.analysis && (
            <div>
              <h4 className="font-medium text-sm mb-2">Image Analysis</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-medium">Dominant Colors:</span>
                  <div className="flex gap-1 mt-1">
                    {debugInfo.analysis.dominantColors?.map((color: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-medium">Detected Shapes:</span>
                  <div className="flex gap-1 mt-1">
                    {debugInfo.analysis.shapes?.map((shape: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {shape}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-medium">Architectural Features:</span>
                  <div className="flex gap-1 mt-1">
                    {debugInfo.analysis.features?.map((feature: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Visual Analysis Scores */}
          {debugInfo.breakdown && (
            <div>
              <h4 className="font-medium text-sm mb-2">Scoring Breakdown</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Color Matching (40%):</span>
                  <Badge variant="outline">{debugInfo.breakdown.colorScore?.toFixed(1) || 0}/40</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Architectural Features (35%):</span>
                  <Badge variant="outline">{debugInfo.breakdown.featureScore?.toFixed(1) || 0}/35</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Visual Profile (25%):</span>
                  <Badge variant="outline">{debugInfo.breakdown.profileScore?.toFixed(1) || 0}/25</Badge>
                </div>
              </div>
            </div>
          )}

          {/* Processing Information */}
          {debugInfo.processingTime && (
            <div>
              <h4 className="font-medium text-sm mb-2">Processing Info</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Processing Time:</span>
                  <Badge variant="secondary">{debugInfo.processingTime}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Visual Quality:</span>
                  <Badge variant="secondary">{debugInfo.visualQuality || "Medium"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Analysis Method:</span>
                  <Badge variant="default">Computer Vision v24</Badge>
                </div>
              </div>
            </div>
          )}

          {/* Top Matches */}
          {debugInfo.topMatches && (
            <div>
              <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                <Target className="h-3 w-3" />
                Top Matches
              </h4>
              <div className="space-y-1">
                {debugInfo.topMatches.map((match: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span>{match.name}</span>
                    <Badge variant={idx === 0 ? "default" : "secondary"} className="text-xs">
                      {match.score?.toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Score Breakdown */}
          {debugInfo.score && (
            <div>
              <h4 className="font-medium text-sm mb-2">Final Score</h4>
              <div className="text-xs">
                <div className="flex justify-between">
                  <span>Recognition Score:</span>
                  <Badge variant="default">{debugInfo.score.toFixed(1)}/100</Badge>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
