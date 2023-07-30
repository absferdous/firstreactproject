import { useState } from "react"
export default function Game(){
    const[history,setHistory]=useState([Array(9).fill(null)])
    const[xisNext,setXisNext]=useState(true)
    const[currentMove,setCurrentMove] = useState(0)
    const currentSquare=history[currentMove]
    const[toggle,setToggle]= useState(true)
    function handleToggle(){
        setToggle(!toggle)
    }

    function handlePlay(nextSquares){
        const nextHistory = [...history.slice(0,currentMove+1),nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length-1)
        setXisNext(!xisNext)
    }
    //showing moves
    const moves= history.map((squares,move)=>{
        let description;
        if(move>0){
            description= " Move # "+ move 
        }else{
            description = "Home "
        }
        return(
            <li key={move}>
                <button onClick={()=>jumpTo(move)}className="square-move">
                    {description}
                    </button>
            </li>
        )
    })
    // time travel
    function jumpTo(nextmove){
            setCurrentMove(nextmove)
            setXisNext(nextmove % 2 === 0)
    }
    return(
        <div className="game">
            <div className="game-board">
                <Board onPlay={handlePlay} xisNext={xisNext} squares={currentSquare}/>
            </div>
            <div className="game-info">
                <button onClick={handleToggle}className="square-list">
                    Change order
                    </button>
                <ul>{toggle?moves:moves.reverse()}</ul>
                
            </div>
        </div>
    )
}

 function Board({onPlay,squares,xisNext}){
    
    ///Declare winner
    const winner=calculateWinner(squares)

    
    let status
    if(winner){
        status= " WINNER # " + winner 
    }else if(squares.every((squares)=>squares)){
       status="Its a  draw"
    }else{
        status= ( xisNext?"X":"O")
    }
    function handleClick(i){
        const nextSquares= squares.slice()
        if(nextSquares[i]||calculateWinner(squares)){
            return 
        }
        if(xisNext){
            nextSquares[i]= "X"
        }else{
            nextSquares[i]= "O"
        }
        
        onPlay(nextSquares)
       
    }
    
    function renderboard(){
        const boardsize = 3
        const renderSquares = []
       
        for(let row =0;row<boardsize;row++){
            const renderRow = []
            for(let col=0;col<boardsize;col++){
                const squareIndex =  row * boardsize + col;
                renderRow.push(
                <div className="board-row"key={squareIndex}
                >
                    <Square 
                    value={squares[squareIndex]} 
                    onSquareClick={()=>handleClick(squareIndex)}/>
                </div>
                )
            }
            renderSquares.push(
                <div className="board-row" key={row}>
                    {renderRow}
                </div>
            )
           
        }
        return renderSquares
        
    }
    function Square({value,onSquareClick}){
        return(
            <button className="square" onClick={onSquareClick}>
            {value}
        </button>
        )
        
    }
    return(
        <div className="board" >
            <div className="status">{status}</div>
            {renderboard()}
        </div>
        
    )
}


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];//winning 
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
       
      }
    }
    return null;
  }