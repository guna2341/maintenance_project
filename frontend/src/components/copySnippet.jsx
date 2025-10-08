import { useState } from "react";

export const CopySnippet = ({ text, className = "" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg cursor-pointer px-2 ${className}`}
            onClick={handleCopy}
        >
            <code className="text-sm font-mono text-gray-700 flex-1 mr-2">
                {text}
            </code>
            <button
                className="flex items-center justify-center w-8 h-8 rounded cursor-pointer"
                title={copied ? "Copied!" : "Copy to clipboard"}
            >
                {copied ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                ) : (
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};