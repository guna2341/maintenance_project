import { Card, CardBody } from '@heroui/card'
import { cn } from '@heroui/theme'
import React from 'react'

export const StateSummary = ({ cardName, length, label }) => {
    function getBg(state) {
        switch (state) { 
            case 'active':
                return 'bg-custom-400/10 border-l-4 border-l-custom-400'
            case 'inactive':
                return 'bg-custom-500/10 border-l-4 border-l-custom-500'
            case 'maintenance':
                return 'bg-custom-200/10 border-l-4 border-l-custom-200'
            default:
                return 'bg-gray-50 border-l-4 border-l-gray-500'
        }
    }
    
    function getText(state) {
        switch (state) { 
            case 'active':
                return 'text-custom-400'
            case 'inactive':
                return 'text-custom-500'
            case 'maintenance':
                return 'text-custom-200'
            default:
                return 'Unknown'
        }
    }

  return (
      <Card className={`${getBg(label)}`}>
          <CardBody className="py-4">
              <div className="flex justify-between items-center">
                  <div>
                      <p className={`text-sm ${getText(label)}`}>{cardName}</p>
                      <h3 className="text-2xl font-bold text-blue-900">{length}</h3>
                  </div>
              </div>
          </CardBody>
      </Card>  )
}
