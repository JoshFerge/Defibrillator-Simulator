// For Old IE
if (!window.console) window.console = {};
if (!window.console.log) {}

var analyzeCharge;
var on = false;
var isEnergySelectionOn = false;
var chargeJoules = 2;
var fchargeJoules = 2;
var isShockReady = false;
var initp = 130;
var PacerCurrent = 30;
var PacerRate = 100;
var isPacerOn = false;
var isCPROn = false;
var isLeftPadConnected = false;
var isRightPadConnected = false;
var isLLEKGConnected = false;
var isLAEKGConnected = false;
var isRAEKGConnected = false;
var isLeadSelectOn = false;
var turnEnergyOff;
var patientState = "VTac";
var isCharging = false;
var heartRate = 98;
var leadNum = 1;
var TickVar = null;
var c;
var b;
var heartBeat;
var isTestPlugAttached = true;
var isElectrodesConnected = false;
var isSyncOn;
var isTutorialOn = false;
var leadStatus = "Paddles";
var ispacerFuncOn;
var isRhythmTransitionOn = false;
var changeInit;
var isTransOver;
var readyForDeletion;
var transitonRhythm;
var isAEDOn = false;
var isTherapyCableAttached = true;
var isECGStumpAttached = true;
var isOnLoading = false;
var isChargeDialogOn = false;
var instance;
var istestPlugCharged = false;
var dataLogString = "";
var isTestOn = false;
var CPRDeathTime;
var HRNum;
var MinDeathTimeout;
var errorstatus;
var casePointsTimeDeduction;
var SyncwinTimeout;
var DefibSession = {
  Id: -1,
  UserId: "",
  SessionDate: ""
};
var TestCase1 = {
  Casenum: 1,
  SessionId: -1,
  UserID: "d",
  FirstTimeUser: true,
  SessionDate: 50,
  TimeToStartCPR: -1,
  TimeToTurnDefibOn: -1,
  TimeToPadsAttached: -1,
  ShocKWithEnergyGreaterThan59: false,
  AnalyzePressed: false,
  ShockInAnalyze: false,
  ClickedStartCPRAfterShock: false,
  SurvivalStateReached: false,
  DeathStateReached: false,
  TotalCaseTime: 0,
  CaseTimeMoreThanFourMin: false,
  CaseTimeLessThan2Min: false,
  TotalPoints: 0
};
var TestCase2 = {
  Casenum: 2,
  UserID: "d",
  FirstTimeUser: true,
  SessionDate: 50,
  VFibStateEntered: false,
  TimeToStartCPRAfterVFib: 0,
  TimeToTurnDefibOn: -1,
  TimeToPadsAttached: -1,
  ShockWithEnergyGreaterThan84: false,
  VFibStartTime: 0,
  ShockWithoutSync: false,
  AnalyzePressed: false,
  ShockInAnalyze: false,
  StartedCPRAfterVFibShock: false,
  SurvivalStateReached: false,
  DeathStateReached: false,
  TotalCaseTime: 0,
  CaseTimeMoreThanFourMin: false,
  CaseTimeLessThan2Min: false,
  TotalPoints: 0
};
var TestCase3 = {
  Casenum: 3,
  UserID: "d",
  FirstTimeUser: true,
  SessionDate: 50,
  TimeToTurnDefibOn: -1,
  TimeToPadsAttached: -1,
  ECGLeadsPlaced: false,
  TimeToECGLeadsPlaced: -1,
  EnergySelectWhilePacing: false,
  AnalyzePressed: false,
  ShockInAnalyze: false,
  SurvivalStateReached: false,
  ClickedAssessAfterPatient: false,
  DeathStateReached: false,
  TotalCaseTime: 0,
  CaseTimeMoreThanFourMin: false,
  CaseTimeLessThan2Min: false,
  TotalPoints: 0
};
var objToday = new Date(),
  weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = new Array('th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'),
  dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder[objToday.getDate()] : objToday.getDate() + domEnder[parseFloat(("" + objToday.getDate()).substr(("" + objToday.getDate()).length - 1))],
  months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear(),
  curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
  curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
  curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
  curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

othershockbool = true;
TestCase3.SessionDate = today;
TestCase2.SessionDate = today;
TestCase1.SessionDate = today;

var startTime = new Date() / 1000;
var tickTime = new Date();

var parseQueryString = function() {
  var str = window.location.search;
  var objURL = {};
  str.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function($0, $1, $2, $3) {
      objURL[$1] = $3;
    }
  );
  return objURL;
};
var params = parseQueryString();
if (DefibSession.UserId == '' && params['user'] != '') {
  DefibSession.UserId = params['user'];
}
function transformMiliseconds(t) {
  var h = Math.floor((t / (1000 * 60 * 60)) % 24);
  var m = Math.floor((t / (1000 * 60)) % 60);
  var s = Math.floor((t / 1000) % 60);

  h = (h < 10) ? '0' + h : h;
  m = (m < 10) ? '0' + m : m;
  s = (s < 10) ? '0' + s : s;
  return h + ':' + m + ':' + s;
}
//ticker function that will refresh our display every second
function tick1() {
  var newd = new Date();
  document.getElementById('time_ticker').innerHTML = transformMiliseconds(newd - tickTime);
  document.getElementById('score').innerHTML = TestCase1.TotalPoints;

}

function tick2() {
  var newd = new Date();
  document.getElementById('time_ticker').innerHTML = transformMiliseconds(newd - tickTime);
  document.getElementById('score').innerHTML = TestCase2.TotalPoints;

}

function tick3() {
  var newd = new Date();
  document.getElementById('time_ticker').innerHTML = transformMiliseconds(newd - tickTime);
  document.getElementById('score').innerHTML = TestCase3.TotalPoints;

}


//the runner
if (GetUrlValue('testnum') == 4)
  var t = setInterval(tick1, 1000);

if (GetUrlValue('testnum') == 5)
  var t = setInterval(tick2, 1000);

if (GetUrlValue('testnum') == 6)
  var t = setInterval(tick3, 1000);

function GetUrlValue(VarSearch) {
  var SearchString = window.location.search.substring(1);
  var VariableArray = SearchString.split('&');
  for (var i = 0; i < VariableArray.length; i++) {
    var KeyValuePair = VariableArray[i].split('=');
    if (KeyValuePair[0] == VarSearch) {
      return KeyValuePair[1];
    }
  }
}

function sendPostData(data) {
  alert('NOTE: This is for debugging purposes.\nIf you see this message then sendPostData was called\nand we will try to log the results now.');
  var sessId = params["sess"];
  if (sessId && sessId > 1) {
    DefibSession.Id = sessId;
  }
  var userId = params["user"];
  if (userId) {
    DefibSession.UserId = params["user"];
  }
  if (DefibSession.Id == -1) {
    DefibSession.SessionDate = new Date();
    $.ajax({
      type: "POST",
      async: false,
      contentType: "application/json; charset=utf-8",
      url: "/Services/DefibSimulatorSvc.svc/DefibSession",
      //url: "https://defibsim.thechildrenshospital.org/DefibSimulatorSvc.svc/DefibSession",
      data: JSON.stringify(DefibSession),
      dataType: "json",
      success: function(response) {
        DefibSession = response;
        postCaseResult(data);
      },
      error: function(request, status, error) {
        alert("Could not create session for results: " + request.responseText);
        //alert(request.status);
        //alert(request.statusText);
      }
    });
  } else {
    postCaseResult(data);
  }
  alert('NOTE: This is for debugging purposes.\nAttempt to log results completed.');
}

function postCaseResult(data) {
  var caseURI = '';
  if (data.Casenum == 1) {
    caseURI = 'CaseAResult';
  } else if (data.Casenum == 2) {
    caseURI = 'CaseBResult';
  } else if (data.Casenum == 3) {
    caseURI = 'CaseCResult';
  }

  data.UserId = DefibSession.UserId;
  data.SessionId = DefibSession.Id;
  if (caseURI != '') {
    $.ajax({
      type: "POST",
      async: false,
      contentType: "application/json; charset=utf-8",
      url: "/Services/DefibSimulatorSvc.svc/" + caseURI,
      //url: "https://defibsim.thechildrenshospital.org/DefibSimulatorSvc.svc/" + caseURI,
      data: JSON.stringify(data),
      dataType: "json",
      success: function(response) {
        //alert('NOTE: This is for debugging purposes.\nIf you see this message then the results should have been logged.');
      },
      error: function(request, status, error) {
        alert("Could not log result" + request.responseText);
        //alert(request.status);
        //alert(request.statusText);
      }
    });
  }
}

function showMeHow() {
  if (isRAEKGConnected && isLAEKGConnected && isLLEKGConnected) {
    $("#LAEKG").animate({
      "left": "946px",
      "top": "70px"
    });
    $("#LLEKG").animate({
      "left": "913px",
      "top": "70px"
    });
    $("#RAEKG").animate({
      "left": "880px",
      "top": "70px"
    });
    isRAEKGConnected = false;
    isLAEKGConnected = false;
    isLLEKGConnected = false;
    document.getElementById('EKGBox').style.display = "block";
    document.getElementById('EKGBoxText').style.display = "block";
    threeEKGController();
  } else {
    $("#LAEKG").animate({
      "left": "941px",
      "top": "326px"
    });
    $("#LLEKG").animate({
      "left": "948px",
      "top": "432px"
    });
    $("#RAEKG").animate({
      "left": "850px",
      "top": "352px"
    });
    isRAEKGConnected = true;
    isLAEKGConnected = true;
    isLLEKGConnected = true;
    threeEKGController();
  }
}

function showMeHow2() {
  if (isLeftPadConnected && isRightPadConnected) {
    instance.animate($("#LeftPad"), {
      "left": "950px",
      "top": "500px"
    });
    instance.animate($("#RightPad"), {
      "left": "1000px",
      "top": "500px"
    });
    instance.animate($("#GrayCable"), {
      "left": "820px",
      "top": "548px"
    });
    instance.animate($("#TherapyCable"), {
      "left": "548px",
      "top": "561px"
    });
    isLeftPadConnected = false;
    isRightPadConnected = false;
    isElectrodesConnected = true;
    isTherapyCableAttached = true;
    isTestPlugAttached = false;
    document.getElementById('RemoveTestPlug').style.display = "none";
    ecgController();
  } else {
    instance.animate($("#LeftPad"), {
      "left": "838px",
      "top": "371px"
    });
    instance.animate($("#RightPad"), {
      "left": "947px",
      "top": "390px"
    });
    instance.animate($("#GrayCable"), {
      "left": "820px",
      "top": "548px"
    });
    instance.animate($("#TherapyCable"), {
        "left": "548px",
        "top": "561px"
      });

    isLeftPadConnected = true;
    isRightPadConnected = true;
    isElectrodesConnected = true;
    isTherapyCableAttached = true;
    isTestPlugAttached = false;
    document.getElementById('RemoveTestPlug').style.display = "none";
    ecgController();
  }
}

document.syncInterval = -1;
document.bcapsule = "black url('assets/Flatline.png')";
document.ccapsule = "black url('assets/Flatline.png')";

