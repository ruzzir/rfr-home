//-----------------------------------------------------------------------------
// AssessMeal.js  combination of exhange.js & FormCheck.js
//
//
// Created:  2009-01-25
// Updated:  	
//-----------------------------------------------------------------------------

function setFocus(objID) {
  document.getElementById(objID).focus()
}

function loseFocus(objID) {
  document.getElementById(objID).blur()
}

function addRowToTable() {
  var tbl = document.getElementById('tblTotals');
  var lastRow = tbl.rows.length;
  // if there's no header row in the table, then iteration = lastRow + 1
  var iteration = lastRow + 1;

  var x = document.getElementById('tblTotals').insertRow(lastRow);
  var cTitle = x.insertCell(0);
  var cCHO = x.insertCell(1);
  var cProtein = x.insertCell(2);
  var cFat = x.insertCell(3);
  var cCalories = x.insertCell(4);
  cTitle.innerHTML = (iteration - 1);
  cCHO.innerHTML = document.getElementById('scrTotCarb').innerHTML;
  cProtein.innerHTML = document.getElementById('scrTotProtein').innerHTML;
  cFat.innerHTML = document.getElementById('scrTotFat').innerHTML;
  cCalories.innerHTML = document.getElementById('scrTotCals').innerHTML;

}

var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function simpleEncode(valueArray, maxValue) {
  var chartData = ['s:'];
  for (var i = 0; i < valueArray.length; i++) {
    var currentValue = valueArray[i] * 1;
    if (!isNaN(currentValue) && currentValue >= 0) {
      chartData.push(simpleEncoding.charAt(Math.round((simpleEncoding.length - 1) * currentValue / maxValue)));
    } else {
      chartData.push('_');
    }
  }
  return chartData.join('');
}

function createChart(pData) {
  var valueArray = new Array(3);
  valueArray = pData.split(',', 3);
  var maxValue = 200;
  var b = simpleEncode(valueArray, maxValue);
  var f = 'http://chart.apis.google.com/chart?chs=300x95&chd=' + b + '&chxt=x&cht=p3&chxl=0:|Carbohydrate|Fat|Protein';
  document.getElementById('sImg').src = f;
}

