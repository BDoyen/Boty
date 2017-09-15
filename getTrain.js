var trainSessionArray = [[,]];
var M = trainSessionArray.length;

var repriseGoal = "Back into the game";
var repriseSession = "Marche 2/3 minutes warm-up - Footing léger 15 minutes - 2/3 minutes cool-down à la fin";
var reprise = [repriseGoal,repriseSession];


trainSessionArray[0] = ["10/15 min non-stop - alternance course/marche possible aussi ;)", "Marche 2/3 minutes warm-up - Petit footing, au plus 15 min - Montée de genoux sur 20 m avant d'accélérer sur 100m. Tu peux répéter ce cycle récupération/accélération 2 fois "];
trainSessionArray.push(["25 min non-stop à ton rythme et en mode relax :)", "Footing léger le plus longtemps possible, pas plus de 25 min. #RunForFun"]);
trainSessionArray.push(["20 min non-stop - alternance course/marche possible aussi  ;)", "2/3 minutes de marche warm-up - Footing léger, max 20 min - Montée de genoux sur 20 m avant d'accélérer sur 100m.  Cycle récupération/accélération 4 fois au plus"]);
trainSessionArray.push(["30 min non-stop à ton rythme et en mode relax :)", "Petit footing le plus longtemps possible, pas plus de 30 min. #JustForThePleasure"]);
trainSessionArray.push(["25 min non-stop", "Marche 2/3 minutes warm-up - Petit footing, pas plus de 25 min - Talons aux fesses sur 20 m avant d'accélérer sur 100m. Tu peux répéter ce cycle récupération/accélération 6 fois "]);
trainSessionArray.push(["35 min non-stop à ton rythme et en mode relax :)", "Footing, max 35 min. #fautPasAbuserDesBonnesChoses #JustForThePleasure"]);
trainSessionArray.push(["30 min non-stop", "Marche 2/3 minutes warm-up - Footing léger, max 30 min - Montée de genoux sur 20 m avant d'accélérer sur 100m. Cycle récupération/accélération 8 fois max "]);
trainSessionArray.push(["40 min non-stop à ton rythme et en mode relax :) ", "Footing léger, pas plus de 45 min. #RunForFun"]);

module.exports = {
	trainSessionArray: trainSessionArray,
	M:M,
	reprise: reprise
};


