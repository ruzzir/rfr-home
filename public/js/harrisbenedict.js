//-----------------------------------------------------------------------------
// nutrition.js
//
//
// Created:  2007-08-21
// Updated:  	
//-----------------------------------------------------------------------------

function setFocus(objID) {
  document.getElementById(objID).focus();
}

function loseFocus(objID) {
  document.getElementById(objID).blur();
}

//
function heightUnitChg() {
  var sUnits = document.getElementById('scrHeightUnits').value;
  if (sUnits === 'ft') {
    document.getElementById('scrHeight2').readOnly = false;
    document.getElementById('scrHeight2').style.backgroundColor = '#FFFFFF';
  } else {
    document.getElementById('scrHeight2').value = '';
    document.getElementById('scrHeight2').readOnly = true;
    document.getElementById('scrHeight2').style.backgroundColor = '#E0E0E0';
  }
}

//ComputeAnthropometrics
function computeAnthro() {

  var rHeight1 = 0;
  var sHeight1 = '';
  var rHeight2 = 0;
  var sHeight2 = '';
  var sHeight3 = '';
  var rHeightTotal = 0;
  var rHeightEnglish = 0;
  var rHeightMetric = 0;
  var sHeightUnits = '';
  var sWeight1 = '';
  var sWeight2 = '';
  var rWeight1 = 0;
  var rWeightTotal = 0;
  var rWeightEnglish = 0;
  var rWeightMetric = 0;
  var sWeightUnits = '';
  var sSex = '';
  var rIdealBodyWt = 0;
  var sIdealBodyWt = '';
  var rPercentIdealBodyWt = 0;
  var sPercentIdealBodyWt = '';
  var sAge = '';
  var rAge = 0;
  var sHarrisBenedict = '';
  var rHarrisBenedict = 0;
  var rAISFactor = 0;
  //height
  sHeight1 = document.getElementById('scrHeight1').value;
  sHeight1 = stripWhitespace(sHeight1);
  if (isSignedFloat(sHeight1, 1)) {
    rHeight1 = sHeight1 * 1; //force to use rHeight1 as number	
  }
  if (rHeight1 < 0) {
    //alert('Height can not be negative');
    setFocus('scrHeight1');
  }
  sHeight2 = document.getElementById('scrHeight2').value;
  sHeight2 = stripWhitespace(sHeight2);
  if (isSignedFloat(sHeight2, 1)) {
    rHeight2 = sHeight2 * 1; //force to use rHeight2 as number	
  }
  if (rHeight2 < 0) {
    //alert('Inches can not be negative');
    setFocus('scrHeight2');
  }
  sHeightUnits = document.getElementById('scrHeightUnits').value;
  if (sHeightUnits === 'ft') {
    if (rHeight2 > 11 || rHeight2 < 0) {
      //alert('Invalid inches (0-12)');
      setFocus('scrHeight2');
    }
    rHeightTotal = (12 * rHeight1) + rHeight2;
    rHeightEnglish = rHeightTotal * 1;
    rHeightMetric = rHeightTotal * 2.54;
    sHeight3 = currencyFormatted(rHeightMetric);
    document.getElementById('scrHeight3').innerHTML = sHeight3 + ' cm';
  } else if (sHeightUnits === 'in') {
    rHeightTotal = rHeight1 * 1;
    rHeightEnglish = rHeightTotal * 1;
    rHeightMetric = rHeightTotal * 2.54;
    sHeight3 = currencyFormatted(rHeightMetric);
    document.getElementById('scrHeight3').innerHTML = sHeight3 + ' cm';
  } else if (sHeightUnits === 'cm') {
    rHeightTotal = rHeight1 * 1;
    rHeightEnglish = rHeightTotal / 2.54;
    rHeightMetric = rHeightTotal * 1;
    sHeight3 = currencyFormatted(rHeightEnglish);
    document.getElementById('scrHeight3').innerHTML = sHeight3 + ' in';
  } else {
    //alert('Height units not available/unknown');
    sHeight3 = '';
    document.getElementById('scrHeight3').value = '';
    document.getElementById('scrHeight3').innerHTML = '';
  }

  //weight 
  sWeight1 = document.getElementById('scrWeight1').value;
  sWeight1 = stripWhitespace(sWeight1);
  if (isSignedFloat(sWeight1, 1)) {
    rWeight1 = sWeight1 * 1; //force to use as number 
  }
  if (rWeight1 < 0) {
    //alert('Weight can not be negative');
    setFocus('scrWeight1');
  }
  sWeightUnits = document.getElementById('scrWeightUnits').value;
  if (sWeightUnits === 'kg') {
    rWeightMetric = rWeight1 * 1; 
    rWeightEnglish = rWeight1 * 2.2; 
    sWeight2 = currencyFormatted(rWeightEnglish); 
    document.getElementById('scrWeight2').innerHTML = sWeight2 + ' lbs';
  }
  else if (sWeightUnits === 'lbs') {
    rWeightEnglish = rWeight1 * 1; 
    rWeightMetric = rWeight1 / 2.2; 
    sWeight2 = currencyFormatted(rWeightMetric); 
    document.getElementById('scrWeight2').innerHTML = sWeight2 + ' kg';
  }
  else {
    //alert('Weight units not available/unknown');
    sWeight2 = '';
    document.getElementById('scrWeight2').value = '';
    document.getElementById('scrWeight2').innerHTML = '';
  }
  //Ideal body weight
  //  men: 106lbs for 1st 60", 6lbs for each additional inch
  //women: 100lbs for 1st 60", 5lbs for each additional inch
  //Subtract 2.5lbs for each inch under 60"
  sSex = document.getElementById('scrSex').value;
  sSex = stripWhitespace(sSex);
  if (rHeightEnglish > 0 && (sSex === 'Male' || sSex === 'Female')) {
    if (rHeightEnglish >= 60) {
      if (sSex === 'Male') {
        rIdealBodyWt = 106 + (6 * (rHeightEnglish - 60));
      }
      if (sSex === 'Female') {
        rIdealBodyWt = 100 + (5 * (rHeightEnglish - 60));
      }
    } else {
      if (sSex === 'Male') {
        rIdealBodyWt = 106 + (2.5 * (60 - rHeightEnglish));
      }
      if (sSex === 'Female') {
        rIdealBodyWt = 100 + (2.5 * (60 - rHeightEnglish));
      }
    }
  }
  if (rIdealBodyWt > 0) {
    sIdealBodyWt = currencyFormatted(rIdealBodyWt)
    document.getElementById('scrIdealBodyWt').innerHTML = sIdealBodyWt + ' lbs';
  } else {
    rIdealBodyWt = 0;
    document.getElementById('scrIdealBodyWt').innerHTML = '';
  }
  //Percent Ideal Body Weight
  //Current weight / Ideal Body Weight * 100
  if (rIdealBodyWt > 0) {
    rPercentIdealBodyWt = rWeightEnglish / rIdealBodyWt * 100;
    if (rPercentIdealBodyWt > 0) {
      sPercentIdealBodyWt = currencyFormatted(rPercentIdealBodyWt) + ' %';
    } else {
      sPercentIdealBodyWt = '';
    }
  }
  document.getElementById('scrPercentIdealBodyWt').innerHTML = sPercentIdealBodyWt;

  //age 
  sAge = document.getElementById('scrAge').value;
  sAge = stripWhitespace(sAge);
  if (isSignedFloat(sAge, 1)) {
    rAge = sAge * 1; //force to use as number	
  } else {
    rAge = 0
    //alert('Age is not numeric');
    setFocus('scrAge');
  }
  if (rAge < 0) {
    //alert('Age can not be negative');
    setFocus('scrAge');
  }

  //Harris-Benedict RMR
  //    male: (66.5 + (13.75 * weight in kg) + (5 * height in cm) - (6.8 * age)) * ais factor
  //  female: (65.5 + (9.6 * weight in kg) + (1.8 * height in cm) - (4.7 * age)) * ais factor
  //  ais factor:
  //              sedentary or weight maintenance = 1.2
  //              light activity = 1.3
  //             moderatly active, infection, healing = 1.5
  //              very active, extreme stress, burns = 2.0       
  rAISFactor = document.getElementById('scrAIS').value;
  rAISFactor = rAISFactor * 1;
  if (rWeightMetric === 0 || rHeightMetric === 0 || rAge === 0 || sSex === '') {
    rHarrisBenedict = 0;
    sHarrisBenedict = '';
  } else {
    if (sSex === 'Male') {
      rHarrisBenedict = (66.5 + (13.75 * rWeightMetric) + (5 * rHeightMetric) - (6.8 * rAge)) * rAISFactor;
    }
    if (sSex === 'Female') {
      rHarrisBenedict = (655 + (9.6 * rWeightMetric) + (1.8 * rHeightMetric) - (4.7 * rAge)) * rAISFactor;
    }
    if (rHarrisBenedict > 0) {
      sHarrisBenedict = currencyFormatted(rHarrisBenedict);
    }
  }
  //document.getElementById('scrHarrisBenedict').value    = sHarrisBenedict
  document.getElementById('scrHarrisBenedict').innerHTML = sHarrisBenedict;
}