//Compute Diabetic Exchange
function computeExchange() {

  //var sStarchServ='9';
  var sStarchServ = '';
  var rStarchServ = 0;
  var rStarchCarb = 0;
  var rStarchProtein = 0;
  var rStarchFat = 0;
  var rStarchCals = 0;

  //var sFruitServ='3';
  var sFruitServ='';
  var rFruitServ = 0;
  var rFruitCarb = 0;
  var rFruitProtein = 0;
  var rFruitFat = 0;
  var rFuitCals = 0;

  //var sSkimServ='3';
  var sSkimServ='';
  var rSkimServ = 0;
  var rSkimCarb = 0;
  var rSkimProtein = 0;
  var rSkimFat = 0;
  var rSkimCals = 0;

  //var sOneMilkServ='0';
  var sOneMilkServ='';
  var rOneMilkServ = 0;
  var rOneMilkCarb = 0;
  var rOneMilkProtein = 0;
  var rOneMilkFat = 0;
  var rOneMilkCals = 0;

  //var sTwoMilkServ='0';
  var sTwoMilkServ='';
  var rTwoMilkServ = 0;
  var rTwoMilkCarb = 0;
  var rTwoMilkProtein = 0;
  var rTwoMilkFat = 0;
  var rTwoMilkCals = 0;

  //var sWholeServ='0';
  var sWholeServ='';
  var rWholeServ = 0;
  var rWholeCarb = 0;
  var rWholeProtein = 0;
  var rWholeFat = 0;
  var rWholeCals = 0;

  //var sVegServ='';
  var sVegServ='';
  var rVegServ = 0;
  var rVegCarb = 0;
  var rVegProtein = 0;
  var rVegFat = 0;
  var rVegCals = 0;

  //var sVLMServ='';
  var sVLMServ='';
  var rVLMServ = 0;
  var rVLMCarb = 0;
  var rVLMProtein = 0;
  var rVLMFat = 0;
  var rVLMCals = 0;

  //var sLMServ='';
  var sLMServ='';
  var rLMServ = 0;
  var rLMCarb = 0;
  var rLMProtein = 0;
  var rLMFat = 0;
  var rLMCals = 0;

  //var sMFMServ='';
  var sMFMServ='';
  var rMFMServ = 0;
  var rMFMCarb = 0;
  var rMFMProtein = 0;
  var rMFMFat = 0;
  var rMFMCals = 0;

  //var sHFMServ='';
  var sHFMServ='';
  var rHFMServ = 0;
  var rHFMCarb = 0;
  var rHFMProtein = 0;
  var rHFMFat = 0;
  var rHFMCals = 0;

  //var sFatServ='';
  var sFatServ='';
  var rFatServ = 0;
  var rFatCarb = 0;
  var rFatProtein = 0;
  var rFatFat = 0;
  var rFatCals = 0;

  var rServ = 0;
  var sServ = '';

  // sStarchServ = document.getElementById('scrStarchServ').value;
  // sStarchServ = stripWhitespace(sStarchServ);
  // if (isSignedFloat(sStarchServ, 1)) {
  //   //rStarchServ=sStarchServ * 1 
  // } else {
  //   alert('Starch Servings is not numeric');
  //   setFocus('scrStarchServ');
  // }
  // if (rStarchServ < 0) {
  //   alert('Starch Servings can not be negative');
  //   setFocus('scrStarchServ');
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrStarchServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrStarchServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrStarchServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrStarchServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrStarchServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrStarchServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  if (rServ >= 0) {
    rStarchServ = rServ * 1;
    //document.getElementById('scrStarchServ').value=rStarchServ;
    document.getElementById('scrStarchServ').innerHTML = rStarchServ;
  }

  // sFruitServ = document.getElementById('scrFruitServ').value
  // sFruitServ = stripWhitespace(sFruitServ)
  // if (isSignedFloat(sFruitServ, 1)) {
  //   //rFruitServ=sFruitServ * 1 	
  // } else {
  //   alert('Fruit Servings is not numeric')
  //   setFocus('scrFruitServ')
  // }
  // if (rFruitServ < 0) {
  //   alert('Fruit Servings can not be negative')
  //   setFocus('scrFruitServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrFruitServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  } 

  sServ = '';
  sServ = document.getElementById('scrFruitServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrFruitServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrFruitServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrFruitServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrFruitServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rFruitServ = rServ * 1;
    //document.getElementById('scrFruitServ').value=rFruitServ;
    document.getElementById('scrFruitServ').innerHTML = rFruitServ;
  }

  // sSkimServ = document.getElementById('scrSkimServ').value
  // sSkimServ = stripWhitespace(sSkimServ)
  // if (isSignedFloat(sSkimServ, 1)) {
  //   //rSkimServ=sSkimServ * 1 	
  // } else {
  //   alert('Skim Servings is not numeric')
  //   setFocus('scrSkimServ')
  // }
  // if (rSkimServ < 0) {
  //   alert('Skim Servings can not be negative')
  //   setFocus('scrSkimServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrSkimServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrSkimServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrSkimServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrSkimServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrSkimServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrSkimServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rSkimServ = rServ * 1;
    //document.getElementById('scrSkimServ').value=rSkimServ;
    document.getElementById('scrSkimServ').innerHTML = rSkimServ;
  }

  // sOneMilkServ = document.getElementById('scrOneMilkServ').value
  // sOneMilkServ = stripWhitespace(sOneMilkServ)
  // if (isSignedFloat(sOneMilkServ, 1)) {
  //   //rOneMilkServ=sOneMilkServ * 1 	
  // } else {
  //   alert('OneMilk Servings is not numeric')
  //   setFocus('scrOneMilkServ')
  // }
  // if (rOneMilkServ < 0) {
  //   alert('OneMilk Servings can not be negative')
  //   setFocus('scrOneMilkServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrOneMilkServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrOneMilkServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrOneMilkServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrOneMilkServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrOneMilkServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrOneMilkServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rOneMilkServ = rServ * 1;
    //document.getElementById('scrOneMilkServ').value=rOneMilkServ;
    document.getElementById('scrOneMilkServ').innerHTML = rOneMilkServ;
  }

  // sTwoMilkServ = document.getElementById('scrTwoMilkServ').value
  // sTwoMilkServ = stripWhitespace(sTwoMilkServ)
  // if (isSignedFloat(sTwoMilkServ, 1)) {
  //   //rTwoMilkServ=sTwoMilkServ * 1 	
  // } else {
  //   alert('TwoMilk Servings is not numeric')
  //   setFocus('scrTwoMilkServ')
  // }
  // if (rTwoMilkServ < 0) {
  //   alert('TwoMilk Servings can not be negative')
  //   setFocus('scrTwoMilkServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrTwoMilkServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrTwoMilkServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrTwoMilkServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrTwoMilkServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrTwoMilkServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }

  sServ = '';
  sServ = document.getElementById('scrTwoMilkServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rTwoMilkServ = rServ * 1;
    //document.getElementById('scrTwoMilkServ').value=rTwoMilkServ;
    document.getElementById('scrTwoMilkServ').innerHTML = rTwoMilkServ;
  }

  // sWholeServ = document.getElementById('scrWholeServ').value;
  // sWholeServ = stripWhitespace(sWholeServ)
  // if (isSignedFloat(sWholeServ, 1)) {
  //   //rWholeServ=sWholeServ * 1 	
  // } else {
  //   alert('Whole Servings is not numeric')
  //   setFocus('scrWholeServ')
  // }
  // if (rWholeServ < 0) {
  //   alert('Whole Servings can not be negative')
  //   setFocus('scrWholeServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrWholeServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrWholeServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrWholeServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrWholeServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrWholeServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrWholeServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rWholeServ = rServ * 1;
    //document.getElementById('scrWholeServ').value=rWholeServ;
    document.getElementById('scrWholeServ').innerHTML = rWholeServ;
  }

  // sVegServ = document.getElementById('scrVegServ').value;
  // sVegServ = stripWhitespace(sVegServ);
  // if (isSignedFloat(sVegServ, 1)) {
  //   //rVegServ=sVegServ * 1 	
  // } else {
  //   alert('Veg Servings is not numeric')
  //   setFocus('scrVegServ')
  // }
  // if (rVegServ < 0) {
  //   alert('Veg Servings can not be negative')
  //   setFocus('scrVegServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrVegServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVegServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVegServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVegServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVegServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVegServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rVegServ = rServ * 1;
    //document.getElementById('scrVegServ').value=rVegServ;
    document.getElementById('scrVegServ').innerHTML = rVegServ;
  }


  // sVLMServ = document.getElementById('scrVLMServ').value
  // sVLMServ = stripWhitespace(sVLMServ)
  // if (isSignedFloat(sVLMServ, 1)) {
  //   //rVLMServ=sVLMServ * 1 	
  // } else {
  //   alert('VLM Servings is not numeric')
  //   setFocus('scrVLMServ')
  // }
  // if (rVLMServ < 0) {
  //   alert('VLM Servings can not be negative')
  //   setFocus('scrVLMServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrVLMServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVLMServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVLMServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVLMServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVLMServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrVLMServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rVLMServ = rServ * 1;
    //document.getElementById('scrVLMServ').value=rVLMServ;
    document.getElementById('scrVLMServ').innerHTML = rVLMServ;
  }


  // sLMServ = document.getElementById('scrLMServ').value
  // sLMServ = stripWhitespace(sLMServ)
  // if (isSignedFloat(sLMServ, 1)) {
  //   //rLMServ=sLMServ * 1 	
  // } else {
  //   alert('LM Servings is not numeric')
  //   setFocus('scrLMServ')
  // }
  // if (rLMServ < 0) {
  //   alert('LM Servings can not be negative')
  //   setFocus('scrLMServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrLMServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrLMServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrLMServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrLMServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrLMServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrLMServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rLMServ = rServ * 1;
    //document.getElementById('scrLMServ').value=rLMServ;
    document.getElementById('scrLMServ').innerHTML = rLMServ;
  }


  // sMFMServ = document.getElementById('scrMFMServ').value
  // sMFMServ = stripWhitespace(sMFMServ)
  // if (isSignedFloat(sMFMServ, 1)) {
  //   //rMFMServ=sMFMServ * 1 	
  // } else {
  //   alert('MFM Servings is not numeric')
  //   setFocus('scrMFMServ')
  // }
  // if (rMFMServ < 0) {
  //   alert('MFM Servings can not be negative')
  //   setFocus('scrMFMServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrMFMServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrMFMServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrMFMServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrMFMServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrMFMServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrMFMServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rMFMServ = rServ * 1;
    //document.getElementById('scrMFMServ').value=rMFMServ;
    document.getElementById('scrMFMServ').innerHTML = rMFMServ;
  }

  // sHFMServ = document.getElementById('scrHFMServ').value
  // sHFMServ = stripWhitespace(sHFMServ)
  // if (isSignedFloat(sHFMServ, 1)) {
  //   //rHFMServ=sHFMServ * 1 	
  // } else {
  //   alert('HFM Servings is not numeric')
  //   setFocus('scrHFMServ')
  // }
  // if (rHFMServ < 0) {
  //   alert('HFM Servings can not be negative')
  //   setFocus('scrHFMServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrHFMServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrHFMServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrHFMServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrHFMServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrHFMServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrHFMServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rHFMServ = rServ * 1;
    //document.getElementById('scrHFMServ').value=rHFMServ;
    document.getElementById('scrHFMServ').innerHTML = rHFMServ;
  }


  // sFatServ = document.getElementById('scrFatServ').value
  // sFatServ = stripWhitespace(sFatServ)
  // if (isSignedFloat(sFatServ, 1)) {
  //   //rFatServ=sFatServ * 1 	
  // } else {
  //   alert('Fat Servings is not numeric')
  //   setFocus('scrFatServ')
  // }
  // if (rFatServ < 0) {
  //   alert('Fat Servings can not be negative')
  //   setFocus('scrFatServ')
  // }
  rServ = 0;
  sServ = '';
  sServ = document.getElementById('scrFatServBreakfast').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrFatServBreakSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrFatServLunch').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrFatServLunchSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrFatServDinner').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  sServ = '';
  sServ = document.getElementById('scrFatServDinnerSnack').value;
  sServ = stripWhitespace(sServ);
  if (isSignedFloat(sServ, 1)) {
    rServ = rServ + (sServ * 1); 
  }
  
  if (rServ >= 0) {
    rFatServ = rServ * 1;
    //document.getElementById('scrFatServ').value=rFatServ;
    document.getElementById('scrFatServ').innerHTML = rFatServ;
  }

  rStarchCarb = rStarchServ * 15;
  rStarchProtein = rStarchServ * 3;
  rStarchFat = rStarchServ * 1;
  rStarchCals = rStarchServ * 80;
  sStarchCarb = noDecFormat(rStarchCarb);
  document.getElementById('scrStarchCarb').innerHTML = sStarchCarb;
  sStarchProtein = noDecFormat(rStarchProtein);
  document.getElementById('scrStarchProtein').innerHTML = sStarchProtein;
  sStarchFat = noDecFormat(rStarchFat);
  document.getElementById('scrStarchFat').innerHTML = sStarchFat;
  sStarchCals = noDecFormat(rStarchCals);
  document.getElementById('scrStarchCals').innerHTML = sStarchCals;

  rFruitCarb = rFruitServ * 15;
  rFruitProtein = rFruitServ * 0;
  rFruitFat = rFruitServ * 0;
  rFruitCals = rFruitServ * 60;
  sFruitCarb = noDecFormat(rFruitCarb);
  document.getElementById('scrFruitCarb').innerHTML = sFruitCarb;
  sFruitProtein = noDecFormat(rFruitProtein);
  document.getElementById('scrFruitProtein').innerHTML = sFruitProtein;
  sFruitFat = noDecFormat(rFruitFat);
  document.getElementById('scrFruitFat').innerHTML = sFruitFat;
  sFruitCals = noDecFormat(rFruitCals);
  document.getElementById('scrFruitCals').innerHTML = sFruitCals;

  rSkimCarb = rSkimServ * 12;
  rSkimProtein = rSkimServ * 8;
  rSkimFat = rSkimServ * 0;
  rSkimCals = rSkimServ * 90;
  sSkimCarb = noDecFormat(rSkimCarb);
  document.getElementById('scrSkimCarb').innerHTML = sSkimCarb;
  sSkimProtein = noDecFormat(rSkimProtein);
  document.getElementById('scrSkimProtein').innerHTML = sSkimProtein;
  sSkimFat = noDecFormat(rSkimFat);
  document.getElementById('scrSkimFat').innerHTML = sSkimFat;
  sSkimCals = noDecFormat(rSkimCals);
  document.getElementById('scrSkimCals').innerHTML = sSkimCals;

  rOneMilkCarb = rOneMilkServ * 12;
  rOneMilkProtein = rOneMilkServ * 8;
  rOneMilkFat = rOneMilkServ * 1;
  rOneMilkCals = rOneMilkServ * 100;
  sOneMilkCarb = noDecFormat(rOneMilkCarb);
  document.getElementById('scrOneMilkCarb').innerHTML = sOneMilkCarb;
  sOneMilkProtein = noDecFormat(rOneMilkProtein);
  document.getElementById('scrOneMilkProtein').innerHTML = sOneMilkProtein;
  sOneMilkFat = noDecFormat(rOneMilkFat);
  document.getElementById('scrOneMilkFat').innerHTML = sOneMilkFat;
  sOneMilkCals = noDecFormat(rOneMilkCals);
  document.getElementById('scrOneMilkCals').innerHTML = sOneMilkCals;

  rTwoMilkCarb = rTwoMilkServ * 12;
  rTwoMilkProtein = rTwoMilkServ * 8;
  rTwoMilkFat = rTwoMilkServ * 3;
  rTwoMilkCals = rTwoMilkServ * 120;
  sTwoMilkCarb = noDecFormat(rTwoMilkCarb);
  document.getElementById('scrTwoMilkCarb').innerHTML = sTwoMilkCarb;
  sTwoMilkProtein = noDecFormat(rTwoMilkProtein);
  document.getElementById('scrTwoMilkProtein').innerHTML = sTwoMilkProtein;
  sTwoMilkFat = noDecFormat(rTwoMilkFat);
  document.getElementById('scrTwoMilkFat').innerHTML = sTwoMilkFat;
  sTwoMilkCals = noDecFormat(rTwoMilkCals);
  document.getElementById('scrTwoMilkCals').innerHTML = sTwoMilkCals;

  rWholeCarb = rWholeServ * 12;
  rWholeProtein = rWholeServ * 8;
  rWholeFat = rWholeServ * 5;
  rWholeCals = rWholeServ * 150;
  sWholeCarb = noDecFormat(rWholeCarb);
  document.getElementById('scrWholeCarb').innerHTML = sWholeCarb;
  sWholeProtein = noDecFormat(rWholeProtein);
  document.getElementById('scrWholeProtein').innerHTML = sWholeProtein;
  sWholeFat = noDecFormat(rWholeFat);
  document.getElementById('scrWholeFat').innerHTML = sWholeFat;
  sWholeCals = noDecFormat(rWholeCals);
  document.getElementById('scrWholeCals').innerHTML = sWholeCals;

  rVegCarb = rVegServ * 5;
  rVegProtein = rVegServ * 2;
  rVegFat = rVegServ * 0;
  rVegCals = rVegServ * 25;
  sVegCarb = noDecFormat(rVegCarb);
  document.getElementById('scrVegCarb').innerHTML = sVegCarb;
  sVegProtein = noDecFormat(rVegProtein);
  document.getElementById('scrVegProtein').innerHTML = sVegProtein;
  sVegFat = noDecFormat(rVegFat);
  document.getElementById('scrVegFat').innerHTML = sVegFat;
  sVegCals = noDecFormat(rVegCals);
  document.getElementById('scrVegCals').innerHTML = sVegCals;

  rVLMCarb = rVLMServ * 0;
  rVLMProtein = rVLMServ * 7;
  rVLMFat = rVLMServ * 1;
  rVLMCals = rVLMServ * 35;
  sVLMCarb = noDecFormat(rVLMCarb);
  document.getElementById('scrVLMCarb').innerHTML = sVLMCarb;
  sVLMProtein = noDecFormat(rVLMProtein);
  document.getElementById('scrVLMProtein').innerHTML = sVLMProtein;
  sVLMFat = noDecFormat(rVLMFat);
  document.getElementById('scrVLMFat').innerHTML = sVLMFat;
  sVLMCals = noDecFormat(rVLMCals);
  document.getElementById('scrVLMCals').innerHTML = sVLMCals;

  rLMCarb = rLMServ * 0;
  rLMProtein = rLMServ * 7;
  rLMFat = rLMServ * 3;
  rLMCals = rLMServ * 55;
  sLMCarb = noDecFormat(rLMCarb);
  document.getElementById('scrLMCarb').innerHTML = sLMCarb;
  sLMProtein = noDecFormat(rLMProtein);
  document.getElementById('scrLMProtein').innerHTML = sLMProtein;
  sLMFat = noDecFormat(rLMFat);
  document.getElementById('scrLMFat').innerHTML = sLMFat;
  sLMCals = noDecFormat(rLMCals);
  document.getElementById('scrLMCals').innerHTML = sLMCals;

  rMFMCarb = rMFMServ * 0;
  rMFMProtein = rMFMServ * 7;
  rMFMFat = rMFMServ * 5;
  rMFMCals = rMFMServ * 75;
  sMFMCarb = noDecFormat(rMFMCarb);
  document.getElementById('scrMFMCarb').innerHTML = sMFMCarb;
  sMFMProtein = noDecFormat(rMFMProtein);
  document.getElementById('scrMFMProtein').innerHTML = sMFMProtein;
  sMFMFat = noDecFormat(rMFMFat);
  document.getElementById('scrMFMFat').innerHTML = sMFMFat;
  sMFMCals = noDecFormat(rMFMCals);
  document.getElementById('scrMFMCals').innerHTML = sMFMCals;

  rHFMCarb = rHFMServ * 0;
  rHFMProtein = rHFMServ * 7;
  rHFMFat = rHFMServ * 8;
  rHFMCals = rHFMServ * 100;
  sHFMCarb = noDecFormat(rHFMCarb);
  document.getElementById('scrHFMCarb').innerHTML = sHFMCarb;
  sHFMProtein = noDecFormat(rHFMProtein);
  document.getElementById('scrHFMProtein').innerHTML = sHFMProtein;
  sHFMFat = noDecFormat(rHFMFat);
  document.getElementById('scrHFMFat').innerHTML = sHFMFat;
  sHFMCals = noDecFormat(rHFMCals);
  document.getElementById('scrHFMCals').innerHTML = sHFMCals;

  rFatCarb = rFatServ * 0;
  rFatProtein = rFatServ * 0;
  rFatFat = rFatServ * 5;
  rFatCals = rFatServ * 45;
  sFatCarb = noDecFormat(rFatCarb);
  document.getElementById('scrFatCarb').innerHTML = sFatCarb;
  sFatProtein = noDecFormat(rFatProtein);
  document.getElementById('scrFatProtein').innerHTML = sFatProtein;
  sFatFat = noDecFormat(rFatFat);
  document.getElementById('scrFatFat').innerHTML = sFatFat;
  sFatCals = noDecFormat(rFatCals);
  document.getElementById('scrFatCals').innerHTML = sFatCals;

  var rTotCarb = 0;
  var sTotCarb = '';
  var rTotProtein = 0;
  var sTotProtein = '';
  var rTotFat = 0;
  var sTotFat = '';
  var rTotCals = 0;
  var sTotCals = '';
  var rCalcCals = 0;
  var sCalcCals = '';
  var rCals = 0;
  var sCals = '';
  rTotCarb = (rStarchCarb + rFruitCarb + rSkimCarb + rOneMilkCarb + rTwoMilkCarb + rWholeCarb + rVegCarb + rVLMCarb + rLMCarb + rMFMCarb + rHFMCarb + rFatCarb) * 1;
  sTotCarb = noDecFormat(rTotCarb);
  document.getElementById('scrTotCarb').innerHTML = sTotCarb;
  rTotProtein = (rStarchProtein + rFruitProtein + rSkimProtein + rOneMilkProtein + rTwoMilkProtein + rWholeProtein + rVegProtein + rVLMProtein + rLMProtein + rMFMProtein + rHFMProtein + rFatProtein) * 1;
  sTotProtein = noDecFormat(rTotProtein);
  document.getElementById('scrTotProtein').innerHTML = sTotProtein;
  rTotFat = (rStarchFat + rFruitFat + rSkimFat + rOneMilkFat + rTwoMilkFat + rWholeFat + rVegFat + rVLMFat + rLMFat + rMFMFat + rHFMFat + rFatFat) * 1;
  sTotFat = noDecFormat(rTotFat);
  document.getElementById('scrTotFat').innerHTML = sTotFat;
  rTotCals = (rStarchCals + rFruitCals + rSkimCals + rOneMilkCals + rTwoMilkCals + rWholeCals + rVegCals + rVLMCals + rLMCals + rMFMCals + rHFMCals + rFatCals) * 1;
  sTotCals = noDecFormat(rTotCals);
  document.getElementById('scrTotCals').innerHTML = sTotCals;

  var rPerCarb = 0;
  var sPerCarb = '';
  var rPerProtein = 0;
  var sPerProtein = '';
  var rPerFat = 0;
  var sPerFat = '';
  rPerCarb = ((rTotCarb * 4) / rTotCals) * 100;
  sPerCarb = noDecFormat(rPerCarb);
  document.getElementById('scrPerCarb').innerHTML = sPerCarb + '%';
  rPerProtein = ((rTotProtein * 4) / rTotCals) * 100;
  sPerProtein = noDecFormat(rPerProtein);
  document.getElementById('scrPerProtein').innerHTML = sPerProtein + '%';
  rPerFat = ((rTotFat * 9) / rTotCals) * 100;
  sPerFat = noDecFormat(rPerFat);
  document.getElementById('scrPerFat').innerHTML = sPerFat + '%';

  //var aaa = Math.round(sPerCarb) + ',' + Math.round(sPerFat) + ',' + Math.round(sPerProtein);
  //createChart(aaa)
}

