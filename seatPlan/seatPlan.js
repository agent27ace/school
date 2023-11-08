//change variable below to your choice
let listOfBoys = ['alex', 'paul', 'joshua', 'connor', 'arda'];
let listOfGirls = ['seina', 'jette', 'elisabet', 'zenia', 'carlotta'];
const sameGenderTogether = 2;
//^ change variable above to your choice ^

const nBoys = listOfBoys.length;
const nGirls = listOfGirls.length;
//returns last x letters of array if they are the same
function lastXInLine(array, amountX) {
	let lastLettersInLine = null;
	let lastPoition = array[array.length - 1];
	if (array.length < amountX) {
		return null;
	}
	for (let i = 0; i < amountX; i++) {
		if (array[array.length - i - 1] != lastPoition) {
			break;
		} else if (i == amountX - 1) {
			lastLettersInLine = lastPoition;
		}
	}
	return lastLettersInLine;
}

function boyGirlArangement(nBoys, nGirls, sameGenderTogether) {
	const totalStudents = nBoys + nGirls;
	let boysLeft = nBoys;
	let girlsLeft = nGirls;
	const finalArangement = [];

	//repeats for total amount of students and pushes either 'g' or 'b'
	//to finalArangement to get the arangement in wich the genders can be orderd
	for (let i = 0; i < totalStudents; i++) {
		let nextInLine = '';
		if (lastXInLine(finalArangement, sameGenderTogether) == 'b') {
			nextInLine = 'g';
			girlsLeft--;
		} else if (lastXInLine(finalArangement, sameGenderTogether) == 'g') {
			nextInLine = 'b';
			boysLeft--;
		} else if (boysLeft < girlsLeft) {
			if (girlsLeft / boysLeft > sameGenderTogether - 1) {
				nextInLine = 'g';
				girlsLeft--;
			}
		} else if (girlsLeft < boysLeft) {
			if (boysLeft / girlsLeft > sameGenderTogether - 1) {
				nextInLine = 'b';
				boysLeft--;
			}
		} else {
			if (girlsLeft != 0 && boysLeft != 0) {
				let random = Math.round(Math.random());
				if (random == 0) {
					nextInLine = 'g';
					girlsLeft--;
				} else if (random == 1) {
					nextInLine = 'b';
					boysLeft--;
				}
			} else if (girlsLeft == 0) {
				nextInLine = 'b';
			} else {
				nextInLine = 'g';
			}
		}

		finalArangement.push(nextInLine);
	}
	return finalArangement;
}

function createFinalSeatOrder(listOfBoys, listOfGirls, genderArrangement) {
	let finalPlan = [];
	for (let i = 0; i < genderArrangement.length; i++) {
		if (genderArrangement[i] == 'b') {
			let randomNumber = Math.round(Math.random() * (listOfBoys.length - 1));
			let randomBoy = listOfBoys[randomNumber];
			listOfBoys.splice(randomNumber, 1);
			finalPlan.push(randomBoy);
		} else if (genderArrangement[i] == 'g') {
			let randomNumber = Math.round(Math.random() * (listOfGirls.length - 1));
			let randomGirl = listOfGirls[randomNumber];
			listOfGirls.splice(randomNumber, 1);
			finalPlan.push(randomGirl);
		}
	}
	return finalPlan;
}

const genderArrangement = boyGirlArangement(nBoys, nGirls, sameGenderTogether);
console.log(createFinalSeatOrder(listOfBoys, listOfGirls, genderArrangement));