//Clear screen fields
function clearScr() {
  document.getElementById('scrHeight1').value = '';
  document.getElementById('scrHeight2').value = '';
  document.getElementById('scrHeightUnits').value = 'cm';
  heightUnitChg();
  document.getElementById('scrHeight3').innerHTML = '';
  document.getElementById('scrWeight1').value = '';
  document.getElementById('scrWeightUnits').value = 'kg';
  document.getElementById('scrWeight2').innerHTML = '';
  document.getElementById('scrSex').value = ' ';
  document.getElementById('scrIdealBodyWt').innerHTML = '';
  document.getElementById('scrPercentIdealBodyWt').innerHTML = '';
  document.getElementById('scrAge').value = '';
  document.getElementById('scrHarrisBenedict').innerHTML = '';
  document.getElementById('scrAIS').value = '0';
  document.getElementById('scrNotes').value = '';
}

function currencyFormatted(amount) {
  var i = parseFloat(amount);
  if (isNaN(i)) {
    i = 0.00;
  }
  var minus = '';
  if (i < 0) {
    minus = '-';
  }
  i = Math.abs(i);
  i = parseInt((i + 0.005) * 100);
  i = i / 100;
  var s = String(i);
  if (s.indexOf('.') < 0) {
    s += '.00';
  }
  if (s.indexOf('.') === (s.length - 2)) {
    s += '0';
  }
  s = minus + s;
  return s;
}

function onBodyLoad() {
  clearScr();
  document.getElementById('todaysDate').innerHTML = Date();
  heightUnitChg();
  computeAnthro();
}

function openWin() {
  location.href = './notavailable.html';
}

function openWin(a) {
  location.href = a;
}