//Clear screen fields
function clearScr() {

  document.getElementById('scrStarchServ').value = '0';
  document.getElementById('scrStarchServBreakfast').value = '0';
  document.getElementById('scrStarchServBreakSnack').value = '0';
  document.getElementById('scrStarchServLunch').value = '0';
  document.getElementById('scrStarchServLunchSnack').value = '0';
  document.getElementById('scrStarchServDinner').value = '0';
  document.getElementById('scrStarchServDinnerSnack').value = '0';
  document.getElementById('scrStarchCarb').value = '';
  document.getElementById('scrStarchProtein').value = '';
  document.getElementById('scrStarchFat').value = '';
  document.getElementById('scrStarchCals').value = '';

  document.getElementById('scrFruitServ').value = '0';
  document.getElementById('scrFruitServBreakfast').value = '0';
  document.getElementById('scrFruitServBreakSnack').value = '0';
  document.getElementById('scrFruitServLunch').value = '0';
  document.getElementById('scrFruitServLunchSnack').value = '0';
  document.getElementById('scrFruitServDinner').value = '0';
  document.getElementById('scrFruitServDinnerSnack').value = '0';
  document.getElementById('scrFruitCarb').value = '';
  document.getElementById('scrFruitProtein').value = '';
  document.getElementById('scrFruitFat').value = '';
  document.getElementById('scrFruitCals').value = '';

  document.getElementById('scrSkimServ').value = '0';
  document.getElementById('scrSkimServBreakfast').value = '0';
  document.getElementById('scrSkimServBreakSnack').value = '0';
  document.getElementById('scrSkimServLunch').value = '0';
  document.getElementById('scrSkimServLunchSnack').value = '0';
  document.getElementById('scrSkimServDinner').value = '0';
  document.getElementById('scrSkimServDinnerSnack').value = '0';
  document.getElementById('scrSkimCarb').value = '';
  document.getElementById('scrSkimProtein').value = '';
  document.getElementById('scrSkimFat').value = '';
  document.getElementById('scrSkimCals').value = '';

  document.getElementById('scrOneMilkServ').value = '0';
  document.getElementById('scrOneMilkServBreakfast').value = '0';
  document.getElementById('scrOneMilkServBreakSnack').value = '0';
  document.getElementById('scrOneMilkServLunch').value = '0';
  document.getElementById('scrOneMilkServLunchSnack').value = '0';
  document.getElementById('scrOneMilkServDinner').value = '0';
  document.getElementById('scrOneMilkServDinnerSnack').value = '0';
  document.getElementById('scrOneMilkCarb').value = '';
  document.getElementById('scrOneMilkProtein').value = '';
  document.getElementById('scrOneMilkFat').value = '';
  document.getElementById('scrOneMilkCals').value = '';

  document.getElementById('scrTwoMilkServ').value = '0';
  document.getElementById('scrTwoMilkServBreakfast').value = '0';
  document.getElementById('scrTwoMilkServBreakSnack').value = '0';
  document.getElementById('scrTwoMilkServLunch').value = '0';
  document.getElementById('scrTwoMilkServLunchSnack').value = '0';
  document.getElementById('scrTwoMilkServDinner').value = '0';
  document.getElementById('scrTwoMilkServDinnerSnack').value = '0';
  document.getElementById('scrTwoMilkCarb').value = '';
  document.getElementById('scrTwoMilkProtein').value = '';
  document.getElementById('scrTwoMilkFat').value = '';
  document.getElementById('scrTwoMilkCals').value = '';

  document.getElementById('scrWholeServ').value = '0';
  document.getElementById('scrWholeServBreakfast').value = '0';
  document.getElementById('scrWholeServBreakSnack').value = '0';
  document.getElementById('scrWholeServLunch').value = '0';
  document.getElementById('scrWholeServLunchSnack').value = '0';
  document.getElementById('scrWholeServDinner').value = '0';
  document.getElementById('scrWholeServDinnerSnack').value = '0';
  document.getElementById('scrWholeCarb').value = '';
  document.getElementById('scrWholeProtein').value = '';
  document.getElementById('scrWholeFat').value = '';
  document.getElementById('scrWholeCals').value = '';

  document.getElementById('scrVegServ').value = '0';
  document.getElementById('scrVegServBreakfast').value = '0';
  document.getElementById('scrVegServBreakSnack').value = '0';
  document.getElementById('scrVegServLunch').value = '0';
  document.getElementById('scrVegServLunchSnack').value = '0';
  document.getElementById('scrVegServDinner').value = '0';
  document.getElementById('scrVegServDinnerSnack').value = '0';
  document.getElementById('scrVegCarb').value = '';
  document.getElementById('scrVegProtein').value = '';
  document.getElementById('scrVegFat').value = '';
  document.getElementById('scrVegCals').value = '';

  document.getElementById('scrVLMServ').value = '0';
  document.getElementById('scrVLMServBreakfast').value = '0';
  document.getElementById('scrVLMServBreakSnack').value = '0';
  document.getElementById('scrVLMServLunch').value = '0';
  document.getElementById('scrVLMServLunchSnack').value = '0';
  document.getElementById('scrVLMServDinner').value = '0';
  document.getElementById('scrVLMServDinnerSnack').value = '0';
  document.getElementById('scrVLMCarb').value = '';
  document.getElementById('scrVLMProtein').value = '';
  document.getElementById('scrVLMFat').value = '';
  document.getElementById('scrVLMCals').value = '';

  document.getElementById('scrLMServ').value = '0';
  document.getElementById('scrLMServBreakfast').value = '0';
  document.getElementById('scrLMServBreakSnack').value = '0';
  document.getElementById('scrLMServLunch').value = '0';
  document.getElementById('scrLMServLunchSnack').value = '0';
  document.getElementById('scrLMServDinner').value = '0';
  document.getElementById('scrLMServDinnerSnack').value = '0';
  document.getElementById('scrLMCarb').value = '';
  document.getElementById('scrLMProtein').value = '';
  document.getElementById('scrLMFat').value = '';
  document.getElementById('scrLMCals').value = '';

  document.getElementById('scrMFMServ').value = '0';
  document.getElementById('scrMFMServBreakfast').value = '0';
  document.getElementById('scrMFMServBreakSnack').value = '0';
  document.getElementById('scrMFMServLunch').value = '0';
  document.getElementById('scrMFMServLunchSnack').value = '0';
  document.getElementById('scrMFMServDinner').value = '0';
  document.getElementById('scrMFMServDinnerSnack').value = '0';
  document.getElementById('scrMFMCarb').value = '';
  document.getElementById('scrMFMProtein').value = '';
  document.getElementById('scrMFMFat').value = '';
  document.getElementById('scrMFMCals').value = '';

  document.getElementById('scrHFMServ').value = '0';
  document.getElementById('scrHFMServBreakfast').value = '0';
  document.getElementById('scrHFMServBreakSnack').value = '0';
  document.getElementById('scrHFMServLunch').value = '0';
  document.getElementById('scrHFMServLunchSnack').value = '0';
  document.getElementById('scrHFMServDinner').value = '0';
  document.getElementById('scrHFMServDinnerSnack').value = '0';
  document.getElementById('scrHFMCarb').value = '';
  document.getElementById('scrHFMProtein').value = '';
  document.getElementById('scrHFMFat').value = '';
  document.getElementById('scrHFMCals').value = '';

  document.getElementById('scrFatServ').value = '0';
  document.getElementById('scrFatServBreakfast').value = '0';
  document.getElementById('scrFatServBreakSnack').value = '0';
  document.getElementById('scrFatServLunch').value = '0';
  document.getElementById('scrFatServLunchSnack').value = '0';
  document.getElementById('scrFatServDinner').value = '0';
  document.getElementById('scrFatServDinnerSnack').value = '0';
  document.getElementById('scrFatCarb').value = '';
  document.getElementById('scrFatProtein').value = '';
  document.getElementById('scrFatFat').value = '';
  document.getElementById('scrFatCals').value = '';

  //document.getElementById('scrTargetCals').value    = '2000';
  //document.getElementById('scrCalcCals').innerHTML  = ' '; 

  document.getElementById('scrNotes').value = '';
  computeExchange();

}

