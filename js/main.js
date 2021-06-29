/*jslint browser:true */
"use strict";

function addMonths(elem) {
let annualUseKw=0, dailyUseKw=0, i=0, x=0
let months=document.getElementById(elem).getElementsByTagName('input')

//console.log(months)

for (i=0; i<months.length; i++) {
    x = Number(months[i].value)
    annualUseKw += x
} //end loop

dailyUseKw = annualUseKw/365
return dailyUseKw
} //end function


function sunHours() {
let hrs
let theZone = document.forms.solarForm.zone.selectedIndex
theZone +=1
switch(theZone) {
        case 1:
            hrs = 6
            break;
        case 2:
            hrs = 5.5
            break;
        case 3:
            hrs = 5
            break;
        case 4:
            hrs = 4.5
            break;
        case 5:
            hrs=4.2
            break;
        case 6:
            hrs=3.5
            break;
        default:
            hrs=0
    } //end switch
return hrs
} //end function

function calculatePanel() {
    let userChoice = document.forms.solarForm.panel.selectedIndex
    let panelOptions = document.forms.solarForm.panel.options
    let power = panelOptions[userChoice].value
    let name = panelOptions[userChoice].text
    let x = [power, name]
     return x
} //end function





function calculateSolar() {
    let dailyUseKw = addMonths('mpc')
    //console.log(dailyUseKw)

    let sunHoursPerDay = sunHours()
    //console.log(sunHoursPerDay)

    let minKwNeeds = dailyUseKw/sunHoursPerDay
    //console.log(minKwNeeds)

    let realKwNeeds = minKwNeeds * 1.25
    //console.log(realKwNeeds)

    let realWattNeeds = realKwNeeds * 1000
    //console.log(realWattNeeds)

    let panelInfo = calculatePanel()
    let panelOutput = panelInfo[0]
    let panelName = panelInfo[1]
    //console.log(panelOutput)
    //console.log(panelName)

    let panelsNeeded = Math.ceil(realWattNeeds/panelOutput)

    //console.log(panelsNeeded)

    let feedback = ""
    feedback += "<p>Based on dialy use of "+Math.round(dailyUseKw) +" kWH, you will need "+ panelsNeeded +" "+ panelName +" solar panels to offset 100% electric bill</p>"
    feedback += "<h2>Additional Details</p>"
    feedback += "<p>daily electric: "+Math.round(dailyUseKw) +" Kwh per day</p>"
    feedback += "<p>sunshine hours: "+sunHoursPerDay+" hours</p>"
    feedback += "<p>realistic watts: "+Math.round(realWattNeeds) +" watts/hour</p>"
    feedback += "<p>"+panelName+" panel: "+panelOutput+" watts per hour</p>"

    document.getElementById('feedback').innerHTML=feedback

} //end function


