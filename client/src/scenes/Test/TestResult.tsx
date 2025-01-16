import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CheckCircle2, XCircle } from "lucide-react";

const AccordionItem = ({ question, index, userAnswer, correctAnswer }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const getOptionLetter = (idx: number) => String.fromCharCode(65 + idx);

    const getAnswerStatus = (option: string, correctAnswer: string, userAnswer: string) => {
        if (option === correctAnswer && option === userAnswer) {
            return {
                className: "bg-green-100 border-green-500",
                label: "✓ Your Answer (Correct)"
            };
        }
        if (option === correctAnswer) {
            return {
                className: "bg-green-50 border-green-500",
                label: "✓ Correct Answer"
            };
        }
        if (option === userAnswer) {
            return {
                className: "bg-red-100 border-red-500",
                label: "✗ Your Answer"
            };
        }
        return {
            className: "border-gray-200",
            label: ""
        };
    };

    return (
        <Card className="p-4 mb-4">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-start gap-4">
                    {userAnswer === correctAnswer ? (
                        <CheckCircle2 className="text-green-500 mt-1" />
                    ) : (
                        <XCircle className="text-red-500 mt-1" />
                    )}
                    <h3 className="font-medium">
                        Question {index + 1}: {question.questionText}
                    </h3>
                </div>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </div>

            {isOpen && (
                <div className="mt-4 ml-8 space-y-4">
                    <div className="space-y-2">
                        {question.options.map((option: string, optIndex: number) => {
                            const optionLetter = getOptionLetter(optIndex);
                            const status = getAnswerStatus(optionLetter, correctAnswer, userAnswer);

                            return (
                                <div
                                    key={optIndex}
                                    className={`p-3 rounded border ${status.className} relative pl-12`}
                                >
                                    <span className="absolute left-3 font-medium">
                                        {optionLetter}.
                                    </span>
                                    {option}
                                    {status.label && (
                                        <span
                                            className={`ml-2 font-medium ${status.label.includes("Correct")
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {status.label}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="p-4 bg-gray-50 rounded">
                        <p className="text-sm text-gray-600">
                            <strong>Explanation:</strong> {question.explanation}
                        </p>
                    </div>
                </div>
            )}
        </Card>
    );
};

const TestResults = ({ questions, userAnswers }: any) => {
    const score = userAnswers.reduce((acc: number, answer: string, index: number) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const percentage = ((score / questions.length) * 100).toFixed(1);
    return (
        <div className="max-w-3xl mx-auto p-6">

            <div className="mb-8">
                <Card className="p-6">
                    <h2 className="text-2xl font-bold mb-2">Test Results</h2>
                    <p className="text-lg">
                        Score: <strong>{score}</strong> out of <strong>{questions.length}</strong>
                        (<strong>{percentage}%</strong>)
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Review your answers below. Click each question to expand for details.
                    </p>
                </Card>
            </div>
            <div className="space-y-6">
                {questions.map((question: any, index: number) => (
                    <AccordionItem
                        key={index}
                        question={question}
                        index={index}
                        userAnswer={userAnswers[index]}
                        correctAnswer={question.correctAnswer}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestResults;