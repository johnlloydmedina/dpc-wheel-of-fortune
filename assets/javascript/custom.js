window.onload = function() {
	displayWelcomeAlert();
};

let theWheel = new Winwheel({
	'numSegments': 14,
	'outerRadius': 240,
	'pointerAngle': 90,
	'drawMode': 'image',
	'drawText': true,
	'textFontSize': 1,
	'textOrientation': 'vertical',
	'textAlignment': 'center',
	'segments': [
		{'textFillStyle': '#c6c6c6', 'text': 'SPIN AGAIN'},
		{'textFillStyle': '#ffffff', 'text': 'BETTER LUCK NEXT TIME'},
		{'textFillStyle': '#fde560', 'text': 'FREE CONSULTATION'},
		{'textFillStyle': '#3668ac', 'text': 'FACEBOOK'},
		{'textFillStyle': '#ffffff', 'text': 'BETTER LUCK NEXT TIME'},
		{'textFillStyle': '#fde560', 'text': 'FREE CONSULTATION'},
		{'textFillStyle': '#e1423d', 'text': 'GOOGLE'},
		{'textFillStyle': '#c6c6c6', 'text': 'SPIN AGAIN'},
		{'textFillStyle': '#ffffff', 'text': 'BETTER LUCK NEXT TIME'},
		{'textFillStyle': '#fde560', 'text': 'FREE CONSULTATION'},
		{'textFillStyle': '#009b5e', 'text': 'BMS'},
		{'textFillStyle': '#ffffff', 'text': 'BETTER LUCK NEXT TIME'},
		{'textFillStyle': '#fde560', 'text': 'FREE CONSULTATION'},
		{'textFillStyle': '#fab134', 'text': 'EYP'}
	],
	'animation': {
		'type': 'spinToStop',
		'duration': 9,
		'spins': 3,
		'callbackFinished': alertPrize
	},
	'pins': {
		'number': 14,
		'outerRadius': 5,
		'margin': 1,
		'fillStyle': 'silver',
	}
});


let loadedImg = new Image();

loadedImg.onload = function() {
	theWheel.wheelImage = loadedImg;
	theWheel.draw();
}

loadedImg.src = "assets/images/dpc-wheel.png";


let winningMusic = document.getElementById('winningMusic');
winningMusic.volume = 0.5;

let losingMusic = document.getElementById('losingMusic');
losingMusic.volume = 0.5;

let spinAgainMusic = document.getElementById('spinAgainMusic');
spinAgainMusic.volume = 0.5;

let spinningWheelMusic = document.getElementById('spinningWheelMusic');
spinningWheelMusic.volume = 0.5;

let backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.volume = 0.3;


let wheelPower = 0;
let wheelSpinning = false;

function startSpin() {
	backgroundMusic.pause()
	spinningWheelMusic.play()

	document.getElementById('spin_button').src = "assets/images/spin-off.png";
	document.getElementById('spin_button').className = "";

	theWheel.startAnimation();

	wheelSpinning = true;
}


function resetWheel() {
	spinningWheelMusic.pause()
	backgroundMusic.play()

	document.getElementById('spin_button').src = "assets/images/spin-on.png";
	document.getElementById('spin_button').className = "clickable";

	theWheel.stopAnimation(false);
	theWheel.rotationAngle = 0;
	theWheel.draw();

	wheelSpinning = false;
}


function alertPrize(indicatedSegment) {
	if (indicatedSegment.text == 'BETTER LUCK NEXT TIME') {
		losingMusic.play()
		customAlert('SORRY! BETTER LUCK NEXT TIME!')
	} else if (indicatedSegment.text == 'SPIN AGAIN') {
		spinAgainMusic.play()
		spinAgainEffect()
		customAlert('NICE! YOU HAVE ANOTHER SPIN')
	} else if (indicatedSegment.text == 'FREE CONSULTATION') {
		winningMusic.play()
		triggerConfetti()
		customAlert('YOU GOT FREE CONSULTATION WITH DPC!')
	} else {
		winningMusic.play()
		triggerConfetti()
		customAlert('CONGRATULATIONS! YOU HAVE WON A PRIZE!')
	}
}


// ===== CONFETTI EFFECTS =====
function triggerConfetti() {
	const canvas = document.getElementById('custom_canvas')
	const jsConfetti = new JSConfetti({canvas})

	setTimeout(() => {
		jsConfetti.addConfetti({
			confettiColors: [
				'#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'
			],
			confettiRadius: 6,
			confettiNumber: 500
		})
	}, 500)

	setTimeout(() => {
		jsConfetti.addConfetti({
			emojis: ['🎈']
		})
	}, 500)
}

function spinAgainEffect() {
	const canvas = document.getElementById('custom_canvas')
	const jsConfetti = new JSConfetti({canvas})

	setTimeout(() => {
		jsConfetti.addConfetti({
			emojis: ['🎡', '🎯', '🌀'],
			emojiSize: 50,
		})
	}, 500)

}

var customAlertBox = document.getElementById('customAlert');
var customAlertText = document.getElementById('customAlertText');
var customAlertClose = document.getElementById('reset_button');

function customAlert(message) {
	customAlertText.textContent = message;
	customAlertBox.style.display = 'block';

	if (message === 'NICE! YOU HAVE ANOTHER SPIN') {
		customAlertClose.innerHTML = '<i class="fas fa-sync-alt"></i> <span> Spin Again </span>';
		customAlertClose.addEventListener('click', function() {
			customAlertBox.style.display = 'none';
			startSpin();
		});
	} else {
		customAlertClose.innerHTML = '<i class="fas fa-sync-alt"></i> <span> Play Again </span>';
		customAlertClose.addEventListener('click', function() {
			customAlertBox.style.display = 'none';
			resetWheel();
		});
	}
}

function displayWelcomeAlert() {
	customAlertText.textContent = "Welcome to DPC Wheel of Fortune";
	customAlertBox.style.display = 'block';

	customAlertClose.innerHTML = '<i class="fas fa-play"></i> <span> Let\'s Play </span>';
	customAlertClose.addEventListener('click', function() {
		customAlertBox.style.display = 'none';
		backgroundMusic.play()
	});
}