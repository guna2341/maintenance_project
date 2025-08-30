import { Select, SelectItem } from '@heroui/select'
import { cn } from '@heroui/theme'
import React from 'react'

export const SelectComponent = ({
    placeholder,
    className,
    selectedKeys,
    onChange,
    items = []
}) => {
    return (
        <Select
            placeholder={placeholder}
            aria-label={"Select Status"}
            className={cn("w-full md:max-w-xs", className)}
          selectedKeys={[selectedKeys]}
          onChange={(e) => onChange(e.target.value)}
        >
            {items.map(item => 
                <SelectItem key={item.key}>{item.label}</SelectItem>
            )}
      </Select>  )
}
