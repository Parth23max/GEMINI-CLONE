import { createContext, useContext, useState } from "react";
import run from "../Config/Gemini";


export const Context = createContext();


const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevPrompt, setPrevPrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loding, setloading] = useState(false)
    const [resultData, setResultData] = useState("")
   

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 5 * index)
    }
    

    const newChat = ()=>{
        setloading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData("")
        setloading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined)
        {
            response= await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompt(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        let responseArray = response.split("**")
        let newArray="";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newArray += responseArray[i];
            }
            else {
                newArray += "<b>" + responseArray[i] + "</b>";
            }
        }
        let newResponse = newArray.split("*").join("</br>")
        let newResponseArray = newResponse.split("")

        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord + "");

        }

        setloading(false)
        setInput("")
    }


    const Contextvalue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        setShowResult,
        loding,
        resultData,
        setResultData,
        input,
        setInput,
        run,
        newChat,
    }

    return (
        <Context.Provider value={Contextvalue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;