$(function() {
  document.getElementById('shockprompt').addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  MinDeathTimeout = setTimeout(function() {
    if (GetUrlValue('testnum') == 4) {
      TestCase1.DeathStateReached = true;
      document.getElementById("PatientInfo").innerHTML = "Unfortunately the baby has died. You will need to speak with the family. Please review VF management and repeat the VF cases on the simulator another time. <a href=\"Tutorial.html?testnum=5&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "\"> Click here to advance to the next test case.</a>";

      TestCase1.SurvivalStateReached = false;
      TestCase1.TotalCaseTime = Math.round((new Date() / 1000) - startTime);

      TestCase1.TotalPoints -= 100;
      if (TestCase1.TotalCaseTime > 60 * 4) {
        TestCase1.CaseTimeMoreThanFourMin = true;
      }
      if (TestCase1.TotalCaseTime < 60 * 2) {
        TestCase1.CaseTimeLessThan2Min = true;
      }
      sendPostData(TestCase1);
      errorController(10);
    }
    if (GetUrlValue('testnum') == 5) {
      TestCase2.DeathStateReached = true;
      document.getElementById("PatientInfo").innerHTML = "Unfortunately, the baby has died. You will need to speak with the family. Please review SVT management and repeat the case on the simulator another time. <a href=\"Tutorial.html?testnum=6&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "\"> Click here to advance to the next test case.</a>";

      TestCase2.SurvivalStateReached = false;
      TestCase2.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
      TestCase2.TotalPoints -= 100;

      if (TestCase2.TotalCaseTime > 60 * 4) {
        TestCase2.CaseTimeMoreThanFourMin = true;
      }
      if (TestCase2.TotalCaseTime < 60 * 2) {
        TestCase2.CaseTimeLessThan2Min = true;
      }
      sendPostData(TestCase2);
      errorController(11);
    }
    if (GetUrlValue('testnum') == 6) {
      document.getElementById("PatientInfo").innerHTML = "Unfortunately your patient has died. You will need to speak with the family. Please review how to performa transcutaneous pacing and try this case again another time. You have now completed all the test cases on this simulator.";
      TestCase3.DeathStateReached = true;
      TestCase3.SurvivalStateReached = false;
      TestCase3.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
      TestCase3.TotalPoints -= 100;

      if (TestCase3.TotalCaseTime > 60 * 4) {
        TestCase3.CaseTimeMoreThanFourMin = true;
      }
      if (TestCase3.TotalCaseTime < 60 * 2) {
        TestCase3.CaseTimeLessThan2Min = true;
      }
      sendPostData(TestCase3);
      errorController(12);
    }
    if (GetUrlValue('testnum') == 1 || GetUrlValue('testnum') == 2 || GetUrlValue('testnum') == 3) {
    }

    clearTimeout(casePointsTimeDeduction);
    patientState = "Dead";
    HRNum = 0;
    document.getElementById('HRNum').innerHTML = HRNum;
    rhythmChange(initp, "black url('assets/DeadLine.png')");

  }, 600000); //600000  20000
  document.getElementById("TestPlug").style.left = "994px";
  document.getElementById("TestPlug").style.top = "613px";
  document.getElementById("GrayCable").style.left = "959px";
  document.getElementById("GrayCable").style.top = "608px";
  document.getElementById("WhiteCable").style.left = "850px";
  document.getElementById("WhiteCable").style.top = "550px";
  caseSelection(GetUrlValue("testnum"));
    // if (!isTutorialOn) {
    // 	document.getElementById('Continue').innerHTML = "<div class=\"button\" id=\"Continue\"><a href=\"Tutorial.html?testnum="+GetUrlValue("testnum")+"\">Click here to repeat case</a></div>"

  // }
  if (isTestOn) {
    document.getElementById('back').style.display = "none";
  }

  if (!isTestOn) {
    document.getElementById('score').style.display = "none";
    document.getElementById('score_label').style.display = "none";
    document.getElementById('time_ticker_label').style.display = "none";

  }
  if (isTutorialOn) {
    document.getElementById('Close').style.display = "block";
    document.getElementById('PatientWeight').style.display = "none";
    document.getElementById('CaseDescription').style.display = "none";
    document.getElementById('CPRButton').style.display = "none";
    document.getElementById('Assess').style.display = "none";
    isTherapyCableAttached = false;
    document.getElementById('OnOff').className += ' tutorial';
    document.getElementById('Charge').className += ' tutorial';
    document.getElementById('ShockButton').className += ' tutorial';
    document.getElementById('EnergySelectLeft').className += ' tutorial';
    document.getElementById('EnergySelectRight').className += ' tutorial';
    document.getElementById('CurrentLeft').className += ' tutorial';
    document.getElementById('CurrentRight').className += ' tutorial';
    document.getElementById('RateLeft').className += ' tutorial';
    document.getElementById('RateRight').className += ' tutorial';
    document.getElementById('PauseButton').className += ' tutorial';
    document.getElementById('LAEKG').className += ' tutorial';
    document.getElementById('RAEKG').className += ' tutorial';
    document.getElementById('LLEKG').className += ' tutorial';
    document.getElementById('TherapyCable').className += ' tutorial';
    document.getElementById('TestPlug').className += ' tutorial';
    document.getElementById('LeadButton').className += ' tutorial';
    document.getElementById('Pacer').className += ' tutorial';
    document.getElementById('Sync').className += ' tutorial';
    document.getElementById('AnalyzeButton').className += ' tutorial';
    document.getElementById('LeftPad').className += ' tutorial';
    document.getElementById('RightPad').className += ' tutorial';
    document.getElementById('GrayCable').className += ' tutorial';
    document.getElementById('TherapyPort').className += ' tutorial';
    document.getElementById('EKGPort').className += ' tutorial';
    document.getElementById('EKGConnector').className += ' tutorial';
    document.getElementById('SpeedDial').className += ' tutorial';
    document.getElementById('EventButton').className += ' tutorial';
    document.getElementById('CodeSummary').className += ' tutorial';
    document.getElementById('PrintButton').className += ' tutorial';
    document.getElementById('Alarms').className += ' tutorial';
    document.getElementById('Options').className += ' tutorial';
    document.getElementById('SizeButton').className += ' tutorial';
    document.getElementById('HomeScreen').className += ' tutorial';
    document.getElementById('EKGPort').className += ' tutorial';
    document.getElementById('TherapyPort').className += ' tutorial';
    instance.repaintEverything();

    $("#IntroModal").dialog({
      modal: true,
      dialogClass: "helpDialog"
    });
    var tutStatement;
    var tutStatement2;
    var tutTitle;

    $(".tutorial").hover(function() {
      var top = 50;
      var left = 1100;

      if (isChargeDialogOn) {
        isChargeDialogOn = false;
        $("#HelpDialog2").dialog("close");
      }

      switch ($(this).attr('id')) {
        case "OnOff":
          tutStatement = "ON button:  Turns machine power ON or OFF. Turning the machine ON is the first step in performing any function with the Lifepak defibrillator.";
          tutTitle = "On";
          break;
        case "EnergySelectLeft":
          tutStatement = "This control allows the user to select the desired energy dose by pushing the up or down arrows.";
          tutTitle = "Energy Select";
          break;
        case "EnergySelectRight":
          tutStatement = "This control allows the user to select the desired energy dose by pushing the up or down arrows.";
          tutTitle = "Energy Select";
          break;
        case "Charge":
          tutStatement = "Pressing the CHARGE button charges the machine to the selected energy dose. You must press CHARGE first before delivering a shock.";
          tutTitle = "Charge";
          tutStatement2 = "You can interrupt the charging process by pressing the Speed Dial button right here. -->";
          isChargeDialogOn = true;
          break;
        case "ShockButton":
          tutStatement = "The SHOCK button discharges the selected energy dose to the patient.";
          tutTitle = "Shock";
          break;
        case "AnalyzeButton":
          tutStatement = "Pressing ANALYZE activates the machine's AED mode. To exit AED mode, press either the ENERGY SELECT button, or the LEAD button.<br><br> Once you press ANALYZE, the machine will issue audible prompts. In AED mode on the Lifepak, the default energy dose is 200J. <a class=\"youtube\" href=\"https://www.youtube.com/watch?v=3a41lR1W1JI\">More on AED Mode <img class='playicon' style='vertical-align:bottom'  width='30' src='assets/playicon.png'></a> ";
          tutTitle = "Analyze";
          top = 70;
          left = 150;
          break;
        case "Pacer":
          tutStatement = "Pressing the PACER button engages the machine's pacing functions.<i>The Lifepak's own ECG leads must be attached to the patient in order to perform demand pacing.</i>";
          tutTitle = "Pacer";
          break;
        case "Sync":
          tutStatement = "Pressing the SYNC button engages the machine's ability to time the delivery of a shock to the patient's QRS complex. You must press and HOLD the Shock Button.<br> <a class=\"youtube\" href=\"https://www.youtube.com/watch?v=4yQvfTjHlHw\">Synchronized Cardioversion <img class='playicon' style='vertical-align:bottom'  width='30' src='assets/playicon.png'></a>";
          tutTitle = "Sync";
          break;
        case "RateLeft":
          tutStatement = "Once the PACER button is engaged, press the up or down arrows to select the (paced) heart rate you wish the patient to have.";
          tutTitle = "Rate";
          break;
        case "RateRight":
          tutStatement = "Once the PACER button is engaged, press the up or down arrows to select the (paced) heart rate you wish the patient to have.";
          tutTitle = "Rate";
          break;
        case "CurrentLeft":
          tutStatement = "Once the PACER button is engaged and the desired RATE is selected, press the up or down arrows to adjust the pacing current until each vertical pacing spike is followed by a wide QRS complex.";
          tutTitle = "Current";
          break;
        case "CurrentRight":
          tutStatement = "Once the PACER button is engaged and the desired RATE is selected, press the up or down arrows to adjust the pacing current until each vertical pacing spike is followed by a wide QRS complex. ";
          tutTitle = "Current";
          break;
        case "LeadButton":
          tutStatement = "Pressing the LEAD button allows you to select the ECG lead that is reading the patient's heart rhythm for display on the defibrillator monitor. Press the LEAD button repeatedly to highlight and select a particular lead.<br><a class=\"youtube\" href=\"https://www.youtube.com/watch?v=5SHkhFtLwvE\">Defibrillation without monitor display.<img class='playicon' style='vertical-align:bottom' width='30' src='assets/playicon.png'></a></div>";
          tutTitle = "Lead";
          top = 70;
          left = 150;
          break;
        case "PauseButton":
          tutStatement = "Pressing the PAUSE button allows you to check the patient's underlying rhythm. When the PAUSE button is held, the Lifepak paces at 25% of the set rate.<br><br>  In demand pacing mode, when the patient's underlying rate is greater than 25% of the paced rate, there will be no demand for pacing and you will not see any vertical pacing spikes. ";
          tutTitle = "Pause";
          break;
        case "SpeedDial":
          tutStatement = "The Speed Dial can be used to scroll through and select desired energy doses, pacer rate, pacer current settings, or cardiac leads. In clinical practice you turn the dial to scroll, and push to select. On this simulator, you will not be able to \"scroll\" using the Speed Dial, but you can \"push\" it by clicking on it with your mouse or touchpad. Pushing the Speed Dial button during the defibrillator's charging process will interrupt the charge and disarm the machine. ";
          tutTitle = "Speed Dial";
          break;
        case "LeftPad":
          tutStatement = "Multifunction electrodes that allow the defibrillator to deliver an electrical stimulus to the patient. Attaching the Quik-Combo pads is a multistep process. <a style='color:blue; cursor: pointer; text-decoration:underline' onclick='showMeHow2()'>Show Me How</a>";
          tutTitle = "Quik-Combo Pad";
          break;
        case "RightPad":
          tutStatement = "Multifunction electrodes that allow the defibrillator to deliver an electrical stimulus to the patient. Attaching the Quik-Combo pads is a multistep process <a style='color:blue; cursor: pointer; text-decoration:underline' onclick='showMeHow2()'>Show Me How</a>";
          tutTitle = "Quik-Combo Pad";
          break;
        case "TestPlug":
          tutStatement = "When the defibrillator is not in use, the test plug is typically attached to the therapy cable, and must be removed in order to connect Quick-Combo pads to the therapy cable. Use your mouse to drag the test plug away from the therapy cable.";
          tutTitle = "Test Plug";
          break;
        case "LLEKG":
        case "LAEKG":
        case "RAEKG":
          tutStatement = "To attach the the Lifepak's ECG leads, drag and drop each individual lead to the designated location marker on the body. <a style='color:blue; cursor: pointer; text-decoration:underline' onclick='showMeHow()'>Show me how</a>";
          tutTitle = "Lifepak ECG Lead";
          break;
        case "GrayCable":
        case "TherapyCable":
          tutStatement = "The therapy cable must be connected to its attachment port in order for the pads to work. You can use your mouse to attach the therapy cable to the Quik-Combo pads once you drag off the black test plug.";
          tutTitle = "Therapy Cable";
          break;
        case "EKGConnector":
          tutStatement = "Lifepak's own ECG leads connect to the defibrillator when the ECG cable is plugged in to the ECG cable port. Use your mouse to drag and drop the end of the cable onto the ECG port.";
          tutTitle = "ECG Cable";
          break;
        case "EKGPort":
          tutStatement = "To connect the Lifepak's own ECG leads, drag the ECG cable to the green ECG Cable Port and drag the individual leads to the patient.";
          tutTitle = "ECG Port";
          break;
        case "TherapyPort":
          tutStatement = " Site of attachment for EITHER the therapy cable or the machine's hard paddles.";
          tutTitle = "Therapy Cable Attachment Port";
          break;
        case "PrintButton":
          tutTitle = "Print Button";
          tutStatement = "This feature is not essential for defibrillator operation and will not be covered in this module";
          break;
        case "EventButton":
          tutTitle = "Event Button";
          tutStatement = "This feature is not essential for defibrillator operation and will not be covered in this module";
          break;
        case "CodeSummary":
          tutTitle = "Code Summary";
          tutStatement = "This feature is not essential for defibrillator operation and will not be covered in this module";
          break;
        case "SizeButton":
          tutTitle = "Size Button";
          tutStatement = "This feature is not essential for defibrillator operation and will not be covered in this module";
          break;
        case "Alarms":
          tutTitle = "Alarms";
          tutStatement = "This feature is not essential for defibrillator operation and will not be covered in this module";
          break;
        case "Options":
          tutTitle = "Options";
          tutStatement = "This feature is not essential for defibrillator operation and will not be covered in this module";
          break;
        case "HomeScreen":
          tutTitle = "Home Screen";
          tutStatement = "This feature is not essential for defibrillator operation and will not be covered in this module";
          break;
        case "Help":
          tutTitle = "Help";
          tutStatement = "Clicking the HELP button will tell you what to do next during the Tutorial Cases. HELP will not be available during the Test Cases.";
          break;
      }

      document.getElementById("TutorialDialog").innerHTML = tutStatement;
      $('#TutorialDialog').dialog({
        dialogClass: "helpDialog",
        autoOpen: true,
        position: [left, top],
        title: tutTitle
      });

      if (tutStatement2 != undefined) {
        document.getElementById("HelpDialog2").innerHTML = tutStatement2;
        $('#HelpDialog2').dialog({
          dialogClass: "helpDialog",
          autoOpen: true,
          position: ['top', 20],
          position: ['left', 500],
          title: tutTitle
        });
        tutStatement2 = undefined;
      }
      $("a.youtube").YouTubePopup();
    });
  }
  $("#ShockButton").mousedown(function() {
      if (isTestPlugAttached || !isElectrodesConnected) {
        return;
      }
      if (patientState == "Sync" && chargeJoules <= 20 && !isTestOn && isShockReady) {
        document.shockTimeout = setTimeout(function() {
          rhythmChange(initp, "black url('assets/NormalRate.png')");
          clearTimeout(casePointsTimeDeduction);
          clearTimeout(MinDeathTimeout);
          isSyncOn = false;
          clearInterval(document.syncInterval);
          document.getElementById("SyncLight").style.display = "none";
          HRNum = 120;
          patientState = "NormalVTac";
          helpController(213);
          document.getElementById('PatientInfo').innerHTML = "Saved!";
          clearTimeout(MinDeathTimeout);
          clearInterval(document.syncInterval);
          document.getElementById("SyncLight").style.display = "none";
          document.getElementById('EnergyDelivered').style.display = "block";
          document.getElementById('shockprompt').pause();
          setTimeout(function() {
            document.getElementById('EnergyDelivered').style.display = "none";
          }, 5000);
        }, 1000);
      } else if ((patientState == "VTac" || patientState == "Sync") && isTestOn && chargeJoules > 84 && isShockReady) {
        TestCase2.DeathStateReached = true;
        TestCase2.ShockWithEnergyGreaterThan84 = true;
        patientState = "Dead";
        if (!isSyncOn) {
          TestCase2.ShockWithoutSync = true;
        }
        TestCase2.SurvivalStateReached = false;
        TestCase2.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
        TestCase2.TotalPoints -= 100;
        clearTimeout(casePointsTimeDeduction);
        clearTimeout(MinDeathTimeout);

        if (TestCase2.TotalCaseTime > 60 * 4) {
          TestCase2.CaseTimeMoreThanFourMin = true;
        }
        if (TestCase2.TotalCaseTime < 60 * 2) {
          TestCase2.CaseTimeLessThan2Min = true;
        }
        HRNum = 0;
        document.getElementById('HRNum').innerHTML = HRNum;

        rhythmChange(initp, "black url('assets/DeadLine.png')");

        document.getElementById("SyncLight").style.display = "none";
        document.getElementById('EnergyDelivered').style.display = "block";
        document.getElementById("ShockLight").style.display = "none";
        clearInterval(document.interval);
        document.getElementById('ShockMenu').style.display = "none";
        document.getElementById('shockprompt').pause();
        isShockReady = false;

        setTimeout(function() {
          document.getElementById('EnergyDelivered').style.display = "none";
        }, 5000);

        sendPostData(TestCase2);
        setTimeout(function() {
          errorController(11);
        }, 1000);
      } else if (patientState == "VTac" && isTestOn && !isSyncOn && isShockReady) {
        othershockbool = false;
        TestCase2.ShockWithoutSync = true;
        TestCase2.VFibStateEntered = true;
        TestCase2.VFibStartTime = Math.round((new Date() / 1000) - startTime);
        TestCase2.TotalPoints -= 20;
        patientState = "VFib";

        document.getElementById('PatientInfo').innerHTML = "The patient is pulseless and not breathing!";
        rhythmChange(initp, "black url('assets/vfib.png')");
        document.getElementById('HRNum').innerHTML = "170";
        document.getElementById('EnergyDelivered').style.display = "block";
        clearInterval(document.syncInterval);
        document.getElementById("SyncLight").style.display = "none";
        document.getElementById('shockprompt').pause();
        isShockReady = false;
        setTimeout(function() {
          othershockbool = true;
        }, 1000);
        setTimeout(function() {
          document.getElementById('EnergyDelivered').style.display = "none";

        }, 5000);

        document.getElementById("ShockLight").style.display = "none";
        clearInterval(document.interval);
        document.getElementById('ShockMenu').style.display = "none";
        CPRDeathTime = setTimeout(function() {
          TestCase2.SurvivalStateReached = false;
          TestCase2.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
          TestCase2.DeathStateReached = true;
          TestCase2.TotalPoints -= 100;

          if (TestCase2.TotalCaseTime > 60 * 4) {
            TestCase2.CaseTimeMoreThanFourMin = true;
          }
          if (TestCase2.TotalCaseTime < 60 * 2) {
            TestCase2.CaseTimeLessThan2Min = true;
          }
          HRNum = 0;
          document.getElementById('HRNum').innerHTML = HRNum;
          clearTimeout(casePointsTimeDeduction);
          patientState = "Dead";
          rhythmChange(initp, "black url('assets/DeadLine.png')");
          sendPostData(TestCase2);
          setTimeout(function() {
            errorController(11);
          }, 1000);
        }, 45000);

      } else if (patientState == "Sync" && isTestOn && isSyncOn && chargeJoules < 85 && chargeJoules > 4 && isShockReady) {
        document.shockTimeout = setTimeout(function() {
          TestCase2.TotalPoints += 20;
          rhythmChange(initp, "black url('assets/NormalRate.png')");
          clearTimeout(MinDeathTimeout);
          SyncwinTimeout = setTimeout(function() {
            if (GetUrlValue('testnum') == 5) {

              TestCase2.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
              TestCase2.SurvivalStateReached = true;
              clearTimeout(MinDeathTimeout);
              $('#obj').val(JSON.stringify(TestCase2));

            }

            if (TestCase2.TotalCaseTime > 60 * 4) {
              TestCase2.CaseTimeMoreThanFourMin = true;
            }
            if (TestCase2.TotalCaseTime < 60 * 2) {
              TestCase2.CaseTimeLessThan2Min = true;
            }
            if (GetUrlValue('testnum') == 5) {
              sendPostData(TestCase2);
            }
            if (!isTestOn) {
              document.getElementById("EndDialog").innerHTML = "The patient is breathing spontaneously, has a strong pulse, and is back in a normal heart rhythm.  You successfully cardioverted the patient. <a href='testintro.html?sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "'>Click here to move on to the Test Cases</a>.";
              $('#EndDialog').dialog({
                "width": 400,
                dialogClass: "statusDialog",
                modal: true,
                autoOpen: true
              });
            } else {
              document.getElementById("EndDialog").innerHTML = "Good job!  The baby is awake and breathing spontaneously. The pulse is strong. BP 82/40. <a href='Tutorial.html?testnum=6&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "'>Click here to move on to the last Test Case</a>.";
              $('#EndDialog').dialog({
                "width": 400,
                dialogClass: "statusDialog",
                modal: true,
                autoOpen: true
              });
            }
          }, 30000);
          isSyncOn = false;
          clearInterval(document.syncInterval);
          document.getElementById("SyncLight").style.display = "none";
          HRNum = 89;
          patientState = "NormalVTac";
          helpController(213);
          document.getElementById('HRNum').innerHTML = HRNum;
          clearTimeout(MinDeathTimeout);
          document.getElementById('PatientInfo').innerHTML = "Saved!";
          clearInterval(document.syncInterval);
          document.getElementById("SyncLight").style.display = "none";
          document.getElementById('EnergyDelivered').style.display = "block";
          document.getElementById('shockprompt').pause();
          clearTimeout(casePointsTimeDeduction);
          setTimeout(function() {
            document.getElementById('EnergyDelivered').style.display = "none";
          }, 5000);
        }, 1000);
      } else if (patientState == "Sync" && isTestOn && isSyncOn && chargeJoules <= 4 && isShockReady) {
        document.shockTimeout = setTimeout(function() {
          rhythmChange(initp, "black url('assets/SVT.png')");
          isSyncOn = false;
          document.getElementById("SyncLight").style.display = "none";
          clearInterval(document.syncInterval);
          document.getElementById("SyncLight").style.display = "none";
          document.getElementById('EnergyDelivered').style.display = "block";
          document.getElementById('shockprompt').pause();
          document.getElementById("ShockLight").style.display = "none";
          clearInterval(document.interval);
          document.getElementById('ShockMenu').style.display = "none";
          isShockReady = false;
          patientState = "VTac";
          setTimeout(function() {
            document.getElementById('EnergyDelivered').style.display = "none";
          }, 5000);
        }, 1000);
      } else if (patientState == "VTac" && !isTestOn) {
        errorController(7);
      } else if (patientState == "Sync" && chargeJoules > 20 && !isTestOn) {
        errorController(9);
      }
    }
  );
  $("#ShockButton").mouseup(function() {
    clearTimeout(document.shockTimeout);
  });
  $("Assess").button();

  $('#StartInfo').dialog({
    autoOpen: false,
    dialogClass: "statusDialog",
    closeText: "close"
  });
  $('#PatientStatus').dialog({
    title: "Status",
    dialogClass: "statusDialog",
    autoOpen: false,
    closeText: "close"
  });

  $('#CaseDescription').click(function(e) {
    $('#StartInfo').dialog('open');

  });
  var firstassess = true;
  $("#Assess").click(function(e) {
    e.preventDefault();
    dataLogString += "AssessButton ";
    if (patientState == "GoodWithPace" && !isTestOn) {
      $('#PatientInfo').html("The patient is awake and breathing, with a pulse of 100 (equal to the pacing rate) and BP 92/60.Congratulations!  You saved the patient. <a href='Tutorial.html?testnum=3&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.");
      $('#PatientStatus').dialog({
        title: "Congratulations!",
        autoOpen: true,
        modal: true
      });
    }
    if (patientState == "GoodWithPace" && isTestOn) {
      if (GetUrlValue('testnum') == 6) {
        TestCase3.SurvivalStateReached = true;
        clearTimeout(MinDeathTimeout);
        TestCase3.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
        if (TestCase3.TotalCaseTime > 60 * 4) {
          TestCase3.CaseTimeMoreThanFourMin = true;
        }
        if (TestCase3.TotalCaseTime < 60 * 2) {
          TestCase3.CaseTimeLessThan2Min = true;
        }
        TestCase3.ClickedAssessAfterPatient = true;
        sendPostData(TestCase3);
      }
      $('#PatientInfo').html(" Good job! The patient is awake and breathing, with a pulse of 100 (or equal to the pacing rate) and BP 92/60. Congratulations. You have now completed all the test cases on this simulator. Please close your browser window to end your session.");
      $('#PatientStatus').dialog({
        title: "Congratulations!",
        autoOpen: true,
        modal: true
      });
    } else if (patientState == "NormalVTac") {
      if (GetUrlValue('testnum') == 5) {
        TestCase2.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
        TestCase2.SurvivalStateReached = true;
        clearTimeout(MinDeathTimeout);
        clearTimeout(SyncwinTimeout);
        $('#obj').val(JSON.stringify(TestCase2));
      }
      if (TestCase2.TotalCaseTime > 60 * 4) {
        TestCase2.CaseTimeMoreThanFourMin = true;
      }
      if (TestCase2.TotalCaseTime < 60 * 2) {
        TestCase2.CaseTimeLessThan2Min = true;
      }
      if (GetUrlValue('testnum') == 5) {
        sendPostData(TestCase2);
      }
      if (!isTestOn) {
        document.getElementById("EndDialog").innerHTML = "The patient is breathing spontaneously, has a strong pulse, and is back in a normal heart rhythm.  You successfully cardioverted the patient. <a href='testintro.html'>Click here to move on to the Test Cases</a>.";
        $('#EndDialog').dialog({
          "width": 400,
          dialogClass: "statusDialog",
          modal: true,
          autoOpen: true
        });
      } else {
        document.getElementById("EndDialog").innerHTML = "Good job!  The baby is awake and breathing spontaneously. The pulse is strong. BP 82/40. <a href='Tutorial.html?testnum=6&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "'>Click here to move on to the last Test Case</a>.";
        $('#EndDialog').dialog({
          "width": 400,
          dialogClass: "statusDialog",
          modal: true,
          autoOpen: true
        });
      }
    } else {
      $('#PatientStatus').dialog('open');
      if (patientState == "SlowRhythm" && firstassess === true) {
        helpController(101);
        firstassess = false;
      }
      if (patientState == "VTac" && firstassess === true) {
        TestCase2.TotalPoints += 15;
        helpController(201);
        firstassess = false;
      }
      if (patientState == "VFib" && firstassess === true) {
        TestCase1.TotalPoints += 5;
        helpController(2);
        firstassess = false;
      }
    }
  });
  if (!isTestOn) {
    $("#Help").button();
    $('#HelpDialog').dialog({
      position: [1100, 450],
      autoOpen: false,
      dialogClass: "helpDialog"
    });
  }
  $('#HelpDialog').dialog({
    position: [1500, 650],
    autoOpen: false
  });
  $('#EndDialog').dialog({
    dialogClass: "statusDialog",
    autoOpen: false
  });
  $("#HelpDialog2").dialog({
    autoOpen: false,
    dialogClass: "helpDialog"
  });
  $("#Help").click(function(e) {
    if (!isTestOn) {
      e.preventDefault();
      if (!isTutorialOn)
        $('#HelpDialog').dialog('open');
    }
  });
  $("#OnOff").mouseup(function() {
    document.getElementById('OnOff').src = "assets/LifePakOnOn.png";
  });
  $("#Charge").mousedown(function() {
    document.getElementById('Charge').src = "assets/Charge_active.png";
  });
  $("#Charge").mouseup(function() {
    document.getElementById('Charge').src = "assets/Charge.png";
  });
  $("#AnalyzeButton").mousedown(function() {
    document.getElementById('AnalyzeButton').src = "assets/Analyze_active.png";
  });
  $("#AnalyzeButton").mouseup(function() {
    document.getElementById('AnalyzeButton').src = "assets/Analyze.png";
  });
  $("#Sync").mousedown(function() {
    document.getElementById('Sync').src = "assets/Sync_active.png";
  });
  $("#Sync").mouseup(function() {
    document.getElementById('Sync').src = "assets/Sync.png";
  });
  $("#Pacer").mousedown(function() {
    document.getElementById('Pacer').src = "assets/Pacer_active.png";
  });
  $("#Pacer").mouseup(function() {
    document.getElementById('Pacer').src = "assets/Pacer.png";
  });
  $("#LeadButton").mousedown(function() {
    document.getElementById('LeadButton').src = "assets/Lead_active.png";
  });
  $("#LeadButton").mouseup(function() {
    document.getElementById('LeadButton').src = "assets/Lead.png";
  });

  $("#PauseButton").mousedown(function() {
    document.getElementById('PauseButton').src = "assets/PauseButton_active.png";
  });
  $("#PauseButton").mouseup(function() {
    document.getElementById('PauseButton').src = "assets/PauseButton.png";
  });
  $("#ShockButton").mousedown(function() {
    document.getElementById('ShockButton').src = "assets/Shock_active.png";
  });
  $("#ShockButton").mouseup(function() {
    document.getElementById('ShockButton').src = "assets/Shock.png";
  });
  $("#EnergySelectLeft").mousedown(function() {
    document.getElementById('EnergySelectLeft').src = "assets/EnergySelectLeft_active.png";
  });
  $("#EnergySelectLeft").mouseup(function() {
    document.getElementById('EnergySelectLeft').src = "assets/EnergySelectLeft.png";
  });
  $("#EnergySelectRight").mousedown(function() {
    document.getElementById('EnergySelectRight').src = "assets/EnergySelectRight_active.png";
  });
  $("#EnergySelectRight").mouseup(function() {
    document.getElementById('EnergySelectRight').src = "assets/EnergySelectRight.png";
  });
  $("#RateLeft").mousedown(function() {
    document.getElementById('RateLeft').src = "assets/RateLeft_active.png";
  });
  $("#RateLeft").mouseup(function() {
    document.getElementById('RateLeft').src = "assets/RateLeft.png";
  });
  $("#RateRight").mousedown(function() {
    document.getElementById('RateRight').src = "assets/RateRight_active.png";
  });
  $("#RateRight").mouseup(function() {
    document.getElementById('RateRight').src = "assets/RateRight.png";
  });
  $("#CurrentLeft").mousedown(function() {
    document.getElementById('CurrentLeft').src = "assets/CurrentLeft_active.png";
  });
  $("#CurrentLeft").mouseup(function() {
    document.getElementById('CurrentLeft').src = "assets/CurrentLeft.png";
  });
  $("#CurrentRight").mousedown(function() {
    document.getElementById('CurrentRight').src = "assets/CurrentRight_active.png";
  });
  $("#CurrentRight").mouseup(function() {
    document.getElementById('CurrentRight').src = "assets/CurrentRight.png";
  });
  $("#LeftPad").draggable({
    snap: "#LeftTarget",
    snapMode: "inner",
    stop: function(event, ui) {
      var lpx = parseInt(document.getElementById("LeftPad").style.left);
      var lpy = parseInt(document.getElementById("LeftPad").style.top);
      var ltargx = parseInt(document.getElementById("LeftTarget").style.left);
      var ltargy = parseInt(document.getElementById("LeftTarget").style.top);

      if (Math.abs(lpx - ltargx) < 20 && (Math.abs(lpy - ltargy)) < 20) {
        isLeftPadConnected = true;
        dataLogString += "LeftPadConnected ";
        ecgController();
      } else {
        if (on && isTherapyCableAttached && !isTestPlugAttached) {
          document.getElementById("ConnectElectrodes").style.display = "block";
          document.getElementById("connectelectrodes").play();
          document.getElementById("BottomBar").style.display = "block";
          document.getElementById('BBText').innerHTML = ("Paddles leads off");
        }
        isLeftPadConnected = false;
        ecgController();
      }
    }
  });

  $("#RightPad").draggable({
    snap: "#RightTarget",
    snapMode: "inner",
    stop: function(event, ui) {
      var rpx = parseInt(document.getElementById("RightPad").style.left);
      var rpy = parseInt(document.getElementById("RightPad").style.top);

      var rtargx = parseInt(document.getElementById("RightTarget").style.left);
      var rtargy = parseInt(document.getElementById("RightTarget").style.top);

      if (Math.abs(rpx - rtargx) < 20 && (Math.abs(rpy - rtargy)) < 20) {
        isRightPadConnected = true;
        dataLogString += "RightPadConnected ";
        ecgController();
      } else {
        isRightPadConnected = false;
        if (on && isTherapyCableAttached && !isTestPlugAttached) {
          document.getElementById("ConnectElectrodes").style.display = "block";
          document.getElementById("connectelectrodes").play();
          document.getElementById("BottomBar").style.display = "block";
          document.getElementById('BBText').innerHTML = ("Paddles leads off");
        }
        ecgController();
      }
    }
  });
  $('#PauseButton').mousedown(function() {
    dataLogString += "PauseButton ";
    if (ispacerFuncOn) {
      helpController(114);
      b = document.bcapsule;
      c = document.ccapsule;
      document.bcapsule = "black url('assets/PauseRhythm.png')";
      document.ccapsule = "black url('assets/PauseRhythm.png')";

      document.getElementById("BottomPaceBar").style.display = "block";
      document.getElementById("BottomPaused").style.display = "block";
      document.getElementById('PacerMenu').style.display = "none";
    }
  }).bind('mouseup', function() {
    if (ispacerFuncOn) {
      document.bcapsule = b;
      document.ccapsule = c;
      document.getElementById("BottomPaused").style.display = "none";
      document.getElementById('PacerMenu').style.display = "block";
      document.getElementById("BottomPaceBar").style.display = "none";
    }
  });
  $("#EKGConnector").draggable({
    stop: function(event, ui) {
      var ecx = parseInt(document.getElementById('EKGConnector').style.left);
      var ecy = parseInt(document.getElementById('EKGConnector').style.top);

      if (ecx + 60 < 30 && Math.abs(parseInt(ecy) - 580) < 30) {
        isECGStumpAttached = true;
        threeEKGController();
      } else {
        isECGStumpAttached = false;
        threeEKGController();
        errorController(6);
      }
    }
  });
  $("#TherapyCable").draggable({
    stop: function(event, ui) {
      var tcx = parseInt(document.getElementById('TherapyCable').style.left);
      var tcy = parseInt(document.getElementById('TherapyCable').style.top);
      if (Math.abs(tcx) - 553 < 30 && Math.abs(parseInt(tcy) - 565) < 30) {
        isTherapyCableAttached = true;

        if (isTestPlugAttached && on) {
          document.getElementById("RemoveTestPlug").style.display = "block";
          document.getElementById("removetestplug").play();
        } else if (!isElectrodesConnected && !isLeftPadConnected && !isRightPadConnected && on) {
          document.getElementById("ConnectElectrodes").style.display = "block";
          document.getElementById("connectelectrodes").play();
          document.getElementById("BottomBar").style.display = "block";
          document.getElementById('BBText').innerHTML = ("Paddles leads off");
        }
        ecgController();
      } else {
        isTherapyCableAttached = false;
        document.getElementById('RemoveTestPlug').style.display = "none";
        document.getElementById('ConnectElectrodes').style.display = "none";
        document.getElementById("BottomBar").style.display = "none";
        ecgController();
        errorController(5);
      }
    }
  });
  $("#TestPlug").draggable({
    stop: function(event, ui) {
      var tpy = parseInt(document.getElementById("TestPlug").style.top);
      var tpx = parseInt(document.getElementById("TestPlug").style.left);
      var lpx = parseInt(document.getElementById("GrayCable").style.left);
      var lpy = parseInt(document.getElementById("GrayCable").style.top);

      if (Math.abs(lpx - tpx) < 15 && (Math.abs(lpy - tpy)) < 15) {
        isTestPlugAttached = true;
      } else {
        isTestPlugAttached = false;
        if (on) {
          helpController(32);
          document.getElementById("RemoveTestPlug").style.display = "none";

          if (!isElectrodesConnected) {
            document.getElementById("ConnectElectrodes").style.display = "block";
            document.getElementById("connectelectrodes").play();
            document.getElementById("BottomBar").style.display = "block";
            document.getElementById('BBText').innerHTML = ("Paddles leads off");
          }
        }
      }
    }
  });

  $("#LLEKG").draggable({
    snap: "#LLEKGTarget",
    snapMode: "outer",
    snapTolerance: 10,
    stop: function(event, ui) {
      var lpx = parseInt(document.getElementById("LLEKG").style.left);
      var lpy = parseInt(document.getElementById("LLEKG").style.top);

      var lpxt = parseInt(document.getElementById("LLEKGTarget").style.left);
      var lpyt = parseInt(document.getElementById("LLEKGTarget").style.top);

      if (Math.abs(lpx - lpxt) < 40 && (Math.abs(lpy - lpyt)) < 40) {
        dataLogString += "LLEKGConnected ";
        isLLEKGConnected = true;
        threeEKGController();
      } else {
        isLLEKGConnected = false;
        threeEKGController();
      }
    }
  });
  $("#LAEKG").draggable({
    snap: "#LAEKGTarget",
    snapMode: "outer",
    snapTolerance: 10,
    stop: function(event, ui) {
      var lpx = parseInt(document.getElementById("LAEKG").style.left);
      var lpy = parseInt(document.getElementById("LAEKG").style.top);

      var lpxt = parseInt(document.getElementById("LAEKGTarget").style.left);
      var lpyt = parseInt(document.getElementById("LAEKGTarget").style.top);
      if (Math.abs(lpx - lpxt) < 40 && (Math.abs(lpy - lpyt)) < 40) {
        isLAEKGConnected = true;
        dataLogString += "LAEKGConnected ";
        threeEKGController();
      } else {
        isLAEKGConnected = false;
        threeEKGController();
      }
    }
  });
  $("#RAEKG").draggable({
    snap: "#RAEKGTarget",
    snapMode: "outer",
    snapTolerance: 10,
    stop: function(event, ui) {
      var lpx = parseInt(document.getElementById("RAEKG").style.left);
      var lpy = parseInt(document.getElementById("RAEKG").style.top);

      var lpxt = parseInt(document.getElementById("RAEKGTarget").style.left);
      var lpyt = parseInt(document.getElementById("RAEKGTarget").style.top);

      if (Math.abs(lpx - lpxt) < 40 && (Math.abs(lpy - lpyt)) < 40) {
        isRAEKGConnected = true;
        dataLogString += "RAEKGConnected ";
        threeEKGController();
      } else {
        isRAEKGConnected = false;
        threeEKGController();
      }
    }
  });
});
jsPlumb.ready(function() {
  instance = jsPlumb.getInstance({
    DragOptions: {
      cursor: 'pointer',
      zIndex: 2000
    },
    PaintStyle: {
      strokeStyle: '#666'
    },
    EndpointStyle: {
      width: 20,
      height: 16,
      strokeStyle: '#666'
    },
    Endpoint: "Rectangle",
    Anchors: ["TopCenter", "TopCenter"]
  });
  instance.doWhileSuspended(function() {
    var exampleEndpoint = {
      endpoint: "Blank",
      maxConnections: -1,
      connectorStyle: {
        strokeStyle: "black",
        lineWidth: 2
      }
    };
    var e1 = instance.addEndpoint('RightPad', {
      anchor: "Bottom"
    }, exampleEndpoint);
    var e2 = instance.addEndpoint('TherapyCable', {
      anchor: [1, 0.61, 0, -1]
    }, exampleEndpoint);
    var e3 = instance.addEndpoint('LeftPad', {
      anchor: "Bottom"
    }, exampleEndpoint);
    var e4 = instance.addEndpoint('GrayCable', {
      anchor: "Left"
    }, exampleEndpoint);
    var e41 = instance.addEndpoint('GrayCable', {
      anchor: "Right"
    }, exampleEndpoint);
    var e5 = instance.addEndpoint('WhiteCable', {
      anchor: "Right"
    }, exampleEndpoint);

    var e6 = instance.addEndpoint('LLEKG', {
      anchor: "Bottom"
    }, exampleEndpoint);
    var e7 = instance.addEndpoint('LAEKG', {
      anchor: "Bottom"
    }, exampleEndpoint);
    var e8 = instance.addEndpoint('RAEKG', {
      anchor: "Bottom"
    }, exampleEndpoint);
    var e9 = instance.addEndpoint('FloatingEKG', {
      anchor: "Left"
    }, exampleEndpoint);
    var conn1 = instance.connect({
      source: e1,
      target: e5
    });
    var conn2 = instance.connect({
      source: e3,
      target: e5
    });
    instance.connect({
      source: e2,
      target: e4
    });
    instance.draggable("LeftPad");
    instance.draggable("RightPad");
    instance.draggable("TherapyCable");

    instance.draggable("GrayCable", {
      snap: ".GraySnap",
      snapMode: "outer",
      snapTolerance: 10,
      stop: function(event, ui) {
        if (isElectrodesConnected) {
          document.getElementById('WhiteCable').style.left = document.getElementById('GrayCable').style.left;
          document.getElementById('WhiteCable').style.top = document.getElementById('GrayCable').style.top;
        }
        var lpx = parseInt(document.getElementById("GrayCable").style.left);
        var lpy = parseInt(document.getElementById("GrayCable").style.top);

        var wpx = parseInt(document.getElementById("WhiteCable").style.left);
        var wpy = parseInt(document.getElementById("WhiteCable").style.top);

        var tpy = parseInt(document.getElementById("TestPlug").style.top);
        var tpx = parseInt(document.getElementById("TestPlug").style.left);
        if (Math.abs(lpx - tpx) < 15 && (Math.abs(lpy - tpy)) < 15) {
          isTestPlugAttached = true;
        } else {
          isTestPlugAttached = false
          if (isElectrodesConnected == false) {
            helpController(32);
          }
          document.getElementById("RemoveTestPlug").style.display = "none";
          if ((Math.abs(lpx - wpx) < 50 && (Math.abs(lpy - wpy)) < 30) && isLeftPadConnected && isRightPadConnected && !isTestPlugAttached) {
            document.getElementById('GrayCable').style.background = "url('assets/ConnectedCables.png')";
            jsPlumb.detach(conn1);
            jsPlumb.detach(conn2);
            instance.connect({
              source: e1,
              target: e41
            });
            instance.connect({
              source: e3,
              target: e41
            });
            document.getElementById('GrayCable').style.width = "70px";
            document.getElementById('WhiteCable').style.display = "none";

            isElectrodesConnected = true;
            ecgController();
            document.getElementById("ConnectElectrodes").style.display = "none";
            document.getElementById("BottomBar").style.display = "none";

          } else if ((Math.abs(lpx - wpx) < 50 && (Math.abs(lpy - wpy)) < 30) && !isTestPlugAttached) {
            document.getElementById('GrayCable').style.background = "url('assets/ConnectedCables.png')";
            jsPlumb.detach(conn1);
            jsPlumb.detach(conn2);
            instance.connect({
              source: e1,
              target: e41
            });
            instance.connect({
              source: e3,
              target: e41
            });
            document.getElementById('GrayCable').style.width = "70px";
            document.getElementById('WhiteCable').style.display = "none";
            isElectrodesConnected = true;
            if (on) {
              document.getElementById("ConnectElectrodes").style.display = "block";
              document.getElementById("connectelectrodes").play();
              document.getElementById("BottomBar").style.display = "block";
              document.getElementById('BBText').innerHTML = ("Paddles leads off");
            }
          } else {
            isElectrodesConnected = false;
            ecgController();
            if (on && isTherapyCableAttached) {
              document.getElementById("ConnectElectrodes").style.display = "block";
              document.getElementById("connectelectrodes").play();
              document.getElementById("BottomBar").style.display = "block";
              document.getElementById('BBText').innerHTML = ("Paddles leads off");
            }
          }
        }
      }
    });
    instance.draggable("WhiteCable", {
      stop: function(event, ui) {
        var lpx = parseInt(document.getElementById("GrayCable").style.left);
        var lpy = parseInt(document.getElementById("GrayCable").style.top);

        var wpx = parseInt(document.getElementById("WhiteCable").style.left);
        var wpy = parseInt(document.getElementById("WhiteCable").style.top);
        if ((Math.abs(lpx - wpx) < 50 && (Math.abs(lpy - wpy)) < 30) && isLeftPadConnected && isRightPadConnected && !isTestPlugAttached) {
          document.getElementById('GrayCable').style.background = "url('assets/ConnectedCables.png')";
          jsPlumb.detach(conn1);
          jsPlumb.detach(conn2);
          instance.connect({
            source: e1,
            target: e41
          });
          instance.connect({
            source: e3,
            target: e41
          });
          document.getElementById('GrayCable').style.width = "70px";
          document.getElementById('WhiteCable').style.display = "none";

          isElectrodesConnected = true;
          document.getElementById("ConnectElectrodes").style.display = "none";
          document.getElementById("BottomBar").style.display = "none";
          ecgController();
        } else if ((Math.abs(lpx - wpx) < 50 && (Math.abs(lpy - wpy)) < 30) && !isTestPlugAttached) {
          isElectrodesConnected = true;
          document.getElementById('GrayCable').style.background = "url('assets/ConnectedCables.png')";
          jsPlumb.detach(conn1);
          jsPlumb.detach(conn2);
          instance.connect({
            source: e1,
            target: e41
          });
          instance.connect({
            source: e3,
            target: e41
          });
          document.getElementById('GrayCable').style.width = "70px";
          document.getElementById('WhiteCable').style.display = "none";
        } else {
          isElectrodesConnected = false;
          ecgController();
          helpController(204);
          if (on && isTherapyCableAttached) {
            document.getElementById("ConnectElectrodes").style.display = "block";
            document.getElementById("connectelectrodes").play();
            document.getElementById("BottomBar").style.display = "block";
            document.getElementById('BBText').innerHTML = ("Paddles leads off");
          }
        }
      }
    });
    instance.draggable("TestPlug");
    instance.draggable("LLEKG");
    instance.draggable("LAEKG");
    instance.draggable("RAEKG");
    instance.draggable("EKGConnector");
  });
});

