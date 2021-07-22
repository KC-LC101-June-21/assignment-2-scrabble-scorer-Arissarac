// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   
   let userWord =  input.question("Let's play some scrabble!\n\nEnter a word: \n");
   
   //console.log(userWord);
   return userWord ;
};



//console.log(transform(oldPointStructure));
/*B) Add and Organize Scoring Algorithms
Your job here is to write two other scoring algorithms for the Scrabble player.

simpleScore: Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.


vowelBonusScore: Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.*/
let simpleScore = function (word) {
  return word.length;
}



let vowelBonusScore = function (word) {

   const vowels = "aeiou";
   let score = 0

  for (let i= 0; i < word.length; i++) {
    if (vowels.includes(word[i].toLowerCase())) {
      score += 3;
    }
    else {
      score += 1;
    }
  }

  return score;
}

// use oldScrabbleScorer function as a reference to create this function
// then use scrabbleScore for scoring Scrabble over oldScrabbleScorer 
let scrabbleScore = function(word){
  let score = 0;
  // you are going to use the newPointStructure to produce the score
  /*
  const newPointStructure = {
    A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, .... Z:10
  };
  */
	word = word.toLowerCase();
  console.log("newPointStructure", newPointStructure)
	for (let i = 0; i < word.length; i++) {
    // console.log(word[i]);
    // [] - mean we are inside of an array or an object
    score += newPointStructure[word[i]]
    // console.log(score);
	}

  return score;
};




let scoringAlgorithms = [
  {
    name:"Simple Score :", 
    description: "Each letter is worth 1 point.", 
    scoringFunction : simpleScore 
  },
  {
    name:"Bonus Vowels :",
    description: " Vowels are 3 pts, consonants are 1 pt.",
    scoringFunction : vowelBonusScore 
  },
  {
    name:"Scrabble : ", 
    description: "The traditional scoring algorithm.",
    scoringFunction : scrabbleScore // <-- this changes to scrabbleScore
  }
];

function scorerPrompt(word) {
  let userChoice =  input.question ("\nWhich algorithm would you like to use? \n" +
  "0 - Simple: One point per character\n" +
  "1 - Vowel Bonus: Vowels are worth 3 points\n" +
  "2 - Scrabble: Uses scrabble point system\n" )

  if (userChoice === '0') {
    return scoringAlgorithms[0].scoringFunction(word);
  } else if (userChoice == '1') {
    console.log("are we here");
    return scoringAlgorithms[1].scoringFunction(word);
  } else {
    return scoringAlgorithms[2].scoringFunction(word);
  }
}

// to look something like:
// const oldPointStructure = {
//   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
//   2: ['D', 'G'],
//   3: ['B', 'C', 'M', 'P'],
//   4: ['F', 'H', 'V', 'W', 'Y'],
//   5: ['K'],
//   8: ['J', 'X'],
//   10: ['Q', 'Z']
// };
// when called transform we want something like:
/*
const newPointStructure = {
  A:1, B:3, C:3, D:2, E:1, F:4, G:2, H:4, I:1, J:8, K:5, .... Z:10
};
*/
function transform(oldScorer) {
  let transformedScorer = {};

  for(let pointOfEachChar in oldScorer) {
    let lettersArray = oldScorer[pointOfEachChar];

    for(let j = 0 ; j < lettersArray.length ; j++) {
      /*
       what is the value of oldScorer?
       oldPointStructure
       
       what is the value of pointOfEachChar?
       the key, 1,2,3,4,5,8,10

       what is the value of oldScorer[pointOfEachChar]?
         iteration 1 of the loop on 156 this is = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'] (-10 chars)
         iteration 5 of the loop this is = ['K']
       
       what is the value of lettersArray[j] going to be on iteration 1 when the loop on 156 is = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T']? (is dependent on the value in the loop on 156)
          iteration 1 when the loop on 156 is = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'] === 'A'
          iteration 3 when the loop on 156 is = ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'] === 'I' 
      */
      // I want to put the letter I have (lettersArray[j]) as the key to an new object (transformedScorer) and the score (pointOfEachChar) of that letter as the value inside of that same object 
      transformedScorer[lettersArray[j].toLowerCase()] = Number(pointOfEachChar);
      // console.log("\n\n");
      // console.log("Our letter is", lettersArray[j]);
      // console.log("Our points our", pointOfEachChar);
      // console.log("Our object is", transformedScorer);
      // console.log("\n\n");
    }

  }

  return transformedScorer;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {   

  let userWord = initialPrompt();
  
  //-----  //oldScrabbleScorer(userWord);
  //-----  console.log(oldScrabbleScorer(userWord));
   console.log(scorerPrompt(userWord));
   //----- let playerScore = simpleScore();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

