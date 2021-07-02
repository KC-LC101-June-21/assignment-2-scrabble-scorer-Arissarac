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
   
   let userWord =  input.question("Let's play some scrabble!\n\nEnter a word:");
   
   //console.log(userWord);
   return userWord ;
};

console.log();
/*B) Add and Organize Scoring Algorithms
Your job here is to write two other scoring algorithms for the Scrabble player.

simpleScore: Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.


vowelBonusScore: Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.*/
let simpleScore = function (word) {
 let pointValue = 0;

 for (let i = 0; i< word.length; i++) {
     pointValue += 1;
 }

 return pointValue ;
}



let vowelBonusScore = function (word) {

   const vowels = ["a", "e", "i", "o", "u"];
   let score = 0

  for (let letter of word.toLowerCase()) {
    if (vowels.includes(letter)) {
        score += 3;
    }
    else {
        score += 1;
    }
  }

  return score;
}


let scrabbleScore;

let simpleScoreObject = {
  name:"Simple Score :", 
  description: "Each letter is worth 1 point.", 
  scoringFunction : simpleScore 
  } ;

let bonusVowelsObject = {
  name:"Bonus Vowels :",
  description: " Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction : vowelBonusScore 
  }; 

let scrabbleObject = {
  name:"Scrabble : ", 
  description: "The traditional scoring algorithm.",
  scoringFunction : scrabbleScore 
  };

const scoringAlgorithms = [simpleScoreObject, bonusVowelsObject, scrabbleObject];

function scorerPrompt(word) {
let userChoice =  input.question ("\nWhich algorithm would you like to use? \n" +
"0 - Simple: One point per character\n" +
"1 - Vowel Bonus: Vowels are worth 3 points\n" +
"2 - Scrabble: Uses scrabble point system\n" )

if (userChoice === '0') {
   return scoringAlgorithms[0].scoringFunction(word);
} else if (userChoice == '1') {
   return scoringAlgorithms[1].scoringFunction(word);
} else {
   return scoringAlgorithms[2].scoringFunction(word);
}
}


function transform(oldScorer) {

let transformedScorer = {};
let keys = Object.keys(oldScorer)

for(let i in keys) {
  for(let j in oldScorer[i]) {
      transformedScorer[oldScorer[i][j]]=i;
}
}
return transformedScorer;
};

let newPointStructure = transform(oldPointStructure);  

function runProgram() {
  let userWord = initialPrompt();
  //-----  //oldScrabbleScorer(userWord);
  //-----  console.log(oldScrabbleScorer(userWord));
   console.log(scorerPrompt(userWord));
   //----- let playerScore = simpleScore();

   let newPointStructure = transform(oldPointStructure);  
  
   //-------console.log(oldScrabbleScorer(playerScore));

   console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure["A"]);
console.log("letter j: ", newPointStructure["j"]);
console.log("letter z: ", newPointStructure["z"]);

    
   
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