function caseSelection(caseNum) {
  if (caseNum == 0) {
    document.getElementById("RightTarget").style.left = '949px';
    document.getElementById("RightTarget").style.top = '389px';

    document.getElementById("LeftTarget").style.left = '843px';
    document.getElementById("LeftTarget").style.top = '379px';

    document.getElementById("LLEKGTarget").style.left = '955px';
    document.getElementById("LLEKGTarget").style.top = '446px';

    document.getElementById("LAEKGTarget").style.left = '952px';
    document.getElementById("LAEKGTarget").style.top = '334px';

    document.getElementById("RAEKGTarget").style.left = '855px';
    document.getElementById("RAEKGTarget").style.top = '362px';

    document.getElementById('AdultDummy').src = "assets/adult-teen.png";
    document.getElementById('AdultDummy').style.top = "200px";

    patientState = "MouseOver";
    isTutorialOn = true;
    $('#PatientInfo').html("He is not breathing. You cannot feel a central pulse. Using your mouse, press \"Start CPR\" ");
    document.getElementById('PatientWeight').innerHTML = "Weight: 60 kg";
    helpController(0);
  }

  if (caseNum == 1) {
    document.getElementById("RightTarget").style.left = '949px';
    document.getElementById("RightTarget").style.top = '395px';

    document.getElementById("LeftTarget").style.left = '843px';
    document.getElementById("LeftTarget").style.top = '390px';

    document.getElementById("LLEKGTarget").style.left = '960px';
    document.getElementById("LLEKGTarget").style.top = '456px';

    document.getElementById("LAEKGTarget").style.left = '954px';
    document.getElementById("LAEKGTarget").style.top = '339px';

    document.getElementById("RAEKGTarget").style.left = '855px';
    document.getElementById("RAEKGTarget").style.top = '373px';

    document.getElementById('AdultDummy').src = "assets/olderman.png";
    document.getElementById('AdultDummy').style.top = "200px";

    document.getElementById('Continue').innerHTML = "<a href=\"Tutorial.html?testnum=1&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "\">Click Here to Restart This Case</a>";
    document.getElementById('IntroModal').style.display = "none";
    $('#StartInfo').dialog({
      "width": 500,
      autoOpen: true
    });
    patientState = "VFib";
    document.getElementById("StartInfo").innerHTML = "<p>As you return to duty after your lunch break, you are urgently called to a patient room, where a patient's grandfather has collapsed to the floor. This is a patient's family member. You do not know the exact weight. He is of normal adult size.</p>";
    document.getElementById("ui-id-1").innerHTML = "Case I: A patient's family member collapses!";

    $('#PatientInfo').html("He is not breathing. You cannot feel a central pulse.");
    document.getElementById('PatientWeight').innerHTML = "";
    helpController(0);
  }
  if (caseNum == 2) {
    document.getElementById("RightTarget").style.left = '936px';
    document.getElementById("RightTarget").style.top = '385px';

    document.getElementById("LeftTarget").style.left = '837px';
    document.getElementById("LeftTarget").style.top = '379px';

    document.getElementById("LLEKGTarget").style.left = '938px';
    document.getElementById("LLEKGTarget").style.top = '446px';

    document.getElementById("LAEKGTarget").style.left = '940px';
    document.getElementById("LAEKGTarget").style.top = '337px';

    document.getElementById("RAEKGTarget").style.left = '855px';
    document.getElementById("RAEKGTarget").style.top = '362px';

    document.getElementById('AdultDummy').src = "assets/child.png";
    document.getElementById('IntroModal').style.display = "none";
    document.getElementById('Continue').innerHTML = "<a href=\"Tutorial.html?testnum=2&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "\">Click Here to Restart This Case</a>"
    $('#StartInfo').dialog({
      "width": 500,
      autoOpen: true
    });
    patientState = "SlowRhythm";
    document.getElementById("StartInfo").innerHTML = "<p>You are called to the Emergency Department to assist staff with resuscitating a 4 year old patient who has a persistently slow cardiac rhythm after ingesting several of his grandmother's blood pressure pills. The patient remains symptomatically bradycardic despite attempts at medical management. Cardiology has recommended initiating transcutaneous pacing. Quickly assess the patient.</p>";
    document.getElementById("ui-id-1").innerHTML = "Case II: A toddler ingests Grandma's pills!";

    $('#PatientInfo').html("The patient is somnolent but responsive to stimuli. He is breathing spontaneously. He has a central pulse. BP is 56/30");
    helpController(100);
    document.getElementById('PatientWeight').innerHTML = "Weight: 14kg";
  }
  if (caseNum == 3) {
    document.getElementById("RightTarget").style.left = '952px';
    document.getElementById("RightTarget").style.top = '412px';

    document.getElementById("LeftTarget").style.left = '870px';
    document.getElementById("LeftTarget").style.top = '402px';

    document.getElementById("LLEKGTarget").style.left = '950px';
    document.getElementById("LLEKGTarget").style.top = '472px';

    document.getElementById("LAEKGTarget").style.left = '949px';
    document.getElementById("LAEKGTarget").style.top = '366px';

    document.getElementById("RAEKGTarget").style.left = '890px';
    document.getElementById("RAEKGTarget").style.top = '390px';


    document.getElementById('LeftPad').style.left = "954px";
    document.getElementById('LeftPad').style.top = "573px";

    document.getElementById('RightPad').style.left = "1054px";
    document.getElementById('RightPad').style.top = "573px";
    instance.repaintEverything();

    document.getElementById('AdultDummy').src = "assets/infant.png";
    document.getElementById('AdultDummy').style.top = "200px";

    document.getElementById('Continue').innerHTML = "<a href=\"Tutorial.html?testnum=3&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "\">Click Here to Restart This Case</a>";
    document.getElementById('IntroModal').style.display = "none";
    $('#StartInfo').dialog({
      "width": 500,
      autoOpen: true
    });

    patientState = "VTac";
    document.getElementById("StartInfo").innerHTML = "<p>A 10kg 11 month old infant with suspected myocarditis is admitted to your unit. As you head over to assess this patient, a nurse calls out that the infant has suddenly become less responsive.</p>";
    document.getElementById("ui-id-1").innerHTML = "Case III: An infant is not responsive!";

    $('#PatientInfo').html("The infant is breathing. He is somewhat pale. You feel a faint central pulse.");
    helpController(200);
    document.getElementById('PatientWeight').innerHTML = "Weight: 10kg";
  }
  if (caseNum == 4) {
    document.getElementById("RightTarget").style.left = '952px';
    document.getElementById("RightTarget").style.top = '412px';

    document.getElementById("LeftTarget").style.left = '870px';
    document.getElementById("LeftTarget").style.top = '402px';

    document.getElementById("LLEKGTarget").style.left = '950px';
    document.getElementById("LLEKGTarget").style.top = '472px';

    document.getElementById("LAEKGTarget").style.left = '949px';
    document.getElementById("LAEKGTarget").style.top = '366px';

    document.getElementById("RAEKGTarget").style.left = '890px';
    document.getElementById("RAEKGTarget").style.top = '390px';


    document.getElementById('LeftPad').style.left = "1054px";
    document.getElementById('LeftPad').style.top = "473px";

    document.getElementById('RightPad').style.left = "1154px";
    document.getElementById('RightPad').style.top = "473px";
    instance.repaintEverything();

    document.getElementById('AdultDummy').src = "assets/infant.png";
    document.getElementById('AdultDummy').style.top = "200px";

    casePointsTimeDeduction = setTimeout(function() {
      TestCase1.TotalPoints -= 10;
    }, 60000);

    document.getElementById('Continue').style.display = "none";
    isTestOn = true;
    document.getElementById('IntroModal').style.display = "none";
    $('#StartInfo').dialog({
      "width": 500,
      autoOpen: true
    });
    document.getElementById('HelpBox').style.display = "none";
    patientState = "VFib";
    document.getElementById("StartInfo").innerHTML = "<p>You are on duty in the Emergency Department when a 6 kg 6 month old infant is rushed in, limp and minimally responsive. Mother states that the baby has had increased respiratory effort and has been feeding poorly. Mother thought he had a viral respiratory infection. As you approach, the infant stops breathing and becomes unresponsive. <br><br> Quickly assess the infant. </p>";
    document.getElementById("ui-id-1").innerHTML = "Test Case I: A baby becomes unresponsive!";

    $('#PatientInfo').html("The baby is cyanotic and unresponsive. There is no pulse.");
    helpController(200);
    document.getElementById('PatientWeight').innerHTML = "Weight: 6kg";

    CPRDeathTime = setTimeout(function() {
      TestCase1.SurvivalStateReached = false;
      TestCase1.TotalCaseTime = Math.round((new Date() / 1000) - startTime);

      if (TestCase1.TotalCaseTime > 60 * 4) {
        TestCase1.CaseTimeMoreThanFourMin = true;
      }
      if (TestCase1.TotalCaseTime < 60 * 2) {
        TestCase1.CaseTimeLessThan2Min = true;
      }
      TestCase1.TotalPoints = TestCase1.TotalPoints - 100;
      TestCase1.DeathStateReached = true;
      HRNum = 0;
      document.getElementById('HRNum').innerHTML = HRNum;
      patientState = "Dead";
      clearTimeout(casePointsTimeDeduction);
      sendPostData(TestCase1);
      rhythmChange(initp, "black url('assets/DeadLine.png')");
      setTimeout(function() {
        errorController(10);
      }, 1000);
    }, 45000);
  }
  if (caseNum == 6) {
    document.getElementById("RightTarget").style.left = '949px';
    document.getElementById("RightTarget").style.top = '389px';

    document.getElementById("LeftTarget").style.left = '843px';
    document.getElementById("LeftTarget").style.top = '379px';

    document.getElementById("LLEKGTarget").style.left = '955px';
    document.getElementById("LLEKGTarget").style.top = '446px';

    document.getElementById("LAEKGTarget").style.left = '952px';
    document.getElementById("LAEKGTarget").style.top = '334px';

    document.getElementById("RAEKGTarget").style.left = '855px';
    document.getElementById("RAEKGTarget").style.top = '362px';

    document.getElementById('AdultDummy').src = "assets/adult-teen.png";
    document.getElementById('AdultDummy').style.top = "200px";

    document.getElementById('Continue').style.display = "none";
    document.getElementById('HelpBox').style.display = "none";
    isTestOn = true;
    document.getElementById('IntroModal').style.display = "none";
    $('#StartInfo').dialog({
      "width": 500,
      autoOpen: true
    });

    patientState = "SlowRhythm";
    document.getElementById("StartInfo").innerHTML = "<p>A 65kg, 17 yo male is brought to the Emergency Department with history of lethargy and suspected multidrug ingestion. He had been at a 'rave' and his friend called EMS when he seemed 'out of it'. The patient was arousable at the scene, and intubation was deferred because the patient was maintaining his own airway. On arrival at the Emergency Department the patient was mildy tachycardic, with temp 38C and pupils 2mm. You are now called to assess the patient when a nurse notices a change in his cardiac rhythm that has not responded to his medications. <br><br>Quickly evaluate the patient. You must use the defibrillator/pacer to stabilize his condition.</p>";
    document.getElementById("ui-id-1").innerHTML = "Case III: A lethargic teen comes to the ED!";

    $('#PatientInfo').html("The patient is sleepy but arousable. He is breathing spontaneously and has a palpable pulse. BP is 64/29.");
    helpController(200);
    document.getElementById('PatientWeight').innerHTML = "Weight: 65kg";
  }
  if (caseNum == 5) {
    document.getElementById("RightTarget").style.left = '952px';
    document.getElementById("RightTarget").style.top = '412px';

    document.getElementById("LeftTarget").style.left = '870px';
    document.getElementById("LeftTarget").style.top = '402px';

    document.getElementById("LLEKGTarget").style.left = '950px';
    document.getElementById("LLEKGTarget").style.top = '472px';

    document.getElementById("LAEKGTarget").style.left = '949px';
    document.getElementById("LAEKGTarget").style.top = '366px';

    document.getElementById("RAEKGTarget").style.left = '890px';
    document.getElementById("RAEKGTarget").style.top = '390px';

    document.getElementById('LeftPad').style.left = "1054px";
    document.getElementById('LeftPad').style.top = "473px";

    document.getElementById('RightPad').style.left = "1154px";
    document.getElementById('RightPad').style.top = "473px";
    instance.repaintEverything();

    casePointsTimeDeduction = setTimeout(function() {
      TestCase2.TotalPoints -= 10;
    }, 150000);

    document.getElementById('AdultDummy').src = "assets/infant.png";
    document.getElementById('AdultDummy').style.top = "200px";

    document.getElementById('Continue').style.display = "none";
    isTestOn = true;
    document.getElementById('HelpBox').style.display = "none";
    document.getElementById('IntroModal').style.display = "none";
    $('#StartInfo').dialog({
      "width": 500,
      autoOpen: true
    });

    patientState = "VTac";
    document.getElementById("StartInfo").innerHTML = "<p>You are called to help stabilize an 8.5 kg, 6 month old female in the Emergency Department. The baby's mother says the baby was well until 2 days ago when he developed inconsolable fussiness and poor feeding. The baby sometimes seems dusky during these episodes. The baby was afebrile, dusky, and inconsolably crying on arrival. The Cardiology fellow assigned to the ED administered medication for what he thought was an abnormal heart rhythm. The infant did not respond to the medication and the blood pressure has fallen. Cardiology now feels that a defibrillator is needed and has asked you to bring it to the bedside.<br><br> Quickly assess the patient.</p>";
    document.getElementById("ui-id-1").innerHTML = "Case II: An inconsolable baby.";

    $('#PatientInfo').html("The baby is awake and fussy, with grunting respirations. There are palpable pulses. BP is 55/21.");
    helpController(200);
    document.getElementById('PatientWeight').innerHTML = "Weight: 8.5kg";
  }
}

