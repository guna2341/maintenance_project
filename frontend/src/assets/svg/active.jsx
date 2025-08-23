import * as React from "react"
export const Active = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        fill="none"
        {...props}
    >
        <g fill="#00BC31" fillRule="evenodd" clipPath="url(#a)" clipRule="evenodd">
            <path d="M1.313 1.75h11.374l.438.438v4.815a4.375 4.375 0 0 0-.875-.51V2.624H1.75V10.5h4.375c0 .947.307 1.868.875 2.625H3.5v-.875h2.625v-.875H1.312l-.437-.438v-8.75l.438-.437Z" />
            <path d="M8.556 7.59a3.5 3.5 0 1 1 3.919 5.8 3.5 3.5 0 0 1-3.92-5.8Zm1.864 4.366 2.088-2.784-.7-.525-1.817 2.423-1.139-.911-.546.682 1.49 1.194.624-.079Z" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h14v14H0z" />
            </clipPath>
        </defs>
    </svg>
)
