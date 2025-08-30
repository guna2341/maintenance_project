import { Select, SelectItem } from '@heroui/select'
import { cn } from '@heroui/theme'
import React from 'react'

export const SelectComponent = ({
    placeholder,
    radius,
    className,
    classNames,
    selectedKeys,
    label,
    labelPlacement,
    onChange,
    items = []
}) => {
    return (
        <Select
            radius={radius}
            placeholder={placeholder}
            label={label}
            labelPlacement={labelPlacement}
            aria-label={"Select Status"}
            className={cn("w-full md:max-w-xs", className)}
            classNames={classNames}
          selectedKeys={[selectedKeys]}
          onChange={(e) => onChange(e.target.value)}
        >
            {items.map(item => 
                <SelectItem key={item.key}>{item.label}</SelectItem>
            )}
      </Select>  )
}