function updateTime() {
  var d = new Date();
  document.getElementById('Time').innerHTML = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
}
setInterval(updateTime, 1000);

function heartBeatTick() {
  document.getElementById('Heart').style.display = "none";
  setTimeout(function() {
    document.getElementById('Heart').style.display = "block";
  }, 100);
}

function moveTicker() {
  document.getElementById("Ticker").style.display = "block";
  if (initp < 482) {
    if (isTransOver) {
      if (initp == changeInit + 8)
        document.getElementById("RhythmChange").style.zIndex = "0";
      readyForDeletion = true;
    }
    if (isRhythmTransitionOn) {
      document.getElementById("RhythmChange").style.width = parseInt(document.getElementById("RhythmChange").style.width) + 4 + "px";
      if (changeInit + parseInt(document.getElementById("RhythmChange").style.width) > 481) {
        isRhythmTransitionOn = false;
        isTransOver = true;
        document.ccapsule = transitonRhythm;
      }
    }
    document.getElementById("ChangeRhythm").style.width = initp - 119 + "px";
    initp += 4;

    document.getElementById('Ticker').style.left = initp + "px";
  } else {
    if (readyForDeletion) {
      document.getElementById("RhythmChange").style.width = 0 + "px";
      document.bcapsule = transitonRhythm;
      document.ccapsule = transitonRhythm;
      isTransOver = false;
      readyForDeletion = false;
      isRhythmTransitionOn = false;
    }
    initp = 130;
    document.getElementById("ChangeRhythm").style.width = 0 + "px";
    var gs = document.bcapsule;
    document.bcapsule = document.ccapsule;
    document.ccapsule = gs;
    $('#ChangeRhythm').css('background', document.bcapsule);
    $('#CurrentRhythm').css('background', document.ccapsule);
  }
}