function noDecFormat(amount) {
  var i = parseFloat(amount);
  if (isNaN(i)) {
    i = 0;
  }
  var minus = '';
  if (i < 0) {
    minus = '-';
  }
  i = Math.abs(i);
  i = parseInt((i + 0.005) * 100);
  i = i / 100;
  s = String(i);
  if (s.indexOf('.') < 0) {
    s += '';
  }
  if (s.indexOf('.') === (s.length)) {
    s += '0';
  }
  s = minus + s;
  return s;
}

function onBodyLoad() {
  clearScr();
  computeExchange();
}

function openWin() {
  location.href = './help1.htm';
}

function openWin(a) {
  location.href = a;
}


//-----------------------------------------------------------------------------
// FormChek.js
//
// This is a set of JavaScript functions for validating input on 
// an HTML form.  
//
// Created:  1997-02-18
// Updated:  2006-12-29
//-----------------------------------------------------------------------------

var digits = '0123456789';
var lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// whitespace characters
var whitespace = ' \t\n\r';

// decimal point character differs by language and culture
var decimalPointDelimiter = '.';

// CONSTANT STRING DECLARATIONS
// (grouped for ease of translation and localization)

// m is an abbreviation for 'missing'

var mPrefix = 'You did not enter a value into the ';
var mSuffix = ' field. This is a required field. Please enter it now.';

// i is an abbreviation for 'invalid';

