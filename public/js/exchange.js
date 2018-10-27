

//-----------------------------------------------------------------------------
// exchange.js
//
//
// Created:  2007-08-21
// Updated:  	
//-----------------------------------------------------------------------------

function setFocus(objID)  {
  document.getElementById(objID).focus()
}
function loseFocus(objID)  {
  document.getElementById(objID).blur()
}

var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
function simpleEncode(valueArray,maxValue) {
  var chartData = ['s:'];
  for (var i = 0; i < valueArray.length; i++) {
    var currentValue = valueArray[i] * 1;
    if (!isNaN(currentValue) && currentValue >= 0) {
    chartData.push(simpleEncoding.charAt(Math.round((simpleEncoding.length-1) * currentValue / maxValue)));
    } else {
      chartData.push('_');
    }
  }
  return chartData.join('');
}
 
function createChart(pData){
  var valueArray = new Array(3); 
  valueArray=pData.split(",", 3);
  var maxValue = 200;
  var b = simpleEncode(valueArray,maxValue);
  var f = "http://chart.apis.google.com/chart?chs=300x95&chd="+b+"&chxt=x&cht=p3&chxl=0:|Carbohydrate|Fat|Protein"
  document.getElementById("sImg").src=f;  
}

//Compute Diabetic Exchange
function computeExchange()  {
 
   //var sStarchServ='9';
   var rStarchServ=9;
   var rStarchCarb=0;
   var rStarchProtein=0;
   var rStarchFat=0;
   var rStarchCals=0;
   
   //var sFruitServ='3';
   var rFruitServ=3;
   var rFruitCarb=0;
   var rFruitProtein=0;
   var rFruitFat=0;
   var rFuitCals=0;
   
   //var sSkimServ='3';
   var rSkimServ=3;
   var rSkimCarb=0;
   var rSkimProtein=0;
   var rSkimFat=0;
   var rSkimCals=0;
   
   //var sOneMilkServ='0';
   var rOneMilkServ=0;
   var rOneMilkCarb=0;
   var rOneMilkProtein=0;
   var rOneMilkFat=0;
   var rOneMilkCals=0;
   
   //var sTwoMilkServ='0';
   var rTwoMilkServ=0;
   var rTwoMilkCarb=0;
   var rTwoMilkProtein=0;
   var rTwoMilkFat=0;
   var rTwoMilkCals=0;
   
   //var sWholeServ='0';
   var rWholeServ=0;
   var rWholeCarb=0;
   var rWholeProtein=0;
   var rWholeFat=0;
   var rWholeCals=0;
   
   //var sVegServ='';
   var rVegServ=0;
   var rVegCarb=0;
   var rVegProtein=0;
   var rVegFat=0;
   var rVegCals=0;
   
   //var sVLMServ='';
   var rVLMServ=0;
   var rVLMCarb=0;
   var rVLMProtein=0;
   var rVLMFat=0;
   var rVLMCals=0;
   
   //var sLMServ='';
   var rLMServ=0;
   var rLMCarb=0;
   var rLMProtein=0;
   var rLMFat=0;
   var rLMCals=0;
   
   //var sMFMServ='';
   var rMFMServ=0;
   var rMFMCarb=0;
   var rMFMProtein=0;
   var rMFMFat=0;
   var rMFMCals=0;
   
   //var sHFMServ='';
   var rHFMServ=0;
   var rHFMCarb=0;
   var rHFMProtein=0;
   var rHFMFat=0;
   var rHFMCals=0;
   
   //var sFatServ='';
   var rFatServ=0;
   var rFatCarb=0;
   var rFatProtein=0;
   var rFatFat=0;
   var rFatCals=0; 
   
   sStarchServ=document.getElementById("scrStarchServ").value
   sStarchServ=stripWhitespace(sStarchServ)
   if (isSignedFloat(sStarchServ,1)){
     rStarchServ=sStarchServ * 1 //force to use rHeight1 as number	
   }else{
     alert('Starch Servings is not numeric')
	 setFocus("scrStarchServ")
   } 
   if (rStarchServ < 0) {
     alert('Starch Servings can not be negative')
	 setFocus("scrStarchServ")   
   }
   
   sFruitServ=document.getElementById("scrFruitServ").value
   sFruitServ=stripWhitespace(sFruitServ)
   if (isSignedFloat(sFruitServ,1)){
     rFruitServ=sFruitServ * 1 	
   }else{
     alert('Fruit Servings is not numeric')
	 setFocus("scrFruitServ")
   } 
   if (rFruitServ < 0) {
     alert('Fruit Servings can not be negative')
	 setFocus("scrFruitServ")   
   }
   
   sSkimServ=document.getElementById("scrSkimServ").value
   sSkimServ=stripWhitespace(sSkimServ)
   if (isSignedFloat(sSkimServ,1)){
     rSkimServ=sSkimServ * 1 	
   }else{
     alert('Skim Servings is not numeric')
	 setFocus("scrSkimServ")
   } 
   if (rSkimServ < 0) {
     alert('Skim Servings can not be negative')
	 setFocus("scrSkimServ")   
   }
   
   sOneMilkServ=document.getElementById("scrOneMilkServ").value
   sOneMilkServ=stripWhitespace(sOneMilkServ)
   if (isSignedFloat(sOneMilkServ,1)){
     rOneMilkServ=sOneMilkServ * 1 	
   }else{
     alert('OneMilk Servings is not numeric')
	 setFocus("scrOneMilkServ")
   } 
   if (rOneMilkServ < 0) {
     alert('OneMilk Servings can not be negative')
	 setFocus("scrOneMilkServ")   
   }
   
   sTwoMilkServ=document.getElementById("scrTwoMilkServ").value
   sTwoMilkServ=stripWhitespace(sTwoMilkServ)
   if (isSignedFloat(sTwoMilkServ,1)){
     rTwoMilkServ=sTwoMilkServ * 1 	
   }else{
     alert('TwoMilk Servings is not numeric')
	 setFocus("scrTwoMilkServ")
   } 
   if (rTwoMilkServ < 0) {
     alert('TwoMilk Servings can not be negative')
	 setFocus("scrTwoMilkServ")   
   }
   
   sWholeServ=document.getElementById("scrWholeServ").value
   sWholeServ=stripWhitespace(sWholeServ)
   if (isSignedFloat(sWholeServ,1)){
     rWholeServ=sWholeServ * 1 	
   }else{
     alert('Whole Servings is not numeric')
	 setFocus("scrWholeServ")
   } 
   if (rWholeServ < 0) {
     alert('Whole Servings can not be negative')
	 setFocus("scrWholeServ")   
   }
   
   sVegServ=document.getElementById("scrVegServ").value
   sVegServ=stripWhitespace(sVegServ)
   if (isSignedFloat(sVegServ,1)){
     rVegServ=sVegServ * 1 	
   }else{
     alert('Veg Servings is not numeric')
	 setFocus("scrVegServ")
   } 
   if (rVegServ < 0) {
     alert('Veg Servings can not be negative')
	 setFocus("scrVegServ")   
   }
   
   sVLMServ=document.getElementById("scrVLMServ").value
   sVLMServ=stripWhitespace(sVLMServ)
   if (isSignedFloat(sVLMServ,1)){
     rVLMServ=sVLMServ * 1 	
   }else{
     alert('VLM Servings is not numeric')
	 setFocus("scrVLMServ")
   } 
   if (rVLMServ < 0) {
     alert('VLM Servings can not be negative')
	 setFocus("scrVLMServ")   
   }
   
   sLMServ=document.getElementById("scrLMServ").value
   sLMServ=stripWhitespace(sLMServ)
   if (isSignedFloat(sLMServ,1)){
     rLMServ=sLMServ * 1 	
   }else{
     alert('LM Servings is not numeric')
	 setFocus("scrLMServ")
   } 
   if (rLMServ < 0) {
     alert('LM Servings can not be negative')
	 setFocus("scrLMServ")   
   }
   
   sMFMServ=document.getElementById("scrMFMServ").value
   sMFMServ=stripWhitespace(sMFMServ)
   if (isSignedFloat(sMFMServ,1)){
     rMFMServ=sMFMServ * 1 	
   }else{
     alert('MFM Servings is not numeric')
	 setFocus("scrMFMServ")
   } 
   if (rMFMServ < 0) {
     alert('MFM Servings can not be negative')
	 setFocus("scrMFMServ")   
   }
   
   sHFMServ=document.getElementById("scrHFMServ").value
   sHFMServ=stripWhitespace(sHFMServ)
   if (isSignedFloat(sHFMServ,1)){
     rHFMServ=sHFMServ * 1 	
   }else{
     alert('HFM Servings is not numeric')
	 setFocus("scrHFMServ")
   } 
   if (rHFMServ < 0) {
     alert('HFM Servings can not be negative')
	 setFocus("scrHFMServ")   
   }
   
   sFatServ=document.getElementById("scrFatServ").value
   sFatServ=stripWhitespace(sFatServ)
   if (isSignedFloat(sFatServ,1)){
     rFatServ=sFatServ * 1 	
   }else{
     alert('Fat Servings is not numeric')
	 setFocus("scrFatServ")
   } 
   if (rFatServ < 0) {
     alert('Fat Servings can not be negative')
	 setFocus("scrFatServ")   
   }
   
   rStarchCarb = rStarchServ * 15;
   rStarchProtein = rStarchServ * 3;
   rStarchFat = rStarchServ * 1;
   rStarchCals = rStarchServ * 80;
   sStarchCarb = NoDecFormat(rStarchCarb);
   document.getElementById("scrStarchCarb").innerHTML=sStarchCarb;
   sStarchProtein = NoDecFormat(rStarchProtein);
   document.getElementById("scrStarchProtein").innerHTML=sStarchProtein;
   sStarchFat = NoDecFormat(rStarchFat);
   document.getElementById("scrStarchFat").innerHTML=sStarchFat;
   sStarchCals = NoDecFormat(rStarchCals);
   document.getElementById("scrStarchCals").innerHTML=sStarchCals;
   
   rFruitCarb = rFruitServ * 15;
   rFruitProtein = rFruitServ * 0;
   rFruitFat = rFruitServ * 0;
   rFruitCals = rFruitServ * 60;
   sFruitCarb = NoDecFormat(rFruitCarb);
   document.getElementById("scrFruitCarb").innerHTML=sFruitCarb;
   sFruitProtein = NoDecFormat(rFruitProtein);
   document.getElementById("scrFruitProtein").innerHTML=sFruitProtein;
   sFruitFat = NoDecFormat(rFruitFat);
   document.getElementById("scrFruitFat").innerHTML=sFruitFat;
   sFruitCals = NoDecFormat(rFruitCals);
   document.getElementById("scrFruitCals").innerHTML=sFruitCals;
      
   rSkimCarb = rSkimServ * 12;
   rSkimProtein = rSkimServ * 8;
   rSkimFat = rSkimServ * 0;
   rSkimCals = rSkimServ * 90;
   sSkimCarb = NoDecFormat(rSkimCarb);
   document.getElementById("scrSkimCarb").innerHTML=sSkimCarb;
   sSkimProtein = NoDecFormat(rSkimProtein);
   document.getElementById("scrSkimProtein").innerHTML=sSkimProtein;
   sSkimFat = NoDecFormat(rSkimFat);
   document.getElementById("scrSkimFat").innerHTML=sSkimFat;
   sSkimCals = NoDecFormat(rSkimCals);
   document.getElementById("scrSkimCals").innerHTML=sSkimCals;
   
   rOneMilkCarb = rOneMilkServ * 12;
   rOneMilkProtein = rOneMilkServ * 8;
   rOneMilkFat = rOneMilkServ * 1;
   rOneMilkCals = rOneMilkServ * 100;
   sOneMilkCarb = NoDecFormat(rOneMilkCarb);
   document.getElementById("scrOneMilkCarb").innerHTML=sOneMilkCarb;
   sOneMilkProtein = NoDecFormat(rOneMilkProtein);
   document.getElementById("scrOneMilkProtein").innerHTML=sOneMilkProtein;
   sOneMilkFat = NoDecFormat(rOneMilkFat);
   document.getElementById("scrOneMilkFat").innerHTML=sOneMilkFat;
   sOneMilkCals = NoDecFormat(rOneMilkCals);
   document.getElementById("scrOneMilkCals").innerHTML=sOneMilkCals;
   
   rTwoMilkCarb = rTwoMilkServ * 12;
   rTwoMilkProtein = rTwoMilkServ * 8;
   rTwoMilkFat = rTwoMilkServ * 3;
   rTwoMilkCals = rTwoMilkServ * 120;
   sTwoMilkCarb = NoDecFormat(rTwoMilkCarb);
   document.getElementById("scrTwoMilkCarb").innerHTML=sTwoMilkCarb;
   sTwoMilkProtein = NoDecFormat(rTwoMilkProtein);
   document.getElementById("scrTwoMilkProtein").innerHTML=sTwoMilkProtein;
   sTwoMilkFat = NoDecFormat(rTwoMilkFat);
   document.getElementById("scrTwoMilkFat").innerHTML=sTwoMilkFat;
   sTwoMilkCals = NoDecFormat(rTwoMilkCals);
   document.getElementById("scrTwoMilkCals").innerHTML=sTwoMilkCals;
   
   rWholeCarb = rWholeServ * 12;
   rWholeProtein = rWholeServ * 8;
   rWholeFat = rWholeServ * 5;
   rWholeCals = rWholeServ * 150;
   sWholeCarb = NoDecFormat(rWholeCarb);
   document.getElementById("scrWholeCarb").innerHTML=sWholeCarb;
   sWholeProtein = NoDecFormat(rWholeProtein);
   document.getElementById("scrWholeProtein").innerHTML=sWholeProtein;
   sWholeFat = NoDecFormat(rWholeFat);
   document.getElementById("scrWholeFat").innerHTML=sWholeFat;
   sWholeCals = NoDecFormat(rWholeCals);
   document.getElementById("scrWholeCals").innerHTML=sWholeCals;
   
   rVegCarb = rVegServ * 5;
   rVegProtein = rVegServ * 2;
   rVegFat = rVegServ * 0;
   rVegCals = rVegServ * 25;
   sVegCarb = NoDecFormat(rVegCarb);
   document.getElementById("scrVegCarb").innerHTML=sVegCarb;
   sVegProtein = NoDecFormat(rVegProtein);
   document.getElementById("scrVegProtein").innerHTML=sVegProtein;
   sVegFat = NoDecFormat(rVegFat);
   document.getElementById("scrVegFat").innerHTML=sVegFat;
   sVegCals = NoDecFormat(rVegCals);
   document.getElementById("scrVegCals").innerHTML=sVegCals;
   
   rVLMCarb = rVLMServ * 0;
   rVLMProtein = rVLMServ * 7;
   rVLMFat = rVLMServ * 1;
   rVLMCals = rVLMServ * 35;
   sVLMCarb = NoDecFormat(rVLMCarb);
   document.getElementById("scrVLMCarb").innerHTML=sVLMCarb;
   sVLMProtein = NoDecFormat(rVLMProtein);
   document.getElementById("scrVLMProtein").innerHTML=sVLMProtein;
   sVLMFat = NoDecFormat(rVLMFat);
   document.getElementById("scrVLMFat").innerHTML=sVLMFat;
   sVLMCals = NoDecFormat(rVLMCals);
   document.getElementById("scrVLMCals").innerHTML=sVLMCals;
   
   rLMCarb = rLMServ * 0;
   rLMProtein = rLMServ * 7;
   rLMFat = rLMServ * 3;
   rLMCals = rLMServ * 55;
   sLMCarb = NoDecFormat(rLMCarb);
   document.getElementById("scrLMCarb").innerHTML=sLMCarb;
   sLMProtein = NoDecFormat(rLMProtein);
   document.getElementById("scrLMProtein").innerHTML=sLMProtein;
   sLMFat = NoDecFormat(rLMFat);
   document.getElementById("scrLMFat").innerHTML=sLMFat;
   sLMCals = NoDecFormat(rLMCals);
   document.getElementById("scrLMCals").innerHTML=sLMCals;
   
   rMFMCarb = rMFMServ * 0;
   rMFMProtein = rMFMServ * 7;
   rMFMFat = rMFMServ * 5;
   rMFMCals = rMFMServ * 75;
   sMFMCarb = NoDecFormat(rMFMCarb);
   document.getElementById("scrMFMCarb").innerHTML=sMFMCarb;
   sMFMProtein = NoDecFormat(rMFMProtein);
   document.getElementById("scrMFMProtein").innerHTML=sMFMProtein;
   sMFMFat = NoDecFormat(rMFMFat);
   document.getElementById("scrMFMFat").innerHTML=sMFMFat;
   sMFMCals = NoDecFormat(rMFMCals);
   document.getElementById("scrMFMCals").innerHTML=sMFMCals;
   
   rHFMCarb = rHFMServ * 0;
   rHFMProtein = rHFMServ * 7;
   rHFMFat = rHFMServ * 8;
   rHFMCals = rHFMServ * 100;
   sHFMCarb = NoDecFormat(rHFMCarb);
   document.getElementById("scrHFMCarb").innerHTML=sHFMCarb;
   sHFMProtein = NoDecFormat(rHFMProtein);
   document.getElementById("scrHFMProtein").innerHTML=sHFMProtein;
   sHFMFat = NoDecFormat(rHFMFat);
   document.getElementById("scrHFMFat").innerHTML=sHFMFat;
   sHFMCals = NoDecFormat(rHFMCals);
   document.getElementById("scrHFMCals").innerHTML=sHFMCals;
   
   rFatCarb = rFatServ * 0;
   rFatProtein = rFatServ * 0;
   rFatFat = rFatServ * 5;
   rFatCals = rFatServ * 45;
   sFatCarb = NoDecFormat(rFatCarb);
   document.getElementById("scrFatCarb").innerHTML=sFatCarb;
   sFatProtein = NoDecFormat(rFatProtein);
   document.getElementById("scrFatProtein").innerHTML=sFatProtein;
   sFatFat = NoDecFormat(rFatFat);
   document.getElementById("scrFatFat").innerHTML=sFatFat;
   sFatCals = NoDecFormat(rFatCals);
   document.getElementById("scrFatCals").innerHTML=sFatCals;
   
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
   rTotCarb = (rStarchCarb + rFruitCarb + rSkimCarb + rOneMilkCarb + rTwoMilkCarb + rWholeCarb + rVegCarb + rVLMCarb + rLMCarb + rMFMCarb + rHFMCarb + rFatCarb)*1;
   sTotCarb = NoDecFormat(rTotCarb);
   document.getElementById("scrTotCarb").innerHTML=sTotCarb;
   rTotProtein = (rStarchProtein + rFruitProtein + rSkimProtein + rOneMilkProtein + rTwoMilkProtein + rWholeProtein + rVegProtein + rVLMProtein + rLMProtein + rMFMProtein + rHFMProtein + rFatProtein)*1;
   sTotProtein = NoDecFormat(rTotProtein);
   document.getElementById("scrTotProtein").innerHTML=sTotProtein;
   rTotFat = (rStarchFat + rFruitFat + rSkimFat + rOneMilkFat + rTwoMilkFat + rWholeFat + rVegFat + rVLMFat + rLMFat + rMFMFat + rHFMFat + rFatFat)*1;
   sTotFat = NoDecFormat(rTotFat);
   document.getElementById("scrTotFat").innerHTML=sTotFat;
   rTotCals = (rStarchCals + rFruitCals + rSkimCals + rOneMilkCals + rTwoMilkCals + rWholeCals + rVegCals + rVLMCals + rLMCals + rMFMCals + rHFMCals + rFatCals) * 1;
   sTotCals = NoDecFormat(rTotCals);
   document.getElementById("scrTotCals").innerHTML=sTotCals;
   
   var rPerCarb = 0;
   var sPerCarb = '';   
   var rPerProtein = 0;
   var sPerProtein = '';
   var rPerFat = 0;
   var sPerFat = '';
   rPerCarb = ((rTotCarb * 4) / rTotCals)*100;
   sPerCarb = NoDecFormat(rPerCarb);
   document.getElementById("scrPerCarb").innerHTML=sPerCarb+'%';
   rPerProtein = ((rTotProtein * 4) / rTotCals)*100;
   sPerProtein = NoDecFormat(rPerProtein);
   document.getElementById("scrPerProtein").innerHTML=sPerProtein+'%';
   rPerFat = ((rTotFat * 9) / rTotCals)*100;
   sPerFat = NoDecFormat(rPerFat);
   document.getElementById("scrPerFat").innerHTML=sPerFat+'%';
   
   var aaa=Math.round(sPerCarb)+","+Math.round(sPerFat)+","+Math.round(sPerProtein)

   //createChart(aaa)
}