function rhythmChange(rhythmnum, r) {
  if (document.bcapsule == r && document.ccapsule == r) {
    return;
  } else {
    isRhythmTransitionOn = true;
    changeInit = rhythmnum;
    document.getElementById('RhythmChange').style.left = changeInit + "px";
    document.getElementById('RhythmChange').style.width = "1px";
    document.getElementById('RhythmChange').style.zIndex = "50";
    $('#RhythmChange').css('background', r);
    transitonRhythm = r;
  }
}

function turnOn() {
  if (!isTutorialOn) {
    dataLogString += "On ";
    if (on === false && isOnLoading === false) {
      if (GetUrlValue('testnum') == 4) {
        TestCase1.TimeToTurnDefibOn = Math.round((new Date() / 1000) - startTime);
      }
      if (GetUrlValue('testnum') == 5) {
        TestCase2.TimeToTurnDefibOn = Math.round((new Date() / 1000) - startTime);
      }
      if (GetUrlValue('testnum') == 6) {
        TestCase3.TimeToTurnDefibOn = Math.round((new Date() / 1000) - startTime);
      }
      isOnLoading = true;
      document.getElementById('player').play();

      if (isTestPlugAttached == true) {
        helpController(3);
      }

      if (patientState == "VFib") {
        if (isTestPlugAttached == true) {
          helpController(3);
        }
      }
      if (patientState == "VTac") {
        helpController(202);
      }
      if (patientState == "SlowRhythm") {
        helpController(102);
      }

      document.getElementById('OnOff').src = "assets/LifePakOnOn.png";
      document.turnStartScreenOff = setTimeout(function() {
        document.getElementById("RhythmChange").style.display = "block";
        document.getElementById("ChangeRhythm").style.display = "block";
        document.getElementById("CurrentRhythm").style.display = "block";
        isOnLoading = false;
        TickVar = setInterval(moveTicker, 44);
        document.getElementById('MainScreen').style.background = "none";
        on = true;
        document.getElementById('TopMonitor').style.display = "block";

        if (isTestPlugAttached) {
          document.getElementById("RemoveTestPlug").style.display = "block";
          document.getElementById("removetestplug").play();
          helpController(103);
        }
        if ((isElectrodesConnected === false || isLeftPadConnected === false || isRightPadConnected === false) && !isTestPlugAttached) {
          document.getElementById("ConnectElectrodes").style.display = "block";
          document.getElementById("connectelectrodes").play();
          document.getElementById("BottomBar").style.display = "block";
          document.getElementById('BBText').innerHTML = ("Paddles leads off");
        }
        ecgController();
      }, 2000);
      document.getElementById('MainScreen').style.background = "url('assets/StartupScreen.png')";
    } else {
      return;
    }
  }
}

turnEnergyOff = setTimeout(function() {
  document.getElementById('EnergyLevel').style.display = "none";
  isEnergySelectionOn = false;
}, 5000);

function energySelectUp() {
  dataLogString += "EnergySelectRighttUp "
  if (ispacerFuncOn) {
    TestCase3.EnergySelectWhilePacing = true;
  }
  if (isAEDOn) {
    isAEDOn = false;
    if (isShockReady) {
      clearTimeout(analyzeCharge);
      document.getElementById('motiondetected').pause();

      document.getElementById('AnalyzeMenu').style.display = "none";
      document.getElementById('AnalyzeText').innerHTML = "Analyzing Now -- Stand Clear";

      document.getElementById('ChargingBackground').style.display = "none";
      document.getElementById('ShockAdvised').style.display = "none";
      isShockReady = false;
      document.getElementById('shockprompt').pause();
      document.getElementById('shockprompt').src = document.getElementById('shockprompt').src;
      clearInterval(document.interval);
      document.getElementById("ShockLight").style.display = "none";
      clearTimeout(document.LoadingInterval);
      document.getElementById('ShockMenu').style.display = "none";
      document.getElementById('EnergyLevel').style.display = "none";
      document.getElementById('AnalyzeLight2').style.display = "none";
      document.getElementById('AnalyzeLight1').style.display = "none";
    } else {
      document.getElementById('ChargingBackground').style.display = "none";
      document.getElementById('ShockAdvised').style.display = "none";
      isCharging = false;
      isShockReady = false;
      document.getElementById('Charging').style.display = "none";
      clearTimeout(document.chargeTimout);
      clearTimeout(document.LoadingInterval);
      document.getElementById('EnergyLevel').style.display = "none";
      document.getElementById('AnalyzeLight2').style.display = "none";
      document.getElementById('AnalyzeLight1').style.display = "none";
      return;
    }
  }
  if (on && (!isCharging) && (!isShockReady) && (isLeftPadConnected && isRightPadConnected && isElectrodesConnected && isTherapyCableAttached)) {
    document.getElementById('tick').play();
    if (isEnergySelectionOn === false) {
      isEnergySelectionOn = true;
      clearTimeout(turnEnergyOff);
      document.getElementById('EnergyLevel').style.display = "block";
      turnEnergyOff = setTimeout(function() {
        document.getElementById('EnergyLevel').style.display = "none";
      }, 5000);
      turnEnergyOff;
    } else {
      if (chargeJoules < 360) {
        if (chargeJoules < 10) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 1;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules < 20 && chargeJoules >= 10) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 5;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 30 && chargeJoules >= 20) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 10;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 70 && chargeJoules >= 30) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 20;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 100 && chargeJoules >= 50) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 30;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules > 70 && chargeJoules < 325) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 25;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules > 300) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 35;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        }
        if (chargeJoules >= 200) {
          if (patientState == "VFib") {
            helpController(5);
          }
        }
        if (chargeJoules >= 5) {
          if (patientState == "VTac") {
            helpController(207);
          }
        }
        document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
        document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
      }
      clearTimeout(turnEnergyOff);
      document.getElementById('EnergyLevel').style.display = "block";
      turnEnergyOff = setTimeout(function() {
        document.getElementById('EnergyLevel').style.display = "none";
        isEnergySelectionOn = false;
      }, 5000);
      turnEnergyOff;
    }
  } else if (isTestPlugAttached && on && isTherapyCableAttached) {
    document.getElementById('tick').play();
    if (isEnergySelectionOn == false) {
      isEnergySelectionOn = true;
      clearTimeout(turnEnergyOff);
    } else {
      if (chargeJoules < 360) {
        if (chargeJoules < 10) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 1;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules < 20 && chargeJoules >= 10) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 5;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 30 && chargeJoules >= 20) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 10;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 70 && chargeJoules >= 30) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 20;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 100 && chargeJoules >= 50) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 30;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules > 70 && chargeJoules < 325) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 25;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules > 300) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) + 35;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        }
        if (chargeJoules >= 200) {
          if (patientState == "VFib") {
            helpController(5);
          }
        }
        if (chargeJoules >= 20) {
          if (patientState == "VTac") {
            helpController(207);
          }
        }
        document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
        document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
      }
    }
    document.getElementById('EnergyLevel').style.display = "block";
    document.getElementById('RemoveTestPlug').style.display = "none";
    if (isTestPlugAttached) {
      document.getElementById('BBText').innerHTML = "Remove Test Plug";
    }
    document.getElementById('BottomBar').style.display = "block";
    turnEnergyOff = setTimeout(function() {
      document.getElementById('EnergyLevel').style.display = "none";
      isEnergySelectionOn = false;
      document.getElementById('RemoveTestPlug').style.display = "block";
      document.getElementById('BottomBar').style.display = "none"
    }, 5000);
  }
}

function energySelectDown() {
  if (ispacerFuncOn) {
    TestCase3.EnergySelectWhilePacing = true;
  }
  dataLogString += "EnergySelectDown "
  if (isAEDOn) {
    isAEDOn = false;
    if (isShockReady) {
      clearTimeout(analyzeCharge);
      document.getElementById('motiondetected').pause();
      document.getElementById('ChargingBackground').style.display = "none";
      document.getElementById('ShockAdvised').style.display = "none";
      isShockReady = false;
      document.getElementById('shockprompt').pause();
      document.getElementById('shockprompt').src = document.getElementById('shockprompt').src;
      isCharging = false;

      clearInterval(document.interval);
      document.getElementById("ShockLight").style.display = "none";
      clearTimeout(document.LoadingInterval);
      document.getElementById('ShockMenu').style.display = "none";
      document.getElementById('EnergyLevel').style.display = "none";
      document.getElementById('AnalyzeLight2').style.display = "none";
      document.getElementById('AnalyzeLight1').style.display = "none";
      return;
    } else {
      document.getElementById('AnalyzeMenu').style.display = "none";
      document.getElementById('AnalyzeText').innerHTML = "Analyzing Now -- Stand Clear";
      document.getElementById('ChargingBackground').style.display = "none";
      document.getElementById('ShockAdvised').style.display = "none";
      isCharging = false;
      isShockReady = false;
      document.getElementById('Charging').style.display = "none";
      clearTimeout(document.chargeTimout);
      clearTimeout(document.LoadingInterval);
      document.getElementById('EnergyLevel').style.display = "none";
      document.getElementById('AnalyzeLight2').style.display = "none";
      document.getElementById('AnalyzeLight1').style.display = "none";
      return;
    }
  }

  if (on && (!isCharging) && (!isShockReady) && (isLeftPadConnected && isRightPadConnected && isElectrodesConnected && isTherapyCableAttached)) {
    document.getElementById('tick').play();
    if (isEnergySelectionOn == false) {
      isEnergySelectionOn = true;
      clearTimeout(turnEnergyOff)
      document.getElementById('EnergyLevel').style.display = "block";
      turnEnergyOff = setTimeout(function() {
        document.getElementById('EnergyLevel').style.display = "none";
        isEnergySelectionOn = false;
      }, 5000);
      turnEnergyOff;
    } else {
      if (chargeJoules > 0) {
        if (chargeJoules < 11 && chargeJoules > 2) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 1;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules < 21 && chargeJoules > 11) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 5;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 31 && chargeJoules > 20) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 10;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 71 && chargeJoules > 30) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 20;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules < 101 && chargeJoules > 70) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 30;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";

        } else if (chargeJoules > 101 && chargeJoules <= 325) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 25;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules > 325) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 35;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        }
        if (chargeJoules <= 20) {
          if (patientState == "VTac") {
            helpController(207);
          }
        }
      }
      clearTimeout(turnEnergyOff)
      document.getElementById('EnergyLevel').style.display = "block";
      turnEnergyOff = setTimeout(function() {
        document.getElementById('EnergyLevel').style.display = "none";
        isEnergySelectionOn = false;
      }, 5000);
      turnEnergyOff;
    }
  } else if (isTestPlugAttached && on && isTherapyCableAttached) {
    document.getElementById('tick').play();
    if (isEnergySelectionOn == false) {
      isEnergySelectionOn = true;
    } else {
      if (chargeJoules < 360) {
        if (chargeJoules < 11 && chargeJoules > 2) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 1;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules < 21 && chargeJoules > 11) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 5;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules < 31 && chargeJoules > 20) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 10;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules < 71 && chargeJoules > 30) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 20;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules < 101 && chargeJoules > 70) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 30;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules > 101 && chargeJoules <= 325) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 25;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        } else if (chargeJoules > 325) {
          chargeJoules = parseInt(document.getElementById("JoulesEnergy").innerHTML) - 35;
          document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
          document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
        }
        if (chargeJoules >= 200) {
          if (patientState == "VFib") {
            helpController(5);
          }
        }
        if (chargeJoules >= 5) {
          if (patientState == "VTac") {
            helpController(207);
          }
        }
        document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
        document.getElementById("JoulesEnergy").innerHTML = chargeJoules + "J";
      }
    }
  }
}

function charge() {
  dataLogString += "Charge" + chargeJoules + " ";
  if (on && isLeftPadConnected && isRightPadConnected && (!isCharging) && (!isShockReady) && isElectrodesConnected && isTherapyCableAttached) {
    if (isAEDOn) {
      document.getElementById('ShockAdvised').style.display = "block";
    } else if (!isAEDOn && patientState == "VFib" && chargeJoules > 200) {
      document.getElementById('tick').play();
      helpController(7);
    }
    if (patientState == "Sync") {
      helpController(210);
    }
    document.getElementById('ChargingBackground').style.display = "block";
    document.getElementById('ShockLoadingBar').style.width = 0 + "px";
    isCharging = true;
    var IntervalHelp = 0;
    document.getElementById('Charging').style.display = "block";
    document.getElementById("ChargingTo").innerHTML = "Charging To " + parseInt(chargeJoules) + "J";

    if (chargeJoules < 100) {
      fchargeJoules = 20;
      document.getElementById('20J').play();
      document.getElementById('20J').addEventListener('ended', function() {
        document.getElementById('shockprompt').play();
      });
    } else if (chargeJoules < 250) {
      fchargeJoules = 200;
      document.getElementById('200J').play();
      document.getElementById('200J').addEventListener('ended', function() {
        document.getElementById('shockprompt').play();
      });
    } else if (chargeJoules < 361) {
      fchargeJoules = 300;
      document.getElementById('300J').play();
      document.getElementById('300J').addEventListener('ended', function() {
        document.getElementById('shockprompt').play();
      });
    }
    document.LoadingInterval = setInterval(
      function() {
        if (parseInt(document.getElementById('ShockLoadingBar').style.width) < 190) {
          IntervalHelp += 2;
          document.getElementById('ShockLoadingBar').style.width = IntervalHelp + "px";
        } else {
          document.getElementById('ShockAdvised').style.display = "none";
          isCharging = false;
          clearTimeout(document.LoadingInterval);

          document.getElementById('ChargingBackground').style.display = "none";
          document.getElementById('Charging').style.display = "none";
          document.getElementById('ShockMenu').style.display = "block";
          document.getElementById('JAvaliable').innerHTML = chargeJoules + "J Available";
          isShockReady = true;
          document.interval = setInterval(function() {
            if (document.getElementById("ShockLight").style.display == "none")
              document.getElementById("ShockLight").style.display = "block";
            else document.getElementById("ShockLight").style.display = "none";
          }, 600);
        }
      }, fchargeJoules / 4.5);
  } else if (isTestPlugAttached && isTherapyCableAttached) {
    document.getElementById('tick').play();
    if (!istestPlugCharged) {
      document.getElementById('removetestplug').play();
      istestPlugCharged = true;
    } else {
      istestPlugCharged = false;
      document.getElementById('BottomBar').style.display = "block";
      document.getElementById('ChargingBackground').style.display = "block";
      document.getElementById('ShockLoadingBar').style.width = 0 + "px";
      isCharging = true;
      var IntervalHelp = 0;
      document.getElementById('Charging').style.display = "block";
      document.getElementById("ChargingTo").innerHTML = "Charging To " + parseInt(chargeJoules) + "J";

      if (chargeJoules < 100) {
        document.getElementById('20J').play();
        document.getElementById('20J').addEventListener('ended', function() {
          document.getElementById('shockprompt').play();
        });
      } else if (chargeJoules < 250) {
        document.getElementById('200J').play();
        document.getElementById('200J').addEventListener('ended', function() {
          document.getElementById('shockprompt').play();
        });
      } else if (chargeJoules < 350) {
        document.getElementById('300J').play();
        document.getElementById('300J').addEventListener('ended', function() {
          document.getElementById('shockprompt').play();
        });
      }
      document.LoadingInterval = setInterval(
        function() {
          if (parseInt(document.getElementById('ShockLoadingBar').style.width) < 190) {
            IntervalHelp += 1;
            document.getElementById('ShockLoadingBar').style.width = IntervalHelp + "px";
          } else {
            document.getElementById('ShockAdvised').style.display = "none";
            isCharging = false;
            clearTimeout(document.LoadingInterval);

            document.getElementById('ChargingBackground').style.display = "none";
            document.getElementById('Charging').style.display = "none";
            document.getElementById('ShockMenu').style.display = "block";
            document.getElementById('JAvaliable').innerHTML = chargeJoules + "J Available";
            isShockReady = true;

            document.interval = setInterval(function() {
              if (document.getElementById("ShockLight").style.display == "none")
                document.getElementById("ShockLight").style.display = "block";
              else document.getElementById("ShockLight").style.display = "none";
            }, 600);

          }
        }, chargeJoules / 9);
    }
  }
}