var iStateCode = 'This field must be a valid two character U.S. state abbreviation (like CA for California). Please reenter it now.';
var iZIPCode = 'This field must be a 5 or 9 digit U.S. ZIP Code (like 94043). Please reenter it now.';
var iUSPhone = 'This field must be a 10 digit U.S. phone number (like 415 555 1212). Please reenter it now.';
var iWorldPhone = 'This field must be a valid international phone number. Please reenter it now.';
var iSSN = 'This field must be a 9 digit U.S. social security number (like 123 45 6789). Please reenter it now.';
var iEmail = 'This field must be a valid email address (like bmayer@qmdata.com). Please reenter it now.';
var iCreditCardPrefix = 'This is not a valid ';
var iCreditCardSuffix = ' credit card number. (Click the link on this form to see a list of sample numbers.) Please reenter it now.';
var iDay = 'This field must be a day number between 1 and 31.  Please reenter it now.';
var iMonth = 'This field must be a month number between 1 and 12.  Please reenter it now.';
var iYear = 'This field must be a 2 or 4 digit year number.  Please reenter it now.';
var iDatePrefix = 'The Day, Month, and Year for ';
var iDateSuffix = ' do not form a valid date.  Please reenter them now.';

// p is an abbreviation for 'prompt'

var pEntryPrompt = 'Please enter a ';
var pStateCode = '2 character code (like CA).';
var pZIPCode = '5 or 9 digit U.S. ZIP Code (like 94043).';
var pUSPhone = '10 digit U.S. phone number (like 415 555 1212).';
var pWorldPhone = 'international phone number.';
var pSSN = '9 digit U.S. social security number (like 123 45 6789).';
var pEmail = 'valid email address (like bmayer@qmdata.com).';
var pCreditCard = 'valid credit card number.';
var pDay = 'day number between 1 and 31.';
var pMonth = 'month number between 1 and 12.';
var pYear = '2 or 4 digit year number.';


// Global variable defaultEmptyOK defines default return value 
// for many functions when they are passed the empty string. 
// By default, they will return defaultEmptyOK.
//
// defaultEmptyOK is false, which means that by default, 
// these functions will do 'strict' validation.  Function
// isInteger, for example, will only return true if it is
// passed a string containing an integer; if it is passed
// the empty string, it will return false.
//
// You can change this default behavior globally (for all 
// functions which use defaultEmptyOK) by changing the value
// of defaultEmptyOK.
//
// Most of these functions have an optional argument emptyOK
// which allows you to override the default behavior for 
// the duration of a function call.
//
// This functionality is useful because it is possible to
// say 'if the user puts anything in this field, it must
// be an integer (or a phone number, or a string, etc.), 
// but it's OK to leave the field empty too.'
// This is the case for fields which are optional but which
// must have a certain kind of content if filled in.

var defaultEmptyOK = false;


// Attempting to make this library run on Navigator 2.0,
// so I'm supplying this array creation routine as per
// JavaScript 1.0 documentation.  If you're using 
// Navigator 3.0 or later, you don't need to do this;
// you can use the Array constructor instead.

function makeArray(n) {
  //*** BUG: If I put this line in, I get two error messages:
  //(1) Window.length can't be set by assignment
  //(2) daysInMonth has no property indexed by 4
  //If I leave it out, the code works fine.
  //   this.length = n;
  for (var i = 1; i <= n; i++) {
    this[i] = 0;
  }
  return this;
}

var daysInMonth = makeArray(12);
daysInMonth[1] = 31;
daysInMonth[2] = 29; // must programmatically check this
daysInMonth[3] = 31;
daysInMonth[4] = 30;
daysInMonth[5] = 31;
daysInMonth[6] = 30;
daysInMonth[7] = 31;
daysInMonth[8] = 31;
daysInMonth[9] = 30;
daysInMonth[10] = 31;
daysInMonth[11] = 30;
daysInMonth[12] = 31;

// Valid U.S. Postal Codes for states, territories, armed forces, etc.
// See http://www.usps.gov/ncsc/lookups/abbr_state.txt.

var USStateCodeDelimiter = '|';
var USStateCodes = 'AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY|AE|AA|AE|AE|AP'

// Check whether string s is empty.
function isEmpty(s) {
  return ((s == null) || (s.length === 0));
}

// Returns true if string s is empty or 
// whitespace characters only.

function isWhitespace(s) {
  var i;
  // Is s empty?
  if (isEmpty(s)) return true;

  // Search through string's characters one by one
  // until we find a non-whitespace character.
  // When we do, return false; if we don't, return true.

  for (i = 0; i < s.length; i++) {
    // Check that current character isn't whitespace.
    var c = s.charAt(i);

    if (whitespace.indexOf(c) === -1) return false;
  }

  // All characters are whitespace.
  return true;
}

// Removes all characters which appear in string bag from string s.
function stripCharsInBag(s, bag) {
  var i;
  var returnString = '';

  // Search through string's characters one by one.
  // If character is not in bag, append to returnString.

  for (i = 0; i < s.length; i++) {
    // Check that current character isn't whitespace.
    var c = s.charAt(i);
    if (bag.indexOf(c) ===-1) returnString += c;
  }

  return returnString;
}

// Removes all characters which do NOT appear in string bag 
// from string s.
function stripCharsNotInBag(s, bag)

{
  var i;
  var returnString = '';

  // Search through string's characters one by one.
  // If character is in bag, append to returnString.
  for (i = 0; i < s.length; i++) {
    // Check that current character isn't whitespace.
    var c = s.charAt(i);
    if (bag.indexOf(c) !== -1) returnString += c;
  }
  return returnString;
}

// Removes all whitespace characters from s.
// Global variable whitespace (see above)
// defines which characters are considered whitespace.
function stripWhitespace(s) {
  return stripCharsInBag(s, whitespace);
}

// WORKAROUND FUNCTION FOR NAVIGATOR 2.0.2 COMPATIBILITY.
//
// The below function *should* be unnecessary.  In general,
// avoid using it.  Use the standard method indexOf instead.
//
// However, because of an apparent bug in indexOf on 
// Navigator 2.0.2, the below loop does not work as the
// body of stripInitialWhitespace:
//
// while ((i < s.length) && (whitespace.indexOf(s.charAt(i)) != -1))
//   i++;
//
// ... so we provide this workaround function charInString
// instead.
//
// charInString (CHARACTER c, STRING s)
//
// Returns true if single character c (actually a string)
// is contained within string s.

function charInString(c, s) {
  for (i = 0; i < s.length; i++) {
    if (s.charAt(i) === c) return true;
  }
  return false;
}

// Removes initial (leading) whitespace characters from s.
// Global variable whitespace (see above)
// defines which characters are considered whitespace.
function stripInitialWhitespace(s) {
  var i = 0;

  while ((i < s.length) && charInString(s.charAt(i), whitespace))
    i++;

  return s.substring(i, s.length);
}

// Returns true if character c is an English letter 
// (A .. Z, a..z).
//
// NOTE: Need i18n version to support European characters.
// This could be tricky due to different character
// sets and orderings for various languages and platforms.

function isLetter(c) {
  return (((c >= 'a') && (c <= 'z')) || ((c >= 'A') && (c <= 'Z')));
}

// Returns true if character c is a digit 
// (0 .. 9).
function isDigit(c) {
  return ((c >= '0') && (c <= '9'));
}

// Returns true if character c is a letter or digit.
function isLetterOrDigit(c) {
  return (isLetter(c) || isDigit(c));
}

// isInteger (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if all characters in string s are numbers.
//
// Accepts non-signed integers only. Does not accept floating 
// point, exponential notation, etc.
//
// We don't use parseInt because that would accept a string
// with trailing non-numeric characters.
//
// By default, returns defaultEmptyOK if s is empty.
// There is an optional second argument called emptyOK.
// emptyOK is used to override for a single function call
//      the default behavior which is specified globally by
//      defaultEmptyOK.
// If emptyOK is false (or any value other than true), 
//      the function will return false if s is empty.
// If emptyOK is true, the function will return true if s is empty.
//
// EXAMPLE FUNCTION CALL:     RESULT:
// isInteger ('5')            true 
// isInteger ('')             defaultEmptyOK
// isInteger ('-5')           false
// isInteger ('', true)       true
// isInteger ('', false)      false
// isInteger ('5', false)     true
function isInteger(s) {
  var i;

  if (isEmpty(s))
    if (isInteger.arguments.length === 1) return defaultEmptyOK;
    else return (isInteger.arguments[1] === true);

  // Search through string's characters one by one
  // until we find a non-numeric character.
  // When we do, return false; if we don't, return true.

  for (i = 0; i < s.length; i++) {
    // Check that current character is number.
    var c = s.charAt(i);

    if (!isDigit(c)) return false;
  }

  // All characters are numbers.
  return true;
}

// isSignedInteger (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if all characters are numbers; 

// first character is allowed to be + or - as well.
//
// Does not accept floating point, exponential notation, etc.
//
// We don't use parseInt because that would accept a string
// with trailing non-numeric characters.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
//
// EXAMPLE FUNCTION CALL:          RESULT:
// isSignedInteger ('5')           true 
// isSignedInteger ('')            defaultEmptyOK
// isSignedInteger ('-5')          true
// isSignedInteger ('+5')          true
// isSignedInteger ('', false)     false
// isSignedInteger ('', true)      true

function isSignedInteger(s) {
  if (isEmpty(s))
    if (isSignedInteger.arguments.length === 1) return defaultEmptyOK;
    else return (isSignedInteger.arguments[1] === true);

  else {
    var startPos = 0;
    var secondArg = defaultEmptyOK;

    if (isSignedInteger.arguments.length > 1)
      secondArg = isSignedInteger.arguments[1];

    // skip leading + or -
    if ((s.charAt(0) === '-') || (s.charAt(0) === '+')){
      startPos = 1;
    }
    return (isInteger(s.substring(startPos, s.length), secondArg));
  }
}

