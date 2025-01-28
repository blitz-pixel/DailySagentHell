import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const quizData = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the largest planet in the solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Hemingway", "Tolkien", "Dickens"], answer: "Shakespeare" },
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "HO2"], answer: "H2O" },
];

export default function QuizApp() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [results, setResults] = useState(null);
    const [correctCount, setCorrectCount] = useState(0); // Track correct answers
    const [incorrectCount, setIncorrectCount] = useState(0); // Track incorrect answers

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNextQuestion = () => {
        const timeTaken = (Date.now() - startTime) / 1000;

        // Check if the selected option is correct
        if (selectedOption === quizData[currentQuestionIndex].answer) {
            setScore((prevScore) => prevScore + Math.max(10 - Math.floor(timeTaken), 1));
            setCorrectCount((prevCount) => prevCount + 1); // Increment correct count
        } else {
            setIncorrectCount((prevCount) => prevCount + 1); // Increment incorrect count
        }

        // Move to the next question or finish the quiz
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null);
            setStartTime(Date.now());
        } else {
            setResults(score);
        }
    };

    return (
        <div className="p-4 flex flex-col items-center">
            {results === null ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
                        <h2 className="text-xl font-bold mb-4">{quizData[currentQuestionIndex].question}</h2>
                        <div className="space-y-2">
                            {quizData[currentQuestionIndex].options.map((option) => (
                                <button
                                    key={option}
                                    className={`block w-full text-left p-2 rounded-lg border hover:bg-blue-100 transition ${
                                        selectedOption === option ? "bg-blue-200" : ""
                                    }`}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        className="w-full bg-blue-500 text-black py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                        onClick={handleNextQuestion}
                        disabled={!selectedOption}
                    >
                        {currentQuestionIndex < quizData.length - 1 ? "Next" : "Finish"}
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md text-center"
                >
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                        <p className="text-lg">Your Score: {results}</p>
                        <p className="text-lg">Correct Answers: {correctCount}</p>
                        <p className="text-lg">Incorrect Answers: {incorrectCount}</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}