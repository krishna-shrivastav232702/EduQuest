import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TestResults from "./TestResult";

interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

interface TestState {
    isCompleted: boolean;
    currentQuestionIndex: number;
    userAnswers: string[];
    score: number;
    showExplanation: boolean;
}

const Test = () => {
    const { testId } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [testState, setTestState] = useState<TestState>({
        isCompleted: false,
        currentQuestionIndex: 0,
        userAnswers: [],
        score: 0,
        showExplanation: false
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:7008/tests/${testId}`);
                console.log(response.data.testquestions);
                setQuestions(response.data.testquestions);
                setTestState(prev => ({
                    ...prev,
                    userAnswers: new Array(response.data.testquestions.length).fill("")
                }));
            } catch (error) {
                setError("Failed to load questions");
                console.error("Error fetching questions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, [testId]);

    const handleAnswerSelect = (selectedOption: string) => {
        setTestState(prev => {
            const newAnswers = [...prev.userAnswers];
            newAnswers[prev.currentQuestionIndex] = selectedOption;
            console.log(newAnswers);
            return {
                ...prev,
                userAnswers: newAnswers,
                showExplanation: false
            };
        });
    };

    const handleNext = () => {
        setTestState(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex + 1,
            showExplanation: false
        }));
    };

    const handlePrevious = () => {
        setTestState(prev => ({
            ...prev,
            currentQuestionIndex: prev.currentQuestionIndex - 1,
            showExplanation: false
        }));
    };

    const handleSubmit = () => {
        const score = testState.userAnswers.reduce((acc, answer, index) => {
            return acc + (answer === questions[index].correctAnswer ? 1 : 0);
        }, 0);

        setTestState(prev => ({
            ...prev,
            isCompleted: true,
            score
        }));
    };

    

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 flex items-center justify-center min-h-[400px]">
                <AlertCircle className="mr-2" />
                {error}
            </div>
        );
    }

    if (testState.isCompleted) {
        return (
            <TestResults questions={questions} userAnswers={testState.userAnswers} />
        );
    }

    const currentQuestion = questions[testState.currentQuestionIndex];

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Question {testState.currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <div className="text-sm text-gray-500">
                        {testState.userAnswers.filter(Boolean).length} of {questions.length} answered
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-lg mb-6">{currentQuestion.questionText}</p>
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(String.fromCharCode(65 + index))}
                                className={`w-full text-left p-3 rounded transition-colors
                                ${testState.userAnswers[testState.currentQuestionIndex] === String.fromCharCode(65 + index)
                                    ? 'bg-blue-100 border-blue-500'
                                    : 'hover:bg-gray-50 border-gray-200'
                                } border`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {testState.showExplanation && (
                    <div className="mb-6 p-4 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">
                            <strong>Explanation:</strong> {currentQuestion.explanation}
                        </p>
                    </div>
                )}

                <div className="flex justify-between">
                    <Button
                        onClick={handlePrevious}
                        disabled={testState.currentQuestionIndex === 0}
                        variant="outline"
                    >
                        Previous
                    </Button>

                    <div className="space-x-3">
                        {!testState.showExplanation && testState.userAnswers[testState.currentQuestionIndex] && (
                            <Button
                                onClick={() => setTestState(prev => ({ ...prev, showExplanation: true }))}
                                variant="outline"
                            >
                                Show Explanation
                            </Button>
                        )}

                        {testState.currentQuestionIndex === questions.length - 1 ? (
                            <Button
                                onClick={handleSubmit}
                                disabled={testState.userAnswers.some(answer => !answer)}
                                className="bg-green-500 hover:bg-green-600"
                            >
                                Submit Test
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                disabled={!testState.userAnswers[testState.currentQuestionIndex]}
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Test;