// isPositiveInteger (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if string s is an integer > 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
function isPositiveInteger(s) {
  var secondArg = defaultEmptyOK;

  if (isPositiveInteger.arguments.length > 1){
    secondArg = isPositiveInteger.arguments[1];
  }

  // The next line is a bit byzantine.  What it means is:
  // a) s must be a signed integer, AND
  // b) one of the following must be true:
  //    i)  s is empty and we are supposed to return true for
  //        empty strings
  //    ii) this is a positive, not negative, number

  return (isSignedInteger(s, secondArg) &&
    ((isEmpty(s) && secondArg) || (parseInt(s) > 0)));
}

// isNonnegativeInteger (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if string s is an integer >= 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
function isNonnegativeInteger(s) {
  var secondArg = defaultEmptyOK;

  if (isNonnegativeInteger.arguments.length > 1){
    secondArg = isNonnegativeInteger.arguments[1];
  }

  // The next line is a bit byzantine.  What it means is:
  // a) s must be a signed integer, AND
  // b) one of the following must be true:
  //    i)  s is empty and we are supposed to return true for
  //        empty strings
  //    ii) this is a number >= 0

  return (isSignedInteger(s, secondArg) &&
    ((isEmpty(s) && secondArg) || (parseInt(s) >= 0)));
}

// isNegativeInteger (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if string s is an integer < 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
function isNegativeInteger(s) {
  var secondArg = defaultEmptyOK;

  if (isNegativeInteger.arguments.length > 1){
    secondArg = isNegativeInteger.arguments[1];
  }

  // The next line is a bit byzantine.  What it means is:
  // a) s must be a signed integer, AND
  // b) one of the following must be true:
  //    i)  s is empty and we are supposed to return true for
  //        empty strings
  //    ii) this is a negative, not positive, number

  return (isSignedInteger(s, secondArg) &&
    ((isEmpty(s) && secondArg) || (parseInt(s) < 0)));
}

// isNonpositiveInteger (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if string s is an integer <= 0.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
function isNonpositiveInteger(s) {
  var secondArg = defaultEmptyOK;

  if (isNonpositiveInteger.arguments.length > 1)
    secondArg = isNonpositiveInteger.arguments[1];

  // The next line is a bit byzantine.  What it means is:
  // a) s must be a signed integer, AND
  // b) one of the following must be true:
  //    i)  s is empty and we are supposed to return true for
  //        empty strings
  //    ii) this is a number <= 0

  return (isSignedInteger(s, secondArg) &&
    ((isEmpty(s) && secondArg) || (parseInt(s) <= 0)));
}

// isFloat (STRING s [, BOOLEAN emptyOK])
// 
// True if string s is an unsigned floating point (real) number. 
//
// Also returns true for unsigned integers. If you wish
// to distinguish between integers and floating point numbers,
// first call isInteger, then call isFloat.
//
// Does not accept exponential notation.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
function isFloat(s) {
  var i;
  var seenDecimalPoint = false;

  if (isEmpty(s))
    if (isFloat.arguments.length === 1) return defaultEmptyOK;
    else return (isFloat.arguments[1] === true);

  if (s === decimalPointDelimiter) return false;

  // Search through string's characters one by one
  // until we find a non-numeric character.
  // When we do, return false; if we don't, return true.

  for (i = 0; i < s.length; i++) {
    // Check that current character is number.
    var c = s.charAt(i);

    if ((c === decimalPointDelimiter) && !seenDecimalPoint) seenDecimalPoint = true;
    else if (!isDigit(c)) return false;
  }

  // All characters are numbers.
  return true;
}

// isSignedFloat (STRING s [, BOOLEAN emptyOK])
// 
// True if string s is a signed or unsigned floating point 
// (real) number. First character is allowed to be + or -.
//
// Also returns true for unsigned integers. If you wish
// to distinguish between integers and floating point numbers,
// first call isSignedInteger, then call isSignedFloat.
//
// Does not accept exponential notation.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
function isSignedFloat(s) {
  if (isEmpty(s)){
    if (isSignedFloat.arguments.length === 1){
      return defaultEmptyOK;
    } else {
      return (isSignedFloat.arguments[1] === true);
    }  

  } else {
    var startPos = 0;
    var secondArg = defaultEmptyOK;

    if (isSignedFloat.arguments.length > 1)
      secondArg = isSignedFloat.arguments[1];

    // skip leading + or -
    if ((s.charAt(0) === '-') || (s.charAt(0) === '+'))
      startPos = 1;
    return (isFloat(s.substring(startPos, s.length), secondArg));
  }
}

// isAlphabetic (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if string s is English letters 
// (A .. Z, a..z) only.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
//
// NOTE: Need i18n version to support European characters.
// This could be tricky due to different character
// sets and orderings for various languages and platforms.
function isAlphabetic(s) {
  var i;
  if (isEmpty(s))
    if (isAlphabetic.arguments.length === 1) return defaultEmptyOK;
    else return (isAlphabetic.arguments[1] === true);

  // Search through string's characters one by one
  // until we find a non-alphabetic character.
  // When we do, return false; if we don't, return true.

  for (i = 0; i < s.length; i++) {
    // Check that current character is letter.
    var c = s.charAt(i);

    if (!isLetter(c))
      return false;
  }

  // All characters are letters.
  return true;
}

// isAlphanumeric (STRING s [, BOOLEAN emptyOK])
// 
// Returns true if string s is English letters 
// (A .. Z, a..z) and numbers only.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.
//
// NOTE: Need i18n version to support European characters.
// This could be tricky due to different character
// sets and orderings for various languages and platforms.
function isAlphanumeric(s) {
  var i;

  if (isEmpty(s))
    if (isAlphanumeric.arguments.length === 1) return defaultEmptyOK;
    else return (isAlphanumeric.arguments[1] === true);

  // Search through string's characters one by one
  // until we find a non-alphanumeric character.
  // When we do, return false; if we don't, return true.

  for (i = 0; i < s.length; i++) {
    // Check that current character is number or letter.
    var c = s.charAt(i);

    if (!(isLetter(c) || isDigit(c)))
      return false;
  }

  // All characters are numbers or letters.
  return true;
}

// reformat (TARGETSTRING, STRING, INTEGER, STRING, INTEGER ... )       
//
// Handy function for arbitrarily inserting formatting characters
// or delimiters of various kinds within TARGETSTRING.
//
// reformat takes one named argument, a string s, and any number
// of other arguments.  The other arguments must be integers or
// strings.  These other arguments specify how string s is to be
// reformatted and how and where other strings are to be inserted
// into it.
//
// reformat processes the other arguments in order one by one.
// * If the argument is an integer, reformat appends that number 
//   of sequential characters from s to the resultString.
// * If the argument is a string, reformat appends the string
//   to the resultString.
//
// NOTE: The first argument after TARGETSTRING must be a string.
// (It can be empty.)  The second argument must be an integer.
// Thereafter, integers and strings must alternate.  This is to
// provide backward compatibility to Navigator 2.0.2 JavaScript
// by avoiding use of the typeof operator.
//
// It is the caller's responsibility to make sure that we do not
// try to copy more characters from s than s.length.
//
// EXAMPLES:
//
// * To reformat a 10-digit U.S. phone number from '1234567890'
//   to '(123) 456-7890' make this function call:
//   reformat('1234567890', '(', 3, ') ', 3, '-', 4)
//
// * To reformat a 9-digit U.S. Social Security number from
//   '123456789' to '123-45-6789' make this function call:
//   reformat('123456789', '', 3, '-', 2, '-', 4)
//
// HINT:
//
// If you have a string which is already delimited in one way
// (example: a phone number delimited with spaces as '123 456 7890')
// and you want to delimit it in another way using function reformat,
// call function stripCharsNotInBag to remove the unwanted 
// characters, THEN call function reformat to delimit as desired.
//
// EXAMPLE:
//
// reformat (stripCharsNotInBag ('123 456 7890', digits),
//           '(', 3, ') ', 3, '-', 4)
function reformat(s) {
  var arg;
  var sPos = 0;
  var resultString = '';

  for (var i = 1; i < reformat.arguments.length; i++) {
    arg = reformat.arguments[i];
    if (i % 2 === 1) resultString += arg;
    else {
      resultString += s.substring(sPos, sPos + arg);
      sPos += arg;
    }
  }
  return resultString;
}


// isYear (STRING s [, BOOLEAN emptyOK])
// 
// isYear returns true if string s is a valid 
// Year number.  Must be 2 or 4 digits only.
// 
// For Year 2000 compliance, you are advised
// to use 4-digit year numbers everywhere.
//
// And yes, this function is not Year 10000 compliant, but 
// because I am giving you 8003 years of advance notice,
// I don't feel very guilty about this ...
//
// For B.C. compliance, write your own function. ;->
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isYear(s) {
  if (isEmpty(s)){
    if (isYear.arguments.length === 1) {
      return defaultEmptyOK;
    } else {
      return (isYear.arguments[1] === true);
    }  
  }  
  if (!isNonnegativeInteger(s)) {
     return false;
  }
  return ((s.length === 2) || (s.length === 4));
}