function shock() {
  dataLogString += "Shock ";
  if (on && patientState != "Sync" && patientState != "VTac" && isLeftPadConnected && isRightPadConnected && othershockbool && isElectrodesConnected && isShockReady && !isCPROn) {
    document.getElementById('shockprompt').pause();
    if (isShockReady && (!isCPROn)) {
      if (GetUrlValue('testnum') == 4 && isAEDOn) {
        TestCase1.ShockInAnalyze = true;
      }
      if (GetUrlValue('testnum') == 5 && isAEDOn) {
        TestCase2.ShockInAnalyze = true;
      }
      if (GetUrlValue('testnum') == 6 && isAEDOn) {
        TestCase2.ShockInAnalyze = true;
      }
    }
    isAEDOn = false;

    document.getElementById("ShockLight").style.display = "none";
    clearInterval(document.interval);
    document.getElementById('ShockMenu').style.display = "none";
    if (patientState != "Sync")
      document.getElementById('EnergyDelivered').style.display = "block";
    isShockReady = false;

    if (chargeJoules > 180 && !isTestOn) {
      if (patientState == "VFib" && !isTestPlugAttached) {
        clearTimeout(MinDeathTimeout);
        helpController(8);
        HRNum = 90;
        document.getElementById('HRNum').innerHTML = HRNum;
        patientState = "NormalVFib";
        clearTimeout(casePointsTimeDeduction);
        document.getElementById('PatientInfo').innerHTML = "Continue CPR before reassessing for a pulse.";
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }
    }
    if (chargeJoules > 10 && chargeJoules < 59 && GetUrlValue('testnum') == 4) {
      if (patientState == "VFib" && !isTestPlugAttached && isTestOn) {
        TestCase1.TotalPoints += 15;
        helpController(8);
        HRNum = 90;
        document.getElementById('HRNum').innerHTML = HRNum;
        patientState = "NormalVFib";
        document.getElementById('PatientInfo').innerHTML = "Continue CPR.";
        clearTimeout(MinDeathTimeout);
        document.NoCPRVictory = setTimeout(function() {
          if (GetUrlValue('testnum') == 4) {
            clearTimeout(MinDeathTimeout);
            TestCase1.SurvivalStateReached = true;
            $('#hidden_field').val(JSON.stringify(TestCase1));
            TestCase1.TotalCaseTime = Math.round(new Date() / 1000 - startTime);
            if (TestCase1.TotalCaseTime > 60 * 4) {
              TestCase1.CaseTimeMoreThanFourMin = true;
            }
            if (TestCase1.TotalCaseTime < 60 * 2) {
              TestCase1.CaseTimeLessThan2Min = true;
            }
            sendPostData(TestCase1);
          }
          if (!isTestOn) {
            document.getElementById("EndDialog").innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=2&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
            document.getElementById("PatientInfo").innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=2&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
          }
          if (isTestOn) {
            if (GetUrlValue('testnum') == 4) {
              document.getElementById("EndDialog").innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=5&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
              document.getElementById('PatientInfo').innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=5&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
            }
          }
          $('#EndDialog').dialog({
            "width": 400,
            modal: true,
            autoOpen: true
          });
        }, 30000);
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }

    }
    if (chargeJoules > 10 && chargeJoules < 85 && GetUrlValue('testnum') == 5) {
      if (patientState == "VFib" && !isTestPlugAttached && isTestOn) {
        TestCase2.ShockAfterVFibStateTime = (Math.round((new Date() / 1000) - startTime) - TestCase2.VFibStartTime);
        helpController(8);
        HRNum = 90;
        document.getElementById('HRNum').innerHTML = HRNum;
        patientState = "NormalVFib";
        TestCase2.TotalPoints += 15;
        clearTimeout(casePointsTimeDeduction);
        document.SecAftVFibNoCPR = setTimeout(function() {
          errorController(-1);
        }, 30000);
        document.getElementById('PatientInfo').innerHTML = "Continue CPR.";
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }
    }
    if (patientState == "VFib" && isTestOn && chargeJoules > 59 && GetUrlValue('testnum') == 4) {
      TestCase1.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
      if (TestCase1.TotalCaseTime > 60 * 4) {
        TestCase1.CaseTimeMoreThanFourMin = true;
      }
      if (TestCase1.TotalCaseTime < 60 * 2) {
        TestCase1.CaseTimeLessThan2Min = true;
      }

      TestCase1.TotalPoints = TestCase1.TotalPoints - 100;
      TestCase1.DeathStateReached = true;
      TestCase1.ShocKWithEnergyGreaterThan59 = true;
      patientState = "Dead";
      clearTimeout(casePointsTimeDeduction);
      clearTimeout(MinDeathTimeout);

      HRNum = 0;
      document.getElementById('HRNum').innerHTML = HRNum;
      clearTimeout(CPRDeathTime);
      sendPostData(TestCase1);
      rhythmChange(initp, "black url('assets/DeadLine.png')");
      setTimeout(function() {
        errorController(10);
      }, 1000);
    }
    if (patientState == "VFib" && isTestOn && chargeJoules > 84 && GetUrlValue('testnum') == 5) {
      TestCase2.TotalCaseTime = Math.round((new Date() / 1000) - startTime);
      if (TestCase2.TotalCaseTime > 60 * 4) {
        TestCase2.CaseTimeMoreThanFourMin = true;
      }
      if (TestCase2.TotalCaseTime < 60 * 2) {
        TestCase2.CaseTimeLessThan2Min = true;
      }
      TestCase2.TotalPoints = TestCase2.TotalPoints - 100;

      TestCase2.DeathStateReached = true;
      TestCase2.ShockWithEnergyGreaterThan84 = true;
      clearTimeout(casePointsTimeDeduction);
      clearTimeout(MinDeathTimeout);
      clearTimeout(CPRDeathTime);

      patientState = "Dead";
      HRNum = 0;
      sendPostData(TestCase2);
      document.getElementById('HRNum').innerHTML = HRNum;

      rhythmChange(initp, "black url('assets/DeadLine.png')");
      setTimeout(function() {
        errorController(11);
      }, 1000);
    }
    setTimeout(function() {
      document.getElementById('EnergyDelivered').style.display = "none";
      document.getElementById('BottomBar').style.display = "none";
    }, 3000);
  } else if (isCPROn) {
    errorController(2);
  } else if (isTestPlugAttached && isShockReady) {
    clearInterval(document.syncInterval);
    document.getElementById("SyncLight").style.display = "none";
    if (isSyncOn && GetUrlValue('testnum') == 5) {
      rhythmChange(initp, "black url('assets/SVT.png')");
    }
    if (isSyncOn && GetUrlValue('testnum') == 3) {
      rhythmChange(initp, "black url('assets/vtac.png')");
    }
    isSyncOn = false;

    document.getElementById('EnergyDelivered').style.display = "block";
    isShockReady = false;
    document.getElementById('shockprompt').pause();
    document.getElementById("ShockLight").style.display = "none";
    clearInterval(document.interval);
    document.getElementById('ShockMenu').style.display = "none";
    setTimeout(function() {
      document.getElementById('EnergyDelivered').style.display = "none";
      document.getElementById('BottomBar').style.display = "none";
    }, 3000);
  }
}

function speedDial() {
  if (on) {
    document.getElementById('LeadSelect').style.display = "none";
    isLeadSelectOn = false;
    if (isShockReady) {
      document.getElementById('ChargingBackground').style.display = "none";
      document.getElementById('ShockAdvised').style.display = "none";
      isShockReady = false;
      document.getElementById('shockprompt').pause();
      document.getElementById('shockprompt').src = document.getElementById('shockprompt').src;

      clearInterval(document.interval);
      document.getElementById("ShockLight").style.display = "none";
      clearTimeout(document.LoadingInterval);
      document.getElementById('ShockMenu').style.display = "none";
      document.getElementById('EnergyLevel').style.display = "none";
      document.getElementById('AnalyzeLight2').style.display = "none";
      document.getElementById('AnalyzeLight1').style.display = "none";
    } else {
      clearTimeout(analyzeCharge);
      document.getElementById('motiondetected').pause();

      isCharging = false;
      isAEDOn = false;
      document.getElementById('shockprompt').addEventListener('ended', function() {
        this.pause();
        this.currentTime = 0;
      }, false);
      clearTimeout(document.LoadingInterval);
      clearInterval(document.interval);
      document.getElementById('AnalyzeLight2').style.display = "none";
      document.getElementById('AnalyzeLight1').style.display = "none";
      document.getElementById('ChargingBackground').style.display = "none";
      document.getElementById('ShockAdvised').style.display = "none";
      document.getElementById('Charging').style.display = "none";
      document.getElementById('20J').pause();
      document.getElementById('AnalyzeMenu').style.display = "none";
      document.getElementById('AnalyzeText').innerHTML = "Analyzing Now -- Stand Clear";

      document.getElementById('200J').pause();
      document.getElementById('20J').src = document.getElementById('20J').src;
      document.getElementById('300J').pause();

      clearTimeout(document.chargeTimout);
      clearTimeout(document.LoadingInterval);
      document.getElementById('EnergyLevel').style.display = "none";
    }
  }
}

function analyze() {
  dataLogString += "Analyze ";
  if (on && isLeftPadConnected && isRightPadConnected && isElectrodesConnected && !isAEDOn) {
    if (GetUrlValue('testnum') == 4) {
      TestCase1.AnalyzePressed = true;
    }
    if (GetUrlValue('testnum') == 5) {
      TestCase2.AnalyzePressed = true;
    }
    if (GetUrlValue('testnum') == 6) {
      TestCase3.AnalyzePressed = true;
    }
    document.getElementById('analyzingnowstandclear').play();

    if (patientState == "VFib") {
      helpController(10);
    }
    if (patientState == "VTac" && !isTestOn) {
      errorController(4);
    }
    isAEDOn = true;
    chargeJoules = 200;
    document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
    document.getElementById('JoulesEnergy').innerHTML = "200J";

    document.getElementById("AnalyzeMenu").style.display = "block";
    document.getElementById("AnalyzeLight1").style.display = "block";
    document.getElementById("AnalyzeLight2").style.display = "block";
    if (isCPROn) {
      setTimeout(function() {
        if (isCPROn) {
          document.getElementById('motiondetected').play();
          document.getElementById('AnalyzeText').innerHTML = "Motion Detected -- Stop Motion";
        }
      }, 5000);
    } else if (patientState == "VFib") {
      document.getElementById('analyzingnowstandclear').addEventListener('ended', function() {
        document.getElementById('shockadvised').play();
      });
      analyzeCharge = setTimeout(function() {
        document.getElementById('AnalyzeLight2').style.display = "none";
        document.getElementById("AnalyzeMenu").style.display = "none";
        charge();
      }, 5000);
    } else if (patientState == "VTac" && !isTestOn) {
      analyzeCharge = setTimeout(function() {
        document.getElementById('analyzingnowstandclear').addEventListener('ended', function() {
          document.getElementById('shockadvised').play();
        });
        document.getElementById('AnalyzeLight2').style.display = "none";
        chargeJoules = 200;
        document.getElementById("AnalyzeMenu").style.display = "none";
        charge();
        document.getElementById("CurrentJShock").innerHTML = chargeJoules + "J";
      }, 3000);
    } else {
      setTimeout(function() {
        isAEDOn = false;
        document.getElementById("noshockadvised").play();
        document.getElementById("AnalyzeText").innerHTML = "No Shock Advised";
        setTimeout(function() {
          document.getElementById("AnalyzeMenu").style.display = "none";
          document.getElementById('AnalyzeLight1').style.display = "none";
          document.getElementById('AnalyzeLight2').style.display = "none";
          document.getElementById("AnalyzeText").innerHTML = "Analyzing Now -- Stand Clear";
        }, 3000);
      }, 3000);
    }
  }
}

function pacer() {
  dataLogString += "Pacer ";
  if (on && isLeftPadConnected && isRightPadConnected && isElectrodesConnected) {
    document.getElementById('tick').play();
    if (!ispacerFuncOn) {
      ispacerFuncOn = true;
      if (patientState == "SlowRhythm" && isRAEKGConnected && isLAEKGConnected && isLLEKGConnected) {
        helpController(110);
        helpController(111);
      }
      if (patientState == "SlowRhythm" && !(isRAEKGConnected && isLAEKGConnected && isLLEKGConnected)) {

        helpController(107);
        helpController(111)
      }
      if (patientState != "SlowRhythm") {
        if (leadStatus == "Paddles") {
          rhythmChange(initp, "black url('assets/Flatline.png')");
        }
      }
      var element = document.getElementById("Paddles");
      if (element != null)
        element.parentNode.removeChild(element);
      document.getElementById("HRNum").innerHTML = "---";
      document.getElementById("HRNum").style.top = "169px";
      document.getElementById("HRNum").style.top = "119px";
      document.getElementById("PacerLight").style.display = "block";
      document.getElementById("PacerMenu").style.display = "block";
      document.getElementById("PaddlesX1").src = "assets/Lead2.png";
      leadStatus = "EKGS";
      isPacerOn = true;
      leadNum = 3;
      document.turnPacerOff = setTimeout(function() {
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
        document.getElementById("BottomPaceBar").style.display = "block";
      }, 10000);

      if (PacerCurrent == 30 && patientState == "SlowRhythm" && isLLEKGConnected && isLAEKGConnected && isRAEKGConnected) {
        rhythmChange(initp, "black url('assets/30mAPace.png')");
      } else if (PacerCurrent < 90 && PacerCurrent > 30 && patientState == "SlowRhythm" && (isLLEKGConnected && isLAEKGConnected && isRAEKGConnected)) {
        rhythmChange(initp, "black url('assets/" + PacerCurrent + "mAPace.png')");
      } else {
        rhythmChange(initp, "black url('assets/Flatline.png')");
      }
    } else {
      document.getElementById('tick').play();
      if (isLAEKGConnected && isLLEKGConnected && isRAEKGConnected && patientState == "SlowRhythm") {
        rhythmChange(initp, "black url('assets/SlowRhythm.png')");
      } else {
        if (patientState == "SlowRhythm") {
          rhythmChange(initp, "black url('assets/Flatline.png')");
        }
      }
      clearTimeout(document.turnPacerOff);
      document.getElementById("BottomPaceBar").style.display = "none";
      document.getElementById("BBText").innerHTML = "Pacing Off";

      document.getElementById("BottomBar").style.display = "block";
      setTimeout(function() {
        document.getElementById("BottomBar").style.display = "none";
      }, 10000);
      document.getElementById("LeadSelect").innerHTML = "<ul><li id=\"Paddles\">Paddles</li><li>I</li><li>II</li><li>III</li></ul>";
      isPacerOn = false;
      document.getElementById("PacerLight").style.display = "none";
      document.getElementById("PacerMenu").style.display = "none";
      ispacerFuncOn = false;
    }
  }
}

function currentLeft() {
  dataLogString += "CurrentDown ";
  if (on && ispacerFuncOn) {
    document.getElementById('tick').play();
    if (!isPacerOn) {
      document.getElementById("BottomPaceBar").style.display = "none";
      isPacerOn = true;
      document.getElementById("PacerMenu").style.display = "block";
      document.turnPacerOff = setTimeout(function() {
        document.getElementById("BottomPaceBar").style.display = "block";
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
      }, 10000);
    } else {
      clearTimeout(document.turnPacerOff);
      document.turnPacerOff = setTimeout(function() {
        document.getElementById("BottomPaceBar").style.display = "block";
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
        document.getElementById("HRNum").style.top = "163px";
        document.getElementById("HRNum").style.top = "125px";
        document.getElementById('HRNum').innerHTML = heartRate;
      }, 10000);
    }
    PacerCurrent = parseInt(document.getElementById("PacerText3").innerHTML) - 10;
    document.getElementById("PacerText3").innerHTML = PacerCurrent + " mA";
    document.getElementById("PacerText2").style.display = "none";
    document.getElementById("PacerText3").style.display = "block";
    document.getElementById("PacerText").innerHTML = "Current";
    document.getElementById("TopAmps").innerHTML = PacerCurrent + " mA";
    document.getElementById("BottomAmps").innerHTML = PacerCurrent + " mA";
  }
}

