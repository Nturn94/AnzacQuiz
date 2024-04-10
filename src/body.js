import './App.css';
import Quiz from './quiz.js';
import flag from './aus.png'
import symb from './AZ.png'


const Body = () => <body>
    
    <div style={{
    }} className="main_content">


    <div className="quiz-container">
        <img className="flag" src={flag}></img>
    <h1>ANZAC DAY QUIZ</h1>
        <Quiz />

        <img className="flag" src={symb}></img>
    </div>














        
    </div>
    

    
    
    
    
    
    
    </body>



export default Body;