// isIntegerInRange (STRING s, INTEGER a, INTEGER b [, BOOLEAN emptyOK])
// 
// isIntegerInRange returns true if string s is an integer 
// within the range of integer arguments a and b, inclusive.
// 
// For explanation of optional argument emptyOK,
// see comments of function isInteger.


function isIntegerInRange(s, a, b) {
  if (isEmpty(s))
    if (isIntegerInRange.arguments.length === 1) {
      return defaultEmptyOK;
    } else { 
      return (isIntegerInRange.arguments[1] === true);
    }

  // Catch non-integer strings to avoid creating a NaN below,
  // which isn't available on JavaScript 1.0 for Windows.
  if (!isInteger(s, false)) return false;

  // Now, explicitly change the type to integer via parseInt
  // so that the comparison code below will work both on 
  // JavaScript 1.2 (which typechecks in equality comparisons)
  // and JavaScript 1.1 and before (which doesn't).
  var num = parseInt(s);
  return ((num >= a) && (num <= b));
}



// isMonth (STRING s [, BOOLEAN emptyOK])
// 
// isMonth returns true if string s is a valid 
// month number between 1 and 12.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isMonth(s) {
  if (isEmpty(s))
    if (isMonth.arguments.length === 1) return defaultEmptyOK;
    else return (isMonth.arguments[1] === true);
  return isIntegerInRange(s, 1, 12);
}



// isDay (STRING s [, BOOLEAN emptyOK])
// 
// isDay returns true if string s is a valid 
// day number between 1 and 31.
// 
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function isDay(s) {
  if (isEmpty(s))
    if (isDay.arguments.length === 1) return defaultEmptyOK;
    else return (isDay.arguments[1] === true);
  return isIntegerInRange(s, 1, 31);
}



// daysInFebruary (INTEGER year)
// 
// Given integer argument year,
// returns number of days in February of that year.

function daysInFebruary(year) { // February has 29 days in any year evenly divisible by four,
  // EXCEPT for centurial years which are not also divisible by 400.
  return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}



// isDate (STRING year, STRING month, STRING day)
//
// isDate returns true if string arguments year, month, and day 
// form a valid date.
// 

function isDate(year, month, day) { // catch invalid years (not 2- or 4-digit) and invalid months and days.
  if (!(isYear(year, false) && isMonth(month, false) && isDay(day, false))) return false;

  // Explicitly change type to integer to make code work in both
  // JavaScript 1.1 and JavaScript 1.2.
  var intYear = parseInt(year);
  var intMonth = parseInt(month);
  var intDay = parseInt(day);

  // catch invalid days, except for February
  if (intDay > daysInMonth[intMonth]) return false;

  if ((intMonth == 2) && (intDay > daysInFebruary(intYear))) return false;

  return true;
}

/* FUNCTIONS TO NOTIFY USER OF INPUT REQUIREMENTS OR MISTAKES. */

// Display prompt string s in status bar.
function prompt(s) {
  window.status = s
}

// Display data entry prompt string s in status bar.
function promptEntry(s) {
  window.status = pEntryPrompt + s
}

// Notify user that required field theField is empty.
// String s describes expected contents of theField.value.
// Put focus in theField and return false.

function warnEmpty(theField, s) {
  theField.focus()
  alert(mPrefix + s + mSuffix)
  return false
}

// Notify user that contents of field theField are invalid.
// String s describes expected contents of theField.value.
// Put select theField, pu focus in it, and return false.

function warnInvalid(theField, s) {
  theField.focus()
  theField.select()
  alert(s)
  return false
}

/* FUNCTIONS TO INTERACTIVELY CHECK VARIOUS FIELDS. */

// checkString (TEXTFIELD theField, STRING s, [, BOOLEAN emptyOK==false])
//
// Check that string theField.value is not all whitespace.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function checkString(theField, s, emptyOK) { // Next line is needed on NN3 to avoid 'undefined is not a number' error
  // in equality comparison below.
  if (checkString.arguments.length == 2) emptyOK = defaultEmptyOK;
  if ((emptyOK == true) && (isEmpty(theField.value))) return true;
  if (isWhitespace(theField.value))
    return warnEmpty(theField, s);
  else return true;
}


// Check that string theField.value is a valid Year.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function checkYear(theField, emptyOK) {
  if (checkYear.arguments.length == 1) emptyOK = defaultEmptyOK;
  if ((emptyOK == true) && (isEmpty(theField.value))) return true;
  if (!isYear(theField.value, false))
    return warnInvalid(theField, iYear);
  else return true;
}


// Check that string theField.value is a valid Month.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function checkMonth(theField, emptyOK) {
  if (checkMonth.arguments.length == 1) emptyOK = defaultEmptyOK;
  if ((emptyOK == true) && (isEmpty(theField.value))) return true;
  if (!isMonth(theField.value, false))
    return warnInvalid(theField, iMonth);
  else return true;
}


// Check that string theField.value is a valid Day.
//
// For explanation of optional argument emptyOK,
// see comments of function isInteger.

function checkDay(theField, emptyOK) {
  if (checkDay.arguments.length == 1) emptyOK = defaultEmptyOK;
  if ((emptyOK == true) && (isEmpty(theField.value))) return true;
  if (!isDay(theField.value, false))
    return warnInvalid(theField, iDay);
  else return true;
}



// checkDate (yearField, monthField, dayField, STRING labelString [, OKtoOmitDay==false])
//
// Check that yearField.value, monthField.value, and dayField.value 
// form a valid date.
//
// If they don't, labelString (the name of the date, like 'Birth Date')
// is displayed to tell the user which date field is invalid.
//
// If it is OK for the day field to be empty, set optional argument
// OKtoOmitDay to true.  It defaults to false.

function checkDateX(yearField, monthField, dayField, labelString, OKtoOmitDay) { // Next line is needed on NN3 to avoid 'undefined is not a number' error
  // in equality comparison below.
  if (checkDate.arguments.length == 4) OKtoOmitDay = false;
  if (!isYear(yearField.value)) return warnInvalid(yearField, iYear);
  if (!isMonth(monthField.value)) return warnInvalid(monthField, iMonth);
  if ((OKtoOmitDay == true) && isEmpty(dayField.value)) return true;
  else if (!isDay(dayField.value))
    return warnInvalid(dayField, iDay);
  if (isDate(yearField.value, monthField.value, dayField.value))
    return true;
  alert(iDatePrefix + labelString + iDateSuffix)
  return false
}

// Get checked value from radio button.
function getRadioButtonValue(radio) {
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      break
    }
  }
  return radio[i].value
}

function checkCharCount(obj) {
  // Max characters allowed in the textarea is stored in the ID of the textarea object
  if (obj.value.length > obj.id) {
    obj.value = obj.value.substring(0, obj.id) // if too long...trim it
    alert('Text exceeds max size of ' + obj.id + ' characters and spaces. \nText truncated.')
  }
}

function checkCharCount2(obj, msgdivID, maxLimit) {
  var str = new String(obj.value)
  var len = str.length
  var showstr = len + ' characters of ' + maxLimit + ' entered'
  // Max characters allowed in the textarea is stored in the ID of the textarea object
  if (obj.value.length > maxLimit) {
    obj.value = obj.value.substring(0, maxLimit) // if too long...trim it
    //alert('Text exceeds max size of '+ maxLimit +' characters and spaces. \nText truncated.')
    showstr = 'Text exceeds max of ' + maxLimit + ' characters. <span style=\"color:red\"> Text truncated. </span>';
  } else {
    len = obj.value.length
    showstr = len + ' characters of ' + maxLimit + ' entered'
  }
  document.getElementById(msgdivID).innerHTML = showstr
}

function currencyFormat(fld, milSep, decSep, e) {
  var sep = 0;
  var key = '';
  var i = j = 0;
  var len = len2 = 0;
  var strCheck = '0123456789';
  var aux = aux2 = '';
  var whichCode = (window.Event) ? e.which : e.keyCode;
  if (fld.value.length < fld.maxLength) {
    if (whichCode == 13) return true; // Enter
    if (whichCode == 8) return true; // Delete (Bug fixed)  
    key = String.fromCharCode(whichCode); // Get key value from key code
    if (strCheck.indexOf(key) == -1) return false; // Not a valid key
    len = fld.value.length;
    for (i = 0; i < len; i++)
      if ((fld.value.charAt(i) != '0') && (fld.value.charAt(i) != decSep)) break;
    aux = '';
    for (; i < len; i++)
      if (strCheck.indexOf(fld.value.charAt(i)) != -1) aux += fld.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) fld.value = '';
    if (len == 1) fld.value = '0' + decSep + '0' + aux;
    if (len == 2) fld.value = '0' + decSep + aux;
    if (len > 2) {
      aux2 = '';
      for (j = 0, i = len - 3; i >= 0; i--) {
        if (j == 3) {
          aux2 += milSep;
          j = 0;
        }
        aux2 += aux.charAt(i);
        j++;
      }
      fld.value = '';
      len2 = aux2.length;
      for (i = len2 - 1; i >= 0; i--)
        fld.value += aux2.charAt(i);
      fld.value += decSep + aux.substr(len - 2, len);
    }
  }
  return false;
}

