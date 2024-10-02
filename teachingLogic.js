// Socratic teaching patterns for sorting algorithms
const socraticPatterns = {
  bubbleSort: {
    conceptual: [
      {
        trigger: 'initial',
        question: "Before we implement bubble sort, can you tell me what happens when we compare two numbers and find that they're in the wrong order?",
        expectedConcepts: ['swap', 'comparison', 'adjacent elements'],
        followUp: {
          incomplete: "That's a start. Think about what physical action we need to take with the elements.",
          incorrect: "Let's think about this step by step. When two things are in the wrong order, what's the most basic thing we can do to fix it?"
        }
      },
      {
        trigger: 'understanding_swap',
        question: "Now that we understand we need to swap elements, how many times do you think we need to go through the array to ensure it's fully sorted?",
        expectedConcepts: ['multiple passes', 'n-1 passes', 'until no swaps'],
        followUp: {
          incomplete: "Consider what happens after one pass through the array. Is it guaranteed to be sorted?",
          incorrect: "Let's try with a simple example: [5,4,3,2,1]. What happens after one pass?"
        }
      }
    ],
    implementation: [
      {
        trigger: 'start_coding',
        question: "Let's start implementing. What control structures do you think we'll need to implement bubble sort?",
        expectedConcepts: ['nested loops', 'outer loop for passes', 'inner loop for comparisons'],
        followUp: {
          incomplete: "You're on the right track. Think about how many different levels of repetition we need.",
          incorrect: "Consider what we discussed earlier about multiple passes and comparing adjacent elements."
        }
      }
    ],
    debugging: [
      {
        trigger: 'runtime_error',
        question: "I notice your code raised an error. Before I tell you what's wrong, can you walk me through what your code is doing with the array indices?",
        expectedConcepts: ['array bounds', 'index checking', 'loop limits'],
        followUp: {
          incomplete: "Good start. Now, on the last iteration, what index are we trying to access?",
          incorrect: "Let's print out the indices your code is using and see where it might go wrong."
        }
      }
    ]
  }
};

// Helper function to evaluate student responses
function evaluateResponse(response, expectedConcepts) {
  const keywords = response.toLowerCase().split(' ');
  const conceptsCovered = expectedConcepts.filter(concept => 
    concept.split(' ').every(word => keywords.includes(word.toLowerCase()))
  );
  
  return {
    understanding: conceptsCovered.length / expectedConcepts.length,
    missingConcepts: expectedConcepts.filter(concept => 
      !conceptsCovered.includes(concept)
    )
  };
}

// Function to generate the next question based on student's progress
function generateNextQuestion(algorithm, currentPhase, response, previousQuestion) {
  const evaluation = evaluateResponse(response, previousQuestion.expectedConcepts);
  
  if (evaluation.understanding < 0.5) {
    return {
      question: previousQuestion.followUp.incorrect,
      type: 'remedial'
    };
  } else if (evaluation.understanding < 1) {
    return {
      question: previousQuestion.followUp.incomplete,
      type: 'clarifying'
    };
  }
  
  // Progress to next question in sequence
  const phases = socraticPatterns[algorithm];
  const currentPhaseQuestions = phases[currentPhase];
  const nextQuestionIndex = currentPhaseQuestions.findIndex(q => 
    q.question === previousQuestion.question
  ) + 1;
  
  if (nextQuestionIndex < currentPhaseQuestions.length) {
    return currentPhaseQuestions[nextQuestionIndex];
  }
  
  // Move to next phase if available
  const phaseKeys = Object.keys(phases);
  const nextPhaseIndex = phaseKeys.indexOf(currentPhase) + 1;
  
  if (nextPhaseIndex < phaseKeys.length) {
    return phases[phaseKeys[nextPhaseIndex]][0];
  }
  
  return {
    question: "Excellent! You've completed this topic. Would you like to try implementing the algorithm now?",
    type: 'completion'
  };
}
