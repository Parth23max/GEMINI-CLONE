import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../Context/Context.jsx';
import useTheme from '../../Context/Theme.js';

function Sidebar() {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);
    const [setting, setSetting] = useState(false);
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked;
        if (darkModeStatus) {
            darkTheme();
        } else {
            lightTheme();
        }
    };

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className={`sidebar ${extended ? 'max-w-[275px]' : 'min-w-[60px]'} flex flex-col justify-between ${themeMode === "dark" ? "bg-[#282a2c] text-white" : "bg-[#f0f4f9] text-[#282828]"}`}>
            <div className="top">
                <img
                    onClick={() => setExtended((prev) => !prev)}
                    className={`block ml-[10px] cursor-pointer ${themeMode === "dark" ? "white-icon" : " "}`}
                    src={assets.menu_icon}
                    alt="Menu Icon"
                />
                <div
                    onClick={() => newChat()}
                    className={`newchat mt-[50px] inline-flex gap-[10px] py-[10px] px-[10px] text-[14px] items-center ${themeMode === "dark" ? "bg-[#3a3d42] text-gray" : "bg-[#e6eaf1] text-gray"} cursor-pointer ${extended ? "rounded-3xl" : "w-[40px] h-[40px] justify-center rounded-full"}`}
                >
                    <img src={assets.plus_icon} alt="Plus Icon" />
                    {extended && <p className="transition-all duration-300 ease-in-out">New Chat</p>}
                </div>
                {extended && (
                    <div className="recent flex flex-col overflow-scroll max-h-[560px] ">
                        <p className="recent-title mt-[30px] mb-[20px] pr-[200px]">Recent</p>
                        {prevPrompt.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => loadPrompt(item)}
                                className={`recent-entry flex items-center gap-[10px] pr-[140px] rounded-[50px] cursor-pointer ${themeMode === "dark" ? "text-white hover:bg-[#444649]" : "text-[#282828] hover:bg-[#e2e6eb]"} p-[10px] transition-colors duration-300`}
                            >
                                <img src={assets.message_icon} alt="Message Icon" className={`${themeMode === "dark" ? "white-icon" : " "}`} />
                                <p className="flex-1 whitespace-nowrap">{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="bottom pr-[10px] relative">
                <div className={`bottom-item pr-[10px] recent-entry flex items-start gap-[10px] pr-[40px] rounded-[50px] cursor-pointer ${themeMode === "dark" ? "text-white hover:bg-[#444649]" : "text-[#282828] hover:bg-[#e2e6eb]"} p-[10px] transition-colors duration-300`}>
                    <img className={`${themeMode === "dark" ? "white-icon" : " "}`} src={assets.question_icon} alt="Help Icon" />
                    {extended && <p>Help</p>}
                </div>
                <div className={`bottom-item pr-[10px] recent-entry flex items-start gap-[10px] pr-[40px] rounded-[50px] cursor-pointer ${themeMode === "dark" ? "text-white hover:bg-[#444649]" : "text-[#282828] hover:bg-[#e2e6eb]"} p-[10px] transition-colors duration-300`}>
                    <img className={`${themeMode === "dark" ? "white-icon" : " "}`} src={assets.history_icon} alt="History Icon" />
                    {extended && <p>Activity</p>}
                </div>
                <div
                    onClick={() => setSetting(!setting)}
                    className={`bottom-item pr-[10px] recent-entry flex items-start gap-[10px] pr-[40px] rounded-[50px] cursor-pointer ${themeMode === "dark" ? "text-white hover:bg-[#444649]" : "text-[#282828] hover:bg-[#e2e6eb]"} p-[10px] transition-colors duration-300`}
                >
                    <img className={`${themeMode === "dark" ? "white-icon" : " "}`} src={assets.setting_icon} alt="Settings Icon" />
                    {extended && <p>Settings</p>}
                </div>

                {extended && setting && (
                    <div
                        className={`absolute top-0 left-[100px] w-[200px] ${themeMode === "dark" ? "bg-[#3a3d42]" : "bg-white"} shadow-md p-4 rounded-lg z-50`}
                        style={{ top: 'auto', bottom: '10px' }}
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-lg font-semibold">{themeMode === "dark" ? "Settings" : "Settings"}</h4>
                            <svg
                                onClick={() => setSetting(false)}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 w-6 ${themeMode === "dark" ? "text-white" : "text-gray-500"} cursor-pointer hover:text-red-500`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        {/* Modal Content */}
                        <div className="mt-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    onChange={onChangeBtn}
                                    checked={themeMode === "dark"}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full
                                 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
                                  after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900">Toggle Theme</span>
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