function checkTime(Obj) {
  var timestr = '';
  var timeFormat = '';
  timeFormat = document.getElementById('G_SETTINGS').value;
  timeFormat = timeFormat.substring(0, 4);
  if (timeFormat <= ' ') {
    timeFormat = '@T03'
  }
  timestr = Obj.value
  if (typeof timestr == 'string') {
    timestr = timestr.replace(/ /g, '') // remove spaces globally
    if (timestr.indexOf(':') > 0) {
      timestr = timestr.split(':')
      var hour = 0
      var min = ''
      var ampm = ''
      hour = timestr[0]
      hour = parseInt(hour, 10) // convert string to number
      min = timestr[1]
      ampm = min.substr(2, 2)
      ampm = ampm.toUpperCase()
      if (ampm.substr(0, 1) == 'P') {
        ampm = 'PM';
      } else if (ampm.substr(0, 1) == 'A') {
        ampm = 'AM';
      } else {
        ampm = ' ';
      }
      min = min.substr(0, 2);
      min = parseInt(min, 10); // convert string to number
      if (isInteger(hour) && isInteger(min) &&
        (ampm == 'PM' || ampm == 'AM' || ampm == ' ' || ampm == '')) {
        if (timeFormat == '@T1' || timeFormat == '@T01') {
          if (ampm == 'PM' && hour != 12) {
            hour = hour + 12;
          }
          if ((ampm == 'AM') && (hour == 12)) {
            hour = 00;
          }
          if (hour >= 0 && hour <= 23 && min >= 0 && min <= 59) {
            hour += ''; // convert number to string
            if (hour.length < 2) {
              hour = '0' + hour;
            }
            min += '' // convert number to string
            if (min.length < 2) {
              min = '0' + min;
            }
            Obj.value = hour + ':' + min;
          } else {
            alert('Time is not valid.');
            Obj.focus();
          }
        } else {
          if (hour > 12 && hour < 24) {
            hour -= 12;
            ampm = 'PM';
          }
          if (hour == 0) {
            hour += 12;
            ampm = 'AM';
          }
          if (hour >= 0 && hour <= 12 && min >= 0 && min <= 59) {
            hour += '' // convert number to string
            if (hour.length < 2) {
              hour = '0' + hour;
            }
            min += '' // convert number to string
            if (min.length < 2) {
              min = '0' + min;
            }
            Obj.value = hour + ':' + min + ampm;
          } else {
            alert('Time is not valid.');
            Obj.focus();
          }
        }
      } else {
        alert('Time is not valid.');
        Obj.focus();
      }
    } else if (isEmpty(timestr)) {
      // Do not set focus.  Allow user to move off the time field to Cancel or come back later.
    } else {
      alert('Time is not valid. Use format hh:mm');
      Obj.focus();
    }
  } else {
    alert('Time is not valid.');
    Obj.focus();
  }
}

// calculate the ASCII code of the given character
function CalcKeyCode(aChar) {
  var character = aChar.substring(0, 1);
  var code = aChar.charCodeAt(0);
  return code;
}

function checkNumber(obj, nbrType) {
  var strPass = obj.value;
  var strLength = strPass.length;
  var lchar = obj.value.charAt((strLength) - 1);
  var cCode = CalcKeyCode(lchar);

  if (nbrType == 'Integer') {
    if ((cCode < 48 || cCode > 57) && cCode != 45) {
      strEnd = strLength - 1
      var myNumber = obj.value.substring(0, (strLength) - 1);
      obj.value = myNumber;
    }
  } else if (nbrType == 'PosInteger') {
    if (cCode < 48 || cCode > 57) {
      var myNumber = obj.value.substring(0, (strLength) - 1);
      obj.value = myNumber;
    }
  } else if (nbrType == 'Real') {
    if ((cCode < 48 || cCode > 57) && cCode != 46 && cCode != 45) {
      var myNumber = obj.value.substring(0, (strLength) - 1);
      obj.value = myNumber;
    }
  } else if (nbrType == 'RealComma') {
    if ((cCode < 48 || cCode > 57) && cCode != 46 && cCode != 45 && cCode != 44) {
      var myNumber = obj.value.substring(0, (strLength) - 1);
      obj.value = myNumber;
    }
  } else if (nbrType == 'PosReal') {
    if ((cCode < 48 || cCode > 57) && cCode != 46 && cCode != 44) {
      var myNumber = obj.value.substring(0, (strLength) - 1);
      obj.value = myNumber;
    }
  } else if (nbrType == 'PosRealNoComma') {
    if ((cCode < 48 || cCode > 57) && (cCode != 46)) {
      var myNumber = obj.value.substring(0, (strLength) - 1);
      obj.value = myNumber;
    }
  } else {
    if (cCode < 48 || cCode > 57) {
      var myNumber = obj.value.substring(0, (strLength) - 1);
      obj.value = myNumber;
    }
  }
  return false;
}

function checkDate(obj) {
  //this function used for the onBlur event
  var datefield = obj;
  datefield.value = datefield.value.replace(/\//g, '-'); // replace '/' with '-' globally
  datefield.value = datefield.value.replace(/\./g, '-'); // replace '/' with '-' globally
  datefield.value = datefield.value.replace(/ /g, ''); // remove spaces globally
  if (chkdate(obj) == false) {
    datefield.select();
    alert('That date is invalid.  Please try again.');
    datefield.focus();
    return false;
  } else {
    return true;
  }
}

function checkDate(obj, chkType) {
  //this function used for the onBlur event when property  is set
  var datefield = obj;
  datefield.value = datefield.value.replace(/\//g, '-'); // replace '/' with '-' globally
  datefield.value = datefield.value.replace(/\./g, '-'); // replace '/' with '-' globally
  datefield.value = datefield.value.replace(/ /g, ''); // remove spaces globally
  if (chkdate(obj) == false) {
    datefield.select();
    alert('That date is invalid.  Please try again.');
    datefield.focus();
    return false;
  } else {
    var today = new Date();
    var nd = new Date();
    if (obj.value.length > 0) {
      intMonth -= 1;
      nd.setFullYear(intYear, intMonth, intday);
      if (chkType == 'NoFuture') {
        if (nd > today) {
          alert('Date can not be in the future');
          datefield.select();
          datefield.focus();
          return false;
        }
      } else if (chkType == 'BeforeToday') {
        if (nd >= today) {
          alert('Date must be before today');
          datefield.select();
          datefield.focus();
          return false;
        }
      }
    }
    return true;
  }
}

var intday;
var intMonth;
var intYear;

function checkDateCal(obj) {
  //this function used when the calendar graphic is used (within calendar.js)
  var datefield = obj;
  //datefield.value=datefield.value.replace(/\//g,'-'); // replace '/' with '-' globally
  datefield.value = datefield.value.replace(/ /g, ''); // remove spaces globally
  if (chkdate(obj) == false) {
    datefield.select();
    alert('That date is invalid.  Please try again.');
    datefield.focus();
    return new Date();
  } else {
    var nd = new Date();
    if (obj.value.length > 0) {
      intMonth -= 1;
      nd.setFullYear(intYear, intMonth, intday);
    }
    return nd;
  }
}

function chkdate(obj) {
  var strDate;
  var strDateArray;
  var strDay;
  var strMonth;
  var strYear;

  var booFound = false;
  var datefield = obj;
  var strSeparatorArray = new Array('-', ' ', '/', '.');
  var intElementNr;
  strDate = datefield.value;
  if (strDate.length < 1) {
    return true;
  }
  for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
    if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
      strDateArray = strDate.split(strSeparatorArray[intElementNr]);
      if (strDateArray.length != 3) {
        return false;
      } else {
        strDay = strDateArray[0];
        strMonth = strDateArray[1];
        strYear = strDateArray[2];
      }
      booFound = true;
    }
  }
  if (booFound == false) {
    if (strDate.length > 5) {
      strDay = strDate.substr(0, 2);
      strMonth = strDate.substr(2, 2);
      strYear = strDate.substr(4);
    }
  }
  if (strYear > 2200 || strYear < 1850) {
    return false;
  }
  strTemp = strDay;
  strDay = strMonth;
  strMonth = strTemp;

  intday = parseInt(strDay, 10);
  if (isNaN(intday)) {
    return false;
  }
  intMonth = parseInt(strMonth, 10);
  if (isNaN(intMonth)) {
    return false;
  }
  intYear = parseInt(strYear, 10);
  if (isNaN(intYear)) {
    return false;
  }
  if (intMonth > 12 || intMonth < 1) {
    return false;
  }
  if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
    return false;
  }
  if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
    return false;
  }
  if (intMonth == 2) {
    if (intday < 1) {
      return false;
    }
    if (LeapYear(intYear) == true) {
      if (intday > 29) {
        return false;
      }
    } else {
      if (intday > 28) {
        return false;
      }
    }
  }
  return true;
}

function LeapYear(intYear) {
  if (intYear % 100 == 0) {
    if (intYear % 400 == 0) {
      return true;
    }
  } else {
    if ((intYear % 4) == 0) {
      return true;
    }
  }
  return false;
}