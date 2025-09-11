import * as React from "react"
export const AddBlock = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={28}
        {...props}
    >
        <g
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        >
            <path d="M12 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4.586a1 1 0 0 1 .707.293L12 7h7a2 2 0 0 1 2 2v2M18 14v3m0 3v-3m0 0h-3m3 0h3" />
        </g>
    </svg>
)
