import { Button } from '@heroui/button'
import React from 'react'
import { InputComponent } from './input'
import { Search } from '../assets'

export const DisplayHeader = ({searchTerm, setSearchTerm , handleClick}) => {
  return (
      <div>
            <header className="mb-4">
                              <h1 className="text-3xl font-bold text-gray-900">College Blocks</h1>
                              <p className="text-gray-600 mt-2">Manage and monitor all blocks in the college</p>
                          </header>
          
                          {/* Filters and Search */}
                          <div className="flex flex-col md:flex-row gap-4 mb-4">
                              <InputComponent
                                  placeholder="Search blocks..."
                                  value={searchTerm}
                                  onchange={(e) => setSearchTerm(e.target.value)}
                                  startContent={<Search />}
                                  className="w-full md:max-w-xs"
                              />
          
                           
          
                              <div className="ml-auto">
                                  <Button color="primary" className="hidden md:flex" onPress={handleClick}>
                                      Add New Block
                                  </Button>
                              </div>
                          </div>
    </div>
  )
}
