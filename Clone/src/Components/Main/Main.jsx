import React, { useContext } from 'react'
import { assets } from '../../assets/assets';
import './Main.css'
import { Context } from '../../Context/Context';

function Main() {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);



    return (
        <div className="main order-1 min-h-[100vh] pb-[15vh] relative w-full dark:bg-[#1c1c1e]">
            <div className="nav flex justify-between items-center text-[24px] p-[24px] text-[#585858] ">
                <p className='font-[500] dark:text-white'>Gemini</p>
                <img src={assets.user_icon} className='w-[50px] rounded-3xl' alt="" />
            </div>
            <div className="maincontainer max-w-[900px] m-auto ">

                {!showResult
                    ? <>
                        <div className="greet my-[50px] text-[56px] text-[#c4c7c5] font-[500]">
                            <p><span className='devloper'>Hello, Developer</span></p>
                            <p className='help'>How can I help you today?</p>
                        </div>
                        <div className="cards mt-[150px] grid gap-4">
                            {[
                                { text: "Suggest beautiful places to see on upcoming road trip", icon: assets.compass_icon },
                                { text: "Briefly summarize this text: urban planning", icon: assets.bulb_icon },
                                { text: "Brainstorm team bonding activities for our retreat", icon: assets.message_icon },
                                { text: "Improve readability of the following code", icon: assets.code_icon },
                            ].map((card, index) => (
                                <div
                                    key={index}
                                    className="card p-4 rounded-lg bg-white text-black shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer dark:bg-[#282a2c] dark:text-white dark:hover:bg-[#111111]"
                                    onClick={() => onSent(card.text)}
                                >
                                    <p>{card.text}</p>
                                    <img src={card.icon} alt={`${card.text} Icon`} className="mt-4" />
                                </div>
                            ))}
                        </div>

                    </>
                    : <div className='result'>
                        <div className="resultitle">
                            <img src={assets.user_icon} alt="" />
                            <p className='dark:text-white'>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ?
                                <div className='loader dark:bg-black'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div> :
                                <div>
                                    <p className='dark:text-white' dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                </div>}
                        </div>
                    </div>
                }

                <div className="main-bottom">
                    <div className="search-box dark:bg-[#1c1c1e] dark:border dark:border-white">

                        <input
                            className="dark:bg-bg-[#1c1c1e] bg-white text-black dark:text-white placeholder-gray-400 
               px-4 py-2 rounded-lg w-full focus:outline-none"
                            type="text"
                            placeholder="Enter a prompt here"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <div className='flex flex-row gap-[15px]'>
                            <img className='dark:filter dark:invert' src={assets.gallery_icon} alt="" />
                            <img className='dark:filter dark:invert' src={assets.mic_icon} alt="" />
                            <img
                                className='dark:filter dark:invert cursor-pointer'
                                src={assets.send_icon}
                                onClick={() => input.trim() && onSent()}
                                alt="Send Icon"
                            />
                        </div>

                    </div>
                    <div className="bottom-info">
                        <p className='text-[13px] my-[15px] mx-auto text-center dark:text-white' >Gemini may display inaccurate info, including about people, so double check its responses. your privacy and Gemini apps</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