//Clear screen fields
function clearScr()  {
  
  document.getElementById("scrStarchServ").value    = '9';
  document.getElementById("scrStarchCarb").value    = '';
  document.getElementById("scrStarchProtein").value    = '';
  document.getElementById("scrStarchFat").value    = '';
  document.getElementById("scrStarchCals").value    = '';
  
  document.getElementById("scrFruitServ").value     = '3';
  document.getElementById("scrFruitCarb").value    = '';
  document.getElementById("scrFruitProtein").value    = '';
  document.getElementById("scrFruitFat").value    = '';
  document.getElementById("scrFruitCals").value    = '';
 
  document.getElementById("scrSkimServ").value      = '3';
  document.getElementById("scrSkimCarb").value    = '';
  document.getElementById("scrSkimProtein").value    = '';
  document.getElementById("scrSkimFat").value    = '';
  document.getElementById("scrSkimCals").value    = '';
 
  document.getElementById("scrOneMilkServ").value   = '0';
  document.getElementById("scrOneMilkCarb").value    = '';
  document.getElementById("scrOneMilkProtein").value    = '';
  document.getElementById("scrOneMilkFat").value    = '';
  document.getElementById("scrOneMilkCals").value    = '';
 
  document.getElementById("scrTwoMilkServ").value   = '0';
  document.getElementById("scrTwoMilkCarb").value    = '';
  document.getElementById("scrTwoMilkProtein").value    = '';
  document.getElementById("scrTwoMilkFat").value    = '';
  document.getElementById("scrTwoMilkCals").value    = '';
 
  document.getElementById("scrWholeServ").value     = '0';
  document.getElementById("scrWholeCarb").value    = '';
  document.getElementById("scrWholeProtein").value    = '';
  document.getElementById("scrWholeFat").value    = '';
  document.getElementById("scrWholeCals").value    = '';
 
  document.getElementById("scrVegServ").value       = '4';
  document.getElementById("scrVegCarb").value    = '';
  document.getElementById("scrVegProtein").value    = '';
  document.getElementById("scrVegFat").value    = '';
  document.getElementById("scrVegCals").value    = '';
 
  document.getElementById("scrVLMServ").value  = '1';
  document.getElementById("scrVLMCarb").value    = '';
  document.getElementById("scrVLMProtein").value    = '';
  document.getElementById("scrVLMFat").value    = '';
  document.getElementById("scrVLMCals").value    = '';
 
  document.getElementById("scrLMServ").value  = '0';
  document.getElementById("scrLMCarb").value    = '';
  document.getElementById("scrLMProtein").value    = '';
  document.getElementById("scrLMFat").value    = '';
  document.getElementById("scrLMCals").value    = '';
 
  document.getElementById("scrMFMServ").value   = '0';
  document.getElementById("scrMFMCarb").value    = '';
  document.getElementById("scrMFMProtein").value    = '';
  document.getElementById("scrMFMFat").value    = '';
  document.getElementById("scrMFMCals").value    = '';
 
  document.getElementById("scrHFMServ").value  = '0';
  document.getElementById("scrHFMCarb").value    = '';
  document.getElementById("scrHFMProtein").value    = '';
  document.getElementById("scrHFMFat").value    = '';
  document.getElementById("scrHFMCals").value    = '';
 
  document.getElementById("scrFatServ").value       = '3';
  document.getElementById("scrFatCarb").value    = '';
  document.getElementById("scrFatProtein").value    = '';
  document.getElementById("scrFatFat").value    = '';
  document.getElementById("scrFatCals").value    = '';
 
  //document.getElementById("scrTargetCals").value    = '2000';
  //document.getElementById("scrCalcCals").innerHTML  = ' '; 
 
  document.getElementById("scrNotes").value  = ''; 
  computeExchange()
}

function NoDecFormat(amount){
  var i = parseFloat(amount);
  if(isNaN(i)) { i = 0; }
  var minus = '';
  if(i < 0) { minus = '-'; }
  i = Math.abs(i);
  i = parseInt((i + .005) * 100);
  i = i / 100;
  s = new String(i);
  if(s.indexOf('.') < 0) { s += ''; }
  if(s.indexOf('.') == (s.length )) { s += '0'; }
  s = minus + s;
  return s;
}

function onBodyLoad() {
  clearScr();
  computeExchange();
}
function openWin() {
  location.href="./help1.htm"
}
function openWin(a) {
  location.href=a
}

 