function currentRight() {
  dataLogString += "CurrentUp ";
  if (on && ispacerFuncOn) {
    document.getElementById('tick').play();
    if (!isPacerOn) {
      document.getElementById("BottomPaceBar").style.display = "none";
      isPacerOn = true;
      document.getElementById("PacerMenu").style.display = "block";
      document.turnPacerOff = setTimeout(function() {
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
      }, 10000);
    } else {
      clearTimeout(document.turnPacerOff);
      document.turnPacerOff = setTimeout(function() {
        document.getElementById("BottomPaceBar").style.display = "block";
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
      }, 10000);
    }
    PacerCurrent = parseInt(document.getElementById("PacerText3").innerHTML) + 10;
    document.getElementById("PacerText3").innerHTML = PacerCurrent + " mA";
    document.getElementById("PacerText2").style.display = "none";
    document.getElementById("PacerText3").style.display = "block";
    document.getElementById("PacerText").innerHTML = "Current";
    document.getElementById("TopAmps").innerHTML = PacerCurrent + " mA";
    document.getElementById("BottomAmps").innerHTML = PacerCurrent + " mA";
    if (patientState == "SlowRhythm" && isLLEKGConnected && isLAEKGConnected && isRAEKGConnected) {
      if (PacerCurrent == 30) {
        rhythmChange(initp, "black url('assets/30mAPace.png')");
      }
      if (PacerCurrent >= 40) {
        rhythmChange(initp, "black url('assets/40mAPace.png')");
      }
      if (PacerCurrent >= 50) {
        rhythmChange(initp, "black url('assets/50mAPace.png')");
      }
      if (PacerCurrent >= 60) {
        rhythmChange(initp, "black url('assets/60mAPace.png')");
      }
      if (PacerCurrent >= 70) {
        rhythmChange(initp, "black url('assets/70mAPace.png')");
      }
      if (PacerCurrent >= 80) {
        rhythmChange(initp, "black url('assets/PaceRightRhythm.png')");
        TestCase3.TotalPoints = "PASS";
        patientState = "GoodWithPace";
        helpController(113);
        clearTimeout(MinDeathTimeout);
      }
    }
  }
}

function rateLeft() {
  dataLogString += "RateDown ";
  if (on && ispacerFuncOn) {
    document.getElementById('tick').play();
    if (!isPacerOn) {
      document.getElementById("BottomPaceBar").style.display = "none";
      isPacerOn = true;
      document.getElementById("PacerMenu").style.display = "block";
      document.turnPacerOff = setTimeout(function() {
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
      }, 10000);
    } else {
      clearTimeout(document.turnPacerOff);
      document.turnPacerOff = setTimeout(function() {
        document.getElementById("BottomPaceBar").style.display = "block";
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
      }, 10000);
    }
    PacerRate = parseInt(document.getElementById("PacerText2").innerHTML) - 10;
    document.getElementById("PacerText2").innerHTML = PacerRate + " PPM";
    document.getElementById("TopRate").innerHTML = PacerRate + " PPM";
    document.getElementById("BottomRate").innerHTML = PacerRate + " PPM";
    document.getElementById("PacerText2").style.display = "block";
    document.getElementById("PacerText3").style.display = "none";
    document.getElementById("PacerText").innerHTML = "Rate";
  }
}

function rateRight() {
  dataLogString += "RateUp ";
  if (on && ispacerFuncOn) {
    document.getElementById('tick').play();
    if (!isPacerOn) {
      document.getElementById("BottomPaceBar").style.display = "none";
      isPacerOn = true;
      document.getElementById("PacerMenu").style.display = "block";
      document.turnPacerOff = setTimeout(function() {
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
      }, 10000);
    } else {
      clearTimeout(document.turnPacerOff);
      document.turnPacerOff = setTimeout(function() {
        document.getElementById("BottomPaceBar").style.display = "block";
        document.getElementById('PacerMenu').style.display = "none";
        isPacerOn = false;
      }, 10000);
    }

    PacerRate = parseInt(document.getElementById("PacerText2").innerHTML) + 10;
    document.getElementById("PacerText2").innerHTML = PacerRate + " PPM";
    document.getElementById("PacerText2").style.display = "block";
    document.getElementById("PacerText3").style.display = "none";
    document.getElementById("PacerText").innerHTML = "Rate";
    document.getElementById("TopRate").innerHTML = PacerRate + " PPM";
    document.getElementById("BottomRate").innerHTML = PacerRate + " PPM";
  }
}




function leadSelect() {
  dataLogString += "LeadSelect ";
  if (on) {
    document.getElementById('tick').play();
    if (isAEDOn) {
      if (isShockReady) {
        document.getElementById('ChargingBackground').style.display = "none";
        document.getElementById('ShockAdvised').style.display = "none";
        document.getElementById('shockprompt').pause();
        sound.pause();
        isCharging = false;
        isShockReady = false;
        clearInterval(document.interval);
        document.getElementById("ShockLight").style.display = "none";
        clearTimeout(document.LoadingInterval);
        clearTimeout(document.chargeTimout);
        document.getElementById('ShockMenu').style.display = "none";
        document.getElementById('EnergyLevel').style.display = "none";

        document.getElementById('AnalyzeLight2').style.display = "none";
        document.getElementById('AnalyzeLight1').style.display = "none";
      } else {
        clearTimeout(analyzeCharge);
        document.getElementById('motiondetected').pause();
        document.getElementById('ChargingBackground').style.display = "none";
        document.getElementById('ShockAdvised').style.display = "none";

        document.getElementById('20J').pause();
        isCharging = false;
        document.getElementById('200J').pause();
        document.getElementById('300J').pause();
        isAEDOn = false;

        document.getElementById('ChargingBackground').style.display = "none";
        document.getElementById('ShockAdvised').style.display = "none";
        document.getElementById('Charging').style.display = "none";
        clearTimeout(document.chargeTimout);
        clearTimeout(document.LoadingInterval);
        document.getElementById('EnergyLevel').style.display = "none";
        document.getElementById('AnalyzeLight2').style.display = "none";
        document.getElementById('AnalyzeLight1').style.display = "none";
      }
    }
    if (!isLeadSelectOn) {
      isLeadSelectOn = true;
      document.getElementById("LeadSelect").style.display = "block";
      turnLeadSelectOff = setTimeout(function() {
        document.getElementById('LeadSelect').style.display = "none";
        isLeadSelectOn = false;
      }, 5000);
    } else {
      clearTimeout(turnLeadSelectOff);
      if (leadNum < 4 && !ispacerFuncOn) {
        leadNum = leadNum + 1;
        document.getElementById("PaddlesX1").src = "assets/Lead" + (leadNum - 1) + ".png";
        leadStatus = "EKGS";
        threeEKGController();

      } else if (leadNum < 3 && ispacerFuncOn) {
        leadNum = leadNum + 1;
        document.getElementById("PaddlesX1").src = "assets/Lead" + (leadNum) + ".png";
        leadStatus = "EKGS";
        threeEKGController();
      } else {
        if (!ispacerFuncOn) {
          document.getElementById("PaddlesX1").src = "assets/PaddlesX1.png";
          leadStatus = "Paddles";
          threeEKGController();
        } else {
          document.getElementById("PaddlesX1").src = "assets/Lead1.png";
          threeEKGController();
        }
        $("#LeadSelect ul li:nth-child(" + (leadNum) + ")").css("background-color", "gray");
        leadNum = 1;
      }
      $("#LeadSelect ul li:nth-child(" + (leadNum - 1) + ")").css("background-color", "gray");
      $("#LeadSelect ul li:nth-child(" + (leadNum) + ")").css("background-color", "blue");
      turnLeadSelectOff = setTimeout(function() {
        document.getElementById('LeadSelect').style.display = "none";
        isLeadSelectOn = false;
      }, 5000);
    }
  }
}

var CPRFirstTime = true;
var CPRAfterShockFirstTime = true;

function CPRButton() {
  clearTimeout(CPRDeathTime);
  dataLogString += "CPRButton ";
  if (!isCPROn) {
    if (patientState == "VFib") {
      if (CPRFirstTime == true) {
        CPRFirstTime = false;
        TestCase2.TotalPoints += 5;
        TestCase1.TotalPoints += 15;
      }
      helpController(1);
      if (GetUrlValue('testnum') == 4) {
        TestCase1.TimeToStartCPR = Math.round((new Date() / 1000) - startTime);
      }
      if (GetUrlValue('testnum') == 5) {
        TestCase2.TimeToStartCPRAfterVFib = Math.round(((new Date() / 1000) - startTime) - TestCase2.VFibStartTime);
      }
    }
    if (patientState == "SlowRhythm") {
      if (GetUrlValue('testnum') == 6)
        errorController(0);
      else
        errorController(8);
    }
    if (patientState == "VTac") {
      if (GetUrlValue('testnum') == 6)
        errorController(0);
      else
        errorController(8);
    }
    if (patientState == "NormalVFib") {
      if (GetUrlValue('testnum') == 4) {
        clearTimeout(document.NoCPRVictory);
        TestCase1.ClickedStartCPRAfterShock = true;
        if (CPRAfterShockFirstTime == true) {
          TestCase1.TotalPoints += 10;
        }
      }
      if (GetUrlValue('testnum') == 5) {
        TestCase2.StartedCPRAfterVFibShock = true;
        if (CPRAfterShockFirstTime == true) {

          if (((Math.round((new Date() / 1000) - startTime) - TestCase2.VFibStartTime) - TestCase2.ShockAfterVFibStateTime) < 30) {
            clearTimeout(document.SecAftVFibNoCPR);
            TestCase2.TotalPoints += 10;
          }
        }
      }
      document.VFibWinTimeout = setTimeout(function() {
        if (GetUrlValue('testnum') == 4) {
          clearTimeout(MinDeathTimeout);
          TestCase1.SurvivalStateReached = true;
          $('#hidden_field').val(JSON.stringify(TestCase1));
          TestCase1.TotalCaseTime = Math.round(new Date() / 1000 - startTime);
          if (TestCase1.TotalCaseTime > 60 * 4) {
            TestCase1.CaseTimeMoreThanFourMin = true;
          }
          if (TestCase1.TotalCaseTime < 60 * 2) {
            TestCase1.CaseTimeLessThan2Min = true;
          }
          sendPostData(TestCase1);
        }
        if (GetUrlValue('testnum') == 5) {
          TestCase2.TotalCaseTime = Math.round(new Date() / 1000 - startTime);
          if (TestCase2.TotalCaseTime > 60 * 4) {
            TestCase2.CaseTimeMoreThanFourMin = true;
          }
          if (TestCase2.TotalCaseTime < 60 * 2) {
            TestCase2.CaseTimeLessThan2Min = true;
          }
          TestCase2.SurvivalStateReached = true;
          clearTimeout(MinDeathTimeout);
          $('#hidden_field').val(JSON.stringify(TestCase2));
          sendPostData(TestCase2);
        }
        if (!isTestOn) {
          document.getElementById("EndDialog").innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=2&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
          document.getElementById("PatientInfo").innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=2&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
        }
        if (isTestOn) {
          if (GetUrlValue('testnum') == 4) {
            document.getElementById("EndDialog").innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=5&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
            document.getElementById('PatientInfo').innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=5&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
          }
          if (GetUrlValue('testnum') == 5) {
            document.getElementById("EndDialog").innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=6&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
            document.getElementById('PatientInfo').innerHTML = "The patient has a pulse! He is in sinus rhythm. You have saved the patient! <a href='Tutorial.html?testnum=6&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "' >Click here to move on to the next case</a>.";
          }
        }
        $('#EndDialog').dialog({
          "width": 400,
          modal: true,
          autoOpen: true
        });
      }, 10000);
    }
    isCPROn = true;
    $('#CPRStatus').toggle()
    flashing = setInterval(function() {
      $('#CPRStatus').toggle();
    }, 400);
    document.getElementById("CPRButton").innerHTML = "Stop CPR & Clear Patient";
    document.getElementById("CPRButton").style.backgroundColor = "red";
  } else {
    if ((patientState == "VFib") && isShockReady) {
      helpController(7);
    }
    clearInterval(flashing);
    isCPROn = false;
    document.getElementById("CPRButton").innerHTML = "Start CPR";
    document.getElementById("CPRStatus").style.display = "none";
    document.getElementById("CPRButton").style.backgroundColor = "green";
    if (isAEDOn) {
      document.getElementById('AnalyzeText').innerHTML = "Analyzing Now -- Stand Clear";
      document.getElementById('motiondetected').pause();
      isAEDOn = false;
      analyze();
    }
  }
}

function sync() {
  dataLogString += "Sync ";
  if (on) {
    if (patientState == "VTac" || patientState == "Sync") {
      if (!isSyncOn) {
        helpController(208);
        isSyncOn = true;
        if (isShockReady) {
          helpController(210);
        }
        document.getElementById('SyncLight').style.display = "block";
        document.syncInterval = setInterval(function() {
          $('#SyncLight').toggle();
        }, 1200);
        patientState = "Sync";
        if (isTestOn && isLeftPadConnected && isRightPadConnected && isElectrodesConnected && leadStatus == "Paddles") {
          rhythmChange(initp, "black url('assets/SVTsync.png')");
        } else if (!isTestOn && isLeftPadConnected && isRightPadConnected && isElectrodesConnected && leadStatus == "Paddles") {
          rhythmChange(initp, "black url('assets/SyncRhythm.png')");
        }

        if (isTestOn && isLAEKGConnected && isRAEKGConnected && isLLEKGConnected && leadStatus != "Paddles") {
          rhythmChange(initp, "black url('assets/SVTsync.png')");
        } else if (!isTestOn && isLAEKGConnected && isRAEKGConnected && isLLEKGConnected && leadStatus != "Paddles") {
          rhythmChange(initp, "black url('assets/SyncRhythm.png')");
        }
      } else {
        patientState = "VTac";
        isSyncOn = false;
        clearInterval(document.syncInterval);
        document.getElementById("SyncLight").style.display = "none";

        if (isTestOn && isLeftPadConnected && isRightPadConnected && isElectrodesConnected) {
          rhythmChange(initp, "black url('assets/SVT.png')");
        }
        if (isTestOn && isLAEKGConnected && isLLEKGConnected && isRAEKGConnected) {
          rhythmChange(initp, "black url('assets/SVT.png')");
        }
        if (!isTestOn && isLAEKGConnected && isLLEKGConnected && isRAEKGConnected) {
          rhythmChange(initp, "black url('assets/vtac.png')");
        } else if (!isTestOn && isLeftPadConnected && isRightPadConnected && isElectrodesConnected) {
          rhythmChange(initp, "black url('assets/vtac.png')");
        }
      }
    }
  }
}
function ecgController() {
  if (isRightPadConnected && isLeftPadConnected && isElectrodesConnected && isTherapyCableAttached) {
    if (GetUrlValue('testnum') == 4 && TestCase1.TimeToPadsAttached < 0) {
      TestCase1.TimeToPadsAttached = Math.round((new Date() / 1000) - startTime);
    }
    if (GetUrlValue('testnum') == 5 && TestCase2.TimeToPadsAttached < 0) {
      TestCase2.TimeToPadsAttached = Math.round((new Date() / 1000) - startTime);
    }
    if (GetUrlValue('testnum') == 6 && TestCase3.TimeToPadsAttached < 0) {
      TestCase3.TimeToPadsAttached = Math.round((new Date() / 1000) - startTime);
    }
  }
  if (leadStatus == "Paddles") {
    if (isRightPadConnected && isLeftPadConnected && on && isElectrodesConnected && isTherapyCableAttached) {
      if (patientState == "VTac" && !isTestOn) {
        heartRate = 180;
        rhythmChange(initp, "black url('assets/vtac.png')");
        helpController(206);
        helpController(205);
      }
      if (patientState == "VTac" && isTestOn) {
        heartRate = 224;

        rhythmChange(initp, "black url('assets/SVT.png')");
        helpController(206);
        helpController(205);
      }
      if (patientState == "Sync" && GetUrlValue('testnum') == 5) {
        rhythmChange(initp, "black url('assets/SVTsync.png')");
      }

      if (patientState == "Sync" && GetUrlValue('testnum') == 2) {
        rhythmChange(initp, "black url('assets/SyncRhythm.png')");
      }
      if (patientState == "MouseOver") {
        heartRate = 80;
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }
      if (patientState == "VFib") {
        heartRate = 175;
        rhythmChange(initp, "black url('assets/vfib.png')");
        helpController(3);
        helpController(4);
      }
      if (patientState == "SlowRhythm") {
        heartRate = 46;
        rhythmChange(initp, "black url('assets/SlowRhythm.png')");
        helpController(104);
      }
      if (patientState == "Dead") {
        heartRate = 45;
        HRNum = 0;
        document.getElementById('HRNum').innerHTML = HRNum;
        rhythmChange(initp, "black url('assets/Deadline.png')");
        helpController(104);
      }
      document.getElementById("ConnectElectrodes").style.display = "none";
      document.getElementById("BottomBar").style.display = "none";
      document.getElementById("HRNum").style.top = "163px";
      document.getElementById("HRNum").style.top = "125px";
      document.getElementById('HRNum').innerHTML = heartRate;
      if (heartBeat == null)
        heartBeat = setInterval(heartBeatTick, (1 / (heartRate / 60)) * 1000);
      document.getElementById("ChangeRhythm").style.display = "block";
    } else if (!(isRightPadConnected && isLeftPadConnected) && on) {
      document.getElementById("Heart").style.display = "none";

      rhythmChange(initp, "black url('assets/Flatline.png')");
      document.getElementById("ChangeRhythm").style.display = "block";
      document.getElementById("HRNum").innerHTML = "---";
      document.getElementById("HRNum").style.top = "169px";
      document.getElementById("HRNum").style.top = "119px";

      clearInterval(heartBeat);
      heartBeat = null;
    } else {
      document.getElementById("Heart").style.display = "none";
      clearInterval(heartBeat);
      rhythmChange(initp, "black url('assets/Flatline.png')");
    }
  } else if (isRightPadConnected && isLeftPadConnected && on && isElectrodesConnected && isTherapyCableAttached) {
    document.getElementById("ConnectElectrodes").style.display = "none";
    document.getElementById("BottomBar").style.display = "none";
  }
}

