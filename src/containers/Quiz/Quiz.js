import React from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import axios from "../../axios/axios-quiz";

class Quiz extends React.Component {
  state = {
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {id}: 'succeess' 'error'
    quiz: [],
    loading: true
  };

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      this.setState({
        answerState: { [answerId]: "success" },
        results: results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results: results //results
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/quizes/${this.props.match.params.id}.json`
      );
      const quiz = response.data;

      this.setState({
        quiz,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>

          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            ></ActiveQuiz>
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
