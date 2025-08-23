import * as React from "react"
export const Inactive = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        fill="none"
        {...props}
    >
        <g fill="#ED1B24" clipPath="url(#a)">
            <path
                fillRule="evenodd"
                d="M1.313 1.75h11.374l.438.438v4.815a4.375 4.375 0 0 0-.875-.51V2.624H1.75V10.5h4.375c0 .947.307 1.868.875 2.625H3.5v-.875h2.625v-.875H1.312l-.437-.438v-8.75l.438-.437Z"
                clipRule="evenodd"
            />
            <path d="M10.515 6.99c-1.95 0-3.5 1.55-3.5 3.5s1.55 3.5 3.5 3.5 3.5-1.55 3.5-3.5-1.55-3.5-3.5-3.5Zm1.35 5.25-1.35-1.35-1.35 1.35-.4-.4 1.35-1.35-1.35-1.35.4-.4 1.35 1.35 1.35-1.35.4.4-1.35 1.35 1.35 1.35-.4.4Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h14v14H0z" />
            </clipPath>
        </defs>
    </svg>
)