function threeEKGController() {
  var ekgson = isLLEKGConnected && isRAEKGConnected && isLAEKGConnected && isECGStumpAttached;
  if (ekgson) {
    document.getElementById('EKGBox').style.display = "none";
    document.getElementById('EKGBoxText').style.display = "none";
    if (GetUrlValue('testnum') == 6) {
      TestCase3.ECGLeadsPlaced = true;
      TestCase3.TimeToECGLeadsPlaced = Math.round((new Date() / 1000) - startTime);
    }
  }
  if (ispacerFuncOn && patientState == "SlowRhythm" && isLLEKGConnected && isLAEKGConnected && isRAEKGConnected && isECGStumpAttached) {
    helpController(110)
    if (PacerCurrent == 30) {
      rhythmChange(initp, "black url('assets/30mAPace.png')");
      return;
    }
    if (PacerCurrent >= 40) {
      rhythmChange(initp, "black url('assets/40mAPace.png')");
      return;
    }
    if (PacerCurrent >= 50) {
      rhythmChange(initp, "black url('assets/50mAPace.png')");
      return;
    }
    if (PacerCurrent >= 60) {
      rhythmChange(initp, "black url('assets/60mAPace.png')");
      return;
    }
    if (PacerCurrent >= 70) {
      rhythmChange(initp, "black url('assets/70mAPace.png')");
      return;
    }
    if (PacerCurrent >= 80) {
      rhythmChange(initp, "black url('assets/PaceRightRhythm.png')");
      patientState = "GoodWithPace";
      helpController(113);
      return;
    }
  }
  if (leadStatus != "Paddles") {
    if (ekgson) {
      if (patientState == "VTac" && !isTestOn) {
        rhythmChange(initp, "black url('assets/vtac.png')");
      }
      if (patientState == "VTac" && isTestOn) {
        heartRate = 224;
        rhythmChange(initp, "black url('assets/SVT.png')");
        document.getElementById('HRNum').innerHTML = heartRate;
      }

      if (patientState == "MouseOver") {
        heartRate = 80;
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }
      if (patientState == "VFib") {
        rhythmChange(initp, "black url('assets/vfib.png')");
      }
      if (patientState == "SlowRhythm") {
        if (ispacerFuncOn) {
          rhythmChange(initp, "black url('assets/" + (leadNum) + ".png')");
        } else {
          rhythmChange(initp, "black url('assets/" + (leadNum - 1) + ".png')");
        }
      }
    } else {
      rhythmChange(initp, "black url('assets/Flatline.png')")
    }
  } else {
    if (isRightPadConnected && isLeftPadConnected && on && isElectrodesConnected) {
      if (patientState == "MouseOver") {
        heartRate = 80;
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }

      if (patientState == "VTac" && !isTestOn) {
        heartRate = 180;
        rhythmChange(initp, "black url('assets/vtac.png')");
      }
      if (patientState == "VTac" && isTestOn) {
        heartRate = 220;
        rhythmChange(initp, "black url('assets/SVT.png')");
      }
      if (patientState == "NormalVFib") {
        heartRate = 180;
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }
      if (patientState == "VFib") {
        heartRate = 175;
        rhythmChange(initp, "black url('assets/vfib.png')");
      }

      if (patientState == "MouseOver") {
        heartRate = 175;
        rhythmChange(initp, "black url('assets/NormalRate.png')");
      }
      if (patientState == "SlowRhythm") {
        heartRate = 46;
        rhythmChange(initp, "black url('assets/SlowRhythm.png')");

        if (ekgson) {
          if (patientState == "SlowRhythm") {
            helpController(105);
            helpController(106);
          }
        }
      }
    } else {
      rhythmChange(initp, "black url('assets/Flatline.png')");
    }
  }
}

function helpController(helpState) {
  if (!isTestOn && GetUrlValue('testnum') != 0) {
    var status;
    var status2;
    var status3;

    switch (helpState) {
      case 0:
        status = "First assess the patient's condition by clicking 'Assess'.";
        break;
      case 1:
        status = "Next you will need to connect the patient to the defibrillator to display and assess the cardiac rhythm. <br><br>Turn on the machine by pushing the \"ON\" button.";
        break;
      case 2:
        status = "The patient is not breathing and has no pulse. The most important thing to do first is to initiate CPR immediately!<br><br> Use your mouse or touchpad to press \"Start CPR\"";
        break;
      case 3:
        status = "Use your mouse to drag away the black test plug and expose the grey adapter on the therapy cable."
        break;
      case 32:
        status = "The machine prompts you to \"Connect Electrodes\". The therapy pads are the electrodes. <br><br>Use your mouse to connect the grey adapter on the therapy cable to the grey adapter on the defibrillator pads. Move the pads into proper position on the patient. The white pad goes on the patient's upper right chest and the \"heart\" pad should be positioned just lateral to the apex of the patient's heart.";
        break;
      case 33:
        status = "The machine will prompt you to \"Connect Electrodes\". The therapy pads are the electrodes. Move the pads into proper position on the patient.  The white pad goes on the patient's upper right chest and the \"heart\" pad should be positioned just lateral to the apex of the patient's heart. ";
        break;
      case 4:
        status = "Look carefully at the rhythm. There are no definable QRS complexes. This disorganized electrical activity is characteristic of ventricular fibrillation. You will need to defibrillate. <br><br>First you will need to push \"Energy Select\" and use the arrows to select the appropriate energy dose. The minimum dose for the first shock in an adult is 200J.";
        break;
      case 5:
        status = "You are now ready to hit the CHARGE button. Notice that the audible tone is much more prolonged when the machine charges to larger energy doses.";
        break;
      case 6:
        status = "Using your mouse or touchpad, click \"Stop CPR\". Be sure you clear staff from the patient before you shock!";
      case 7:
        status = "Click STOP CPR and press the shock button. <br><br>Once you select the energy dose and prepare the machine to shock, you must deliver the shock within 60 seconds or the stored energy will be removed by the machine. If this happens you will need to redose, recharge, and try again.";
        break;
      case 8:
        status = "Restart CPR immediately! Using your mouse or touchpad, click \"Start CPR\". Continue CPR for 2 minutes before assessing the rhythm and determining whether the patient has regained a pulse.";
        break;
      case 9:
        status = "Great job!  You successfully defibrillated the patient. Try another case.";
        break;
      case 10:
        status = "You have entered AED mode. The \"ANALYZE\" button should light up, and the machine will begin to issue audible prompts. Continuing CPR may interfere with the machine's ability to interpret the rhythm.<br><br> Click \"Stop CPR\" and allow the machine to analyze the rhythm.";
        break;
      case 11:
        status = "The machine will charge to 200J. CLEAR the staff before pressing the shock button (indicate a picture of the shock button or point to it}";
        break;
      case 12:
        status = "Continue CPR before reassessing for a pulse.";
        break;
      case 100:
        status = "First, assess the patient's condition by clicking the \"Assess Patient\" button.";
        break;
      case 101:
        status = "The patient is breathing and has a  pulse.  However, the heart rate is not high enough to sustain an adequate blood pressure. When medications fail to stabilize symptomatic bradycardia, temporary transcutaneous pacing is indicated. This case will teach you how to perform transcutaneous pacing.<br><br> Turn on the defibrillator  by pushing the \"ON\" button, and prepare to pace the patient's rhythm. ";
        break;
      case 102:
        status = "Next you will need to connect the patient to the defibrillator to display and assess the cardiac rhythm. The \"ON\" button's green light should be visible if the machine is on. <br><br>Use your mouse to drag away the black test plug and expose the grey adapter on the therapy cable.";
        break;
      case 103:
        break;
      case 104:
        status = "For optimal pacing, the Lifepak's own ECG leads must be connected to the patient, because the Quik-Combo therapy pads (aka \"electrodes\") cannot monitor the patient's rhythm and deliver pacing current at the same time.<br><br> Verify the ECG leads are attached to the patient. Then press the PACER button on the defibrillator console.";
        break;
      case 105:
        status = "Once the ECG leads are attached, you can have the machine read the rhythm from Lead I, II, or III by pressing the \"LEAD\" button to select the desired lead. If the ECG leads are not attached, selecting Lead I, II, or III will not show the heart rhythm but instead will display a dashed line. <br><br> Now, use your mouse to press the PACER button";
        break;
      case 106:
        status2 = " Note that the PR interval is prolonged, which can be caused by increased vagal tone in otherwise healthy children. In this case, it reflects drug toxicity. The rhythm is sinus bradycardia with 1st degree AV block. Using your mouse or touchpad, push the \"PACER\" button. The button's green light should go on. ";
        break;
      case 107:
        status = "The pacer button's green light should be on. Notice that the patient's rhythm disapperars and dashed lines appear. This is because you indicated to the machine that you wish to pace, and the Quik-Combo pads cannot read the patient's rhythm and deliver pacing at the same time.<br><br> To see the rhythm displayed again, connect the Lifepak's ECG leads to the patient.";
        break;
      case 110:
        status = "The pacer button's green light should be on. Notice:<br>1) The machine is now automatically reading the rhythm from Lead II . This is because the pads cannot read the patient's rhythm and pace at the same time.<br> 2) A triangle \"sense\" marker appears near the middle of each QRS complex 3) Vertical pacing spikes appear at the default rate of 100/min, which is appropriate for most age groups. <br><br>Now press CURRENT, using the up arrow to increase current until a QRS complex follows each pacing spike.";
        break;
      case 111:
        break;
      case 112:
        status = "A heart rate of 100/min is appropriate for most age groups. The monitor should display vertical pacing spikes occuring at a rate of 100 beats/minute. <br><br>Next, press \"CURRENT\". Using the up arrows, increase the current until the monitor shows that a QRS complex immediately follows EVERY vertical pacer spike.This is called \"mechanical capture\".  Using the down arrows, adjust the current so that you are using the minimum current that will produce a QRS complex immediately following EVERY vertical pacer spike.";
        break;
      case 113:
        status = "Notice that a wide QRS complex now follows each vertical pacing spike. This is called \"mechanical capture\". <br><br>Now use your mouse or touchpad to click on the \"Assess\" button to verify the patient has a pulse at the desired rate (100 beats/min). If you press and hold the \"PAUSE\" button, you can check the patient's underlying rhythm. ";
        break;
      case 114:
        status = "Pressing the \"PAUSE\" button allows you to check the patient's underlying rhythm. When the \"PAUSE\" button is held, the Lifepak paces at 25% of the set rate (in this case, 0.25 x 100 = 25 BPM). Because we are pacing in \"demand\" mode, and the patient's underlying rate is > 25, there is no demand for pacing and you will not see any vertical pacing spikes. ";
        break;
      case 115:
        status = "You have entered AED mode. You cannot pace in AED mode. Press \"Energy Select\" or \"LEAD\" to return to manual mode, and  then select the \"PACER\" button. ";
        break;
      case 200:
        status = "First assess the patient's condition by clicking \"Assess\".";
        break;
      case 201:
        status = "The patient is breathing and has a pulse. Next you will need to connect the patient to the defibrillator to display and assess the cardiac rhythm.<br><br> Turn on the machine by pushing the \"ON\" button";
        break;
      case 202:
        status = "The \"ON\" button's green light should be visible.<br><br> Use your mouse to drag away the black test plug and expose the grey adapter on the therapy cable. "
      case 203:
        break;
      case 204:
        break;
      case 205:
        break;
      case 206:
        status = "Assess the rhythm. Note that the QRS complexes are fast, wide, and regular. QRS morphologies are identical and P waves are not identifiable, suggesting \"monomorphic\" ventricular tachycardia. The patient has a pulse, so this is is \"Ventricular tachycardia with a pulse\". Synchronized cardioversion is indicated.<br><br> First you will need to push \"Energy Select\" and use the arrows to select 0.5-2 Joules per kilogram body weight. "
        break;
      case 207:
        status = "Now, you will need to prepare the machine to deliver a shock ONLY on a QRS complex. If the shock is not synchronized to the QRS complex , this could trigger ventricular fibrillation. <br><br>Hit the \"SYNC\" button, located under the shock button on the console. ";
        break;
      case 208:
        status = "The \"SYNC\" button's green light should be visible, and green arrows should project over each QRS complex.<br><br> You are now ready to hit the CHARGE button. "
        break;
      case 209:
        status = "Double check the \"SYNC\" button is engaged, the green arrows display over each QRS complex, and the selected energy dose is correct for cardioversion (0.5-2 Joules/kg). CLEAR staff from the patient before you shock!";
        break;
      case 210:
        status = "When charging is complete, press and HOLD the shock button.<br><br> When you are performing synchronized cardioversion, you must HOLD the shock button until the next QRS complex occurs, or the shock will not be delivered.";
        break;
      case 211:
        status = "Good job!  You successfully cardioverted the patient. You are ready to try another case. ";
        break;
      case 212:
        status = "You have entered AED mode. The Lifepak's default energy dose in AED mode is 200J, which is excessive for an infant. Press \"Energy Select\" or \"LEAD\" to return to manual mode, and enter the appropriate energy dose for cardioversion (0.5-2 Joules/kg). ";
        break;
      case 213:
        status = "Now reassess your patient. Click \"ASSESS PATIENT\".";
        break;
    }
    if (status != null)
      document.getElementById("HelpInfo").innerHTML = status;
    if (status2 != undefined) {
      document.getElementById("HelpDialog2").innerHTML = status2;
    }
  }
}

function errorController(errornum) {
  switch (errornum) {
    case -1:
      errorstatus = "Please assess the patient to determine what to do to finish the case.";
      break;
    case 1:
      errorstatus = "The patient is breathing and has a pulse. Press STOP CPR";
      break;
    case 2:
      errorstatus = "You must stop CPR before administering the shock";
      break;
    case 3:
      errorstatus = "You have entered AED mode. You cannot pace in AED mode. Press \"Energy Select\" or \"LEAD\" to return to manual mode, and  then select the \"PACER\" button. ";
      break;
    case 4:
      errorstatus = " You have entered AED mode. The Lifepak's default energy dose in AED mode is 200J, which is excessive for an infant. Press \"Energy Select\" or \"LEAD\" to return to manual mode, and enter the appropriate energy dose for cardioversion (0.5-2 Joules/kg). ";
      break;
    case 5:
      errorstatus = "Therapy Cable disengaged from port:  Reattach therapy cable to the defibrillator";
      break;
    case 6:
      errorstatus = "ECG cable disengaged from port:  Reattach ECG cable to the defibrillator";
      break;
    case 7:
      errorstatus = "This is VTach with a pulse. Synchronized cardioversion is indicated. To cardiovert this patient, you must press SYNC before delivering the shock";
      break;
    case 8:
      errorstatus = "The patient has a pulse and is crying with your compressions. Press Stop CPR.";
    case 0:
      errorstatus = "The patient has a pulse and is crying out with your compressions. Press Stop CPR.";
      break;
    case 9:
      errorstatus = "This rhythm calls for synchronized cardioversion. The suggested energy dose is 0.5-2 joules/kg of body weight.";
      break;
    case 10:
      errorstatus = "Unfortunately the baby has died. You will need to speak with the family. Please review VF management and repeat the VF cases on the simulator another time. <a href=\"Tutorial.html?testnum=5&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "\"> Click here to advance to the next test case.</a>";
      break;
    case 11:
      errorstatus = "Unfortunately, the baby has died. You will need to speak with the family. Please review SVT management and repeat the case on the simulator another time. <a href=\"Tutorial.html?testnum=6&sess=" + DefibSession.Id + "&user=" + DefibSession.UserId + "\"> Click here to advance to the next test case.</a>";
      break;
    case 12:
      errorstatus = "Unfortunately your patient has died. You will need to speak with the family. Please review how to performa transcutaneous pacing and try this case again another time. You have now completed all the test cases on this simulator.";
      break;
    case 13:
      errorstatus = "Unfortunately, your patient has died. You needed to offer therapy sooner. <a href='javascript:history.go(0)'>Please study cardiac rhythm management and try this case again.</a>";
  }
  if (errornum < 10) {
    $('#ErrorDialog').dialog({
      modal: true,
      dialogClass: "errorDialog"
    });
  } else {
    $("#ErrorDialog").dialog({
      closeOnEscape: false,
      modal: true,
      dialogClass: "errorDialog"
    });
    $('.ui-dialog-titlebar-close').hide();
  }
  document.getElementById("ErrorDialog").innerHTML = errorstatus
  document.getElementById('error').play();
}