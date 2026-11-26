import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css"
function App(){
  const [Input,setInput]=useState("")
  function handleClick(value){
    setInput(Input+value)
  }

  function handleEqual(){
    try {
      
      setInput(String(evaluate(Input)))
    } catch (error) {
      setInput(error)
    }
  }
  function handleClear(){
    setInput('')
  }
  
  function handleCancel(){
    setInput(Input.slice(0,-1))
  }
  return(
    <div className="calculator">
        <input type="text" value={Input}  placeholder="0"/>
        <div className="button-container">
            <button onClick={handleCancel}>X</button>      
            <button onClick={()=>handleClick("%")}>%</button>
            <button onClick={() => handleClick("sqrt(")}>√</button>
            <button onClick={()=>handleClick("/")}>/</button>
            <button onClick={()=>handleClick("7")}>7</button>
            <button onClick={()=>handleClick("8")}>8</button>
            <button onClick={()=>handleClick("9")}>9</button>
            <button onClick={()=>handleClick("*")}>*</button>
            <button onClick={()=>handleClick("4")}>4</button>
            <button onClick={()=>handleClick("5")}>5</button>
            <button onClick={()=>handleClick("6")}>6</button>
            <button onClick={()=>handleClick("-")}>-</button>
            <button onClick={()=>handleClick("1")}>1</button>
            <button onClick={()=>handleClick("2")}>2</button>
            <button onClick={()=>handleClick("3")}>3</button>
            <button onClick={()=>handleClick("+")}>+</button>
            <button onClick={() => handleClick("^2")}>x²</button>
            <button onClick={()=>handleClick(".")}>.</button>
            <button onClick={handleEqual}>=</button>
            <button onClick={()=>handleClick("0")}>0</button>
            <button onClick={()=>handleClick("(")}>(</button>
            <button onClick={()=>handleClick(")")}>)</button>
            <button onClick={handleClear}>C</button>
        </div>
      
    </div>
  )
}

export default App