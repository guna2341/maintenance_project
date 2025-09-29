import { useEffect } from "react";
import { UseDashboardStore } from "../stores";
import { useNavigate } from "react-router-dom";

export const NetworkError = () => {
    const online = UseDashboardStore(state => state.networkError);
    const nav = useNavigate();

    useEffect(() => {
        if (online) {
            nav("/");
        }
        else {
            nav("/networkError");
        }
    }, [online, nav]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-100 flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-white/50">
                <div className="mb-6">
                    <div className="relative mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <div className="animate-pulse">
                                <svg
                                    className="w-10 h-10 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">
                        Connection Lost
                    </h1>
                    <p className="text-gray-600 leading-relaxed">
                        It seems you're offline. Please check your internet connection and try again.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-5 mb-7 text-left border border-gray-200/50">
                    <h3 className="font-semibold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
                        <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Troubleshooting Tips
                    </h3>
                    <ul className="text-sm text-gray-700 space-y-3">
                        {[
                            "Check your WiFi or mobile data connection",
                            "Try moving to a location with better signal",
                            "Restart your router or modem",
                            "Contact your internet service provider"
                        ].map((tip, index) => (
                            <li key={index} className="flex items-start gap-3 group">
                                <span className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></span>
                                <span className="group-hover:text-gray-900 transition-colors duration-200">{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        aria-label="Refresh the page"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Refresh Page
                        </div>
                    </button>

                    <button
                        onClick={() => nav("/")}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-label="Return to home page"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Return Home
                        </div>
                    </button>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200/50">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <div
                            className={`w-2 h-2 rounded-full ${online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}
                            aria-live="polite"
                            aria-label={online ? 'Online status' : 'Offline status'}
                        ></div>
                        Status: {online ? 'Online' : 'Offline'}
                    </div>
                </div>
            </div>
        </div>
    );
};