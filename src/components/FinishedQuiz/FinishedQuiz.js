import React from "react";
import {Link} from 'react-router-dom'
import classes from "./FinishedQuiz.module.css";
import Button from "../UI/Button/Button"

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            "fas",
            props.results[quizItem.id] === "error" ? "fa-times" : "fa-check",
            classes[props.results[quizItem.id]]
          ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong>.&nbsp;
              {quizItem.question}
              <i className={cls.join(" ")}></i>
            </li>
          );
        })}
        {/* <li>
                    <strong>1. </strong>
                    How are you?
                    <i className={'fas fa-times ' + classes.error} />
                </li>
                <li>
                    <strong>2. </strong>
                    How are you?
                    <i className={'fas fa-check '+ classes.success} />
                </li> */}
      </ul>
      <p>Right {successCount} from {props.quiz.length} </p>
      <div>
        <Button onClick={props.onRetry} type='primary'>Try again</Button>
        <Link to="/" >
        <Button onClick={props.onRetry} type='success'>Go to next test</Button>

        </Link>
              </div>
    </div>
  );
};

export default FinishedQuiz;
