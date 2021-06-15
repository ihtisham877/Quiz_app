
import React from 'react';
import './App.css';
import {useState} from 'react';
import Quest from './Quest.json';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
function Final(props) {
  return(
  
      <div className="border-bottom mb-2 p-1 ">
           <h6>Question{props.qu[props.index].id}  {props.qu[props.index].question} </h6>
           <h6>Correct Answer is: {props.qu[props.index].answer}</h6> 
           <h6>Score: {props.qu[props.index].score} 
             </h6>
           
      </div>
  )
  }
  

function Opt(props){

  const onChange = ((e)=>{
    if(e.target.value===props.qu[props.index].answer){
      props.qu[props.index].score = 1;
      props.qu[props.index].status = "correct";
    }else{
      props.qu[props.index].status = "incorrect";
    }


  })

  return(

    <div className="border border-info mb-2 p-1 w-25 justify-content-md-center">
         
        <Form.Check
          type="radio"
          value={props.tx}
          label={props.tx}
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          onChange={onChange.bind(this)}
           />
  
    </div>
)

}

function App() {



const [count,setCount] = useState(0);
const [question,setQuestion] = useState(Quest);
const [res,setRes] = useState(false);
const [tot ,setTotal] = useState(0);

const TotalScore = (()=>{
  setTotal(question.map((item)=> item.score).reduce((acu,cur)=>acu+cur));
  
  })

const plus = (()=>{
if(count<4){
  setCount(count+1);
}else{
TotalScore();
setRes(true);
}

})
const minus = (()=>{
if(count>0){
  setCount(count-1);
}

})
  return (
   
<div>
<h1>
  <center>
  Quiz
  </center>
  
</h1>
<Card className="text-center my-2">
{
res ? (
<Card.Body>
          <h2 className="border-bottom">Score : {tot}/5</h2>
          { question.map((ele,ind)=> <Final qu={question}  index={ind}/> ) }
          </Card.Body>
):(
  <Card.Body>
  <Card.Title>Question No: {question[count].id}  {question[count].question}</Card.Title>
  
  <Form.Group >
                          <center>

                          {
      Object.values(question[count].options[0]).map((it)=> <Opt tx={it}  qu={question}  index = {count} />)
    }
    

                          </center>

                          </Form.Group>
       
    <Button variant="primary" className="mx-2" onClick={minus}>Previous</Button><Button variant="primary" onClick={plus}>Next</Button>
  
  
  </Card.Body>
  )
  }

 
</Card>

</div>
  
);
}

export default App;
