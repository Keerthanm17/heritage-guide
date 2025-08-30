"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Zap, Target, Cpu, FileImage } from "lucide-react"

export function ModelInfoDisplay() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Monument Recognition Model Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Model Architecture
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Model:</span>
                <Badge variant="secondary">ResNet50</Badge>
              </div>
              <div className="flex justify-between">
                <span>Pre-training:</span>
                <Badge variant="secondary">ImageNet</Badge>
              </div>
              <div className="flex justify-between">
                <span>Input Size:</span>
                <Badge variant="outline">224×224×3</Badge>
              </div>
              <div className="flex justify-between">
                <span>Output Classes:</span>
                <Badge variant="outline">28 monuments</Badge>
              </div>
              <div className="flex justify-between">
                <span>Model File:</span>
                <Badge variant="destructive">monument_classifier_v2.h5</Badge>
              </div>
              <div className="flex justify-between">
                <span>Web Format:</span>
                <Badge variant="destructive">model.json + *.bin</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Database className="h-4 w-4" />
              Training Dataset
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Images:</span>
                <Badge variant="secondary">3,700+ images</Badge>
              </div>
              <div className="flex justify-between">
                <span>Images per Monument:</span>
                <Badge variant="secondary">100+ images</Badge>
              </div>
              <div className="flex justify-between">
                <span>Image Resolution:</span>
                <Badge variant="outline">800×800 minimum</Badge>
              </div>
              <div className="flex justify-between">
                <span>Data Split:</span>
                <Badge variant="outline">80% train, 20% val</Badge>
              </div>
              <div className="flex justify-between">
                <span>Augmentation:</span>
                <Badge variant="secondary">Rotation, Zoom, Brightness</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Target className="h-4 w-4" />
            Expected Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-xs text-green-700">Validation Accuracy</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-xs text-blue-700">Top-3 Accuracy</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">2-3s</div>
              <div className="text-xs text-purple-700">Inference Time</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg border">
              <div className="text-2xl font-bold text-orange-600">15MB</div>
              <div className="text-xs text-orange-700">Model Size</div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Technical Implementation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Training Configuration:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Optimizer: Adam with learning rate scheduling</li>
                <li>• Batch Size: 32</li>
                <li>• Epochs: 50 + 20 fine-tuning</li>
                <li>• Loss: Categorical Crossentropy</li>
                <li>• Early Stopping: Patience 10</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Deployment:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Framework: TensorFlow.js</li>
                <li>• Runtime: Browser-based inference</li>
                <li>• Format: JSON + Binary weights</li>
                <li>• Preprocessing: Resize, normalize</li>
                <li>• Postprocessing: Softmax confidence</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Monument Categories */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <FileImage className="h-4 w-4" />
            Monument Categories (28 Classes)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-green-600 mb-2">UNESCO World Heritage (09)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Taj Mahal</li>
                <li>• Red Fort</li>
                <li>• Qutub Minar</li>
                <li>• Ajanta Caves</li>
                <li>• Ellora Caves</li>
                <li>• Khajuraho Temples</li>
                <li>• Sanchi Stupa</li>
                <li>• Hampi Group</li>
                <li>• Pattadakal Group</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-orange-600 mb-2">Karnataka Heritage (13)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Mysore Palace</li>
                <li>• Virupaksha Temple</li>
                <li>• Stone Chariot Hampi</li>
                <li>• Belur Chennakeshava</li>
                <li>• Halebidu Hoysaleswara</li>
                <li>• Badami Caves</li>
                <li>• Aihole Temples</li>
                <li>• Gol Gumbaz</li>
                <li>• Shravanabelagola</li>
                <li>• Chitradurga Fort</li>
                <li>• Bangalore Fort</li>
                <li>• Tipu Palace</li>
                <li>• Melukote Temple</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-600 mb-2">Other Major Sites (06)</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Golden Temple</li>
                <li>• Gateway of India</li>
                <li>• Hawa Mahal</li>
                <li>• Brihadeeswara Temple</li>
                <li>• Amber Fort</li>
                <li>• Murudeshwar Temple</li>
              </ul>
            </div>
          </div>
        </div>

        {/* File Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Model Files for Presentation:</h4>
          <div className="space-y-1 text-sm font-mono">
            <div className="flex justify-between">
              <span>Training Model:</span>
              <Badge variant="destructive">monument_classifier_v2.h5</Badge>
            </div>
            <div className="flex justify-between">
              <span>Web Model Architecture:</span>
              <Badge variant="destructive">model.json</Badge>
            </div>
            <div className="flex justify-between">
              <span>Web Model Weights:</span>
              <Badge variant="destructive">*.bin files</Badge>
            </div>
            <div className="flex justify-between">
              <span>Class Labels:</span>
              <Badge variant="destructive">classes.json</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
