/*
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
*/
var prev;
var z = 0;
var input1 = document.getElementsByTagName("BODY")[0];

input1.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
	 event.preventDefault();
	 document.getElementById("eq").click();
	}
});

function type(i) {
  if (z == "1") {
    clr();
    z--;
  }
prev = document.getElementById("result").value;
  if (prev.charAt(prev.length-1) == ')') {
	document.getElementById("result").value = prev + '*' + i;
	} else {
		document.getElementById("result").value = prev + i;
		}
  miniresult();
}

function restrict() {
prev = document.getElementById("result").value;
  for (i=0; i<prev.length; i++) {
	if ('0123456789*^./+-%()'.indexOf(prev.charAt(i)) == -1) {
		document.getElementById("result").value = prev.slice(0,i) + prev.slice(i+1);
	}
  }
}

function miniresult() {
  prev = document.getElementById("result").value;
  if ('0123456789'.indexOf(prev.charAt(prev.length-1)) !== -1 && prev !== "") {
	document.getElementById("miniresult").value = addCommas(evalRPN(toRPN(arrEq(addBrackets(reSign(removeCommas(prev)))))));
  	} else if (prev == "") {
		document.getElementById("miniresult").value = "";
		}
  if (prev == "88") {
		document.getElementById("miniresult").value = "Two Fat Ladies";
		}
  if (prev == "11") {
		document.getElementById("miniresult").value = "Legs Eleven";
		}
  if (prev == "66") {
		document.getElementById("miniresult").value = "66 Clickety-click";
		}
  if (prev == "22") {
		document.getElementById("miniresult").value = "Two Little Ducks";
		}
}

function typad(i) {
  if (z == "1") {z--;}
prev = document.getElementById("result").value;
var a = prev.charAt(prev.length-1);
var b = prev.charAt(prev.length-2);

if ((b == "(" || prev.length == 1) && (a=="+" || a == "-")) {
	document.getElementById("result").value = prev.slice(0,-1) + i;
	} else if ((a=='+' || a=='-' || a=='*' || a=='/')){
		document.getElementById("result").value = prev.slice(0,-1) + i;
		} else if (prev == "" || a == "(") {
			document.getElementById("result").value = prev + i;
			} else {
				document.getElementById("result").value = prev + i;
				}
}

function typti(i) {
  if (z == "1") {z--;}
prev = document.getElementById("result").value;
var a = prev.charAt(prev.length-1);
var b = prev.charAt(prev.length-2);

if ((a == '*' || a == '/')) {
	document.getElementById("result").value = prev.slice(0,-1) + i;
	} else if ((a == '+' || a == '-') && (prev.length !== 1) && (b !== '(')){
		document.getElementById("result").value = prev.slice(0,-1) + i;
		} else if (prev !== '' && a !== '(' && a !== '+' && a !== '-') {
			document.getElementById("result").value = prev + i;
			}
}

function dot(i) {
  if (z == "1") {clr(); z--;}
prev = document.getElementById("result").value;
var check = prev.split(/[+\-*/]+/);
var checki = check[check.length - 1];
  for (j=0; j < checki.length; j++) {
	if (checki.charAt(j) == '.') {
		i = "";
		}
	}
document.getElementById("result").value = prev + i;
}

function neg(i) {
prev = document.getElementById("result").value;
  if (prev.charAt(0) == "-") {
	document.getElementById("result").value = prev.slice(1,prev.length);
	} else {
		document.getElementById("result").value = i + prev;
		}
}

function bracket() {
  if (z == "1") {z--;}
prev = document.getElementById("result").value;
var a = prev.charAt(prev.length-1);
var n = 0;
if (prev == "" || a == '(') {
 document.getElementById("result").value = prev + '(';
	} else {
	  for (i=0; i < prev.length; i++) {
		if (prev.charAt(i) == '(') {
			n++;
			} else if (prev.charAt(i) == ')') {
				n--;
				}
	  }
  if (a == "+" || a == "-" || a == "/" || a == "*") {
		document.getElementById("result").value = prev + '(';
		} else {
			  if (n == 0) {
				document.getElementById("result").value = prev + '*(';
			} else if (n >= 1) {
			document.getElementById("result").value = prev + ')';
			}
		}
	}
}

function bcksp() {
  prev = document.getElementById("result").value;
  document.getElementById("result").value = prev.slice(0,-1);
  miniresult();
}
function clr() {
  document.getElementById("result").value = "";
  document.getElementById("miniresult").value = "";
}
function supval1() {
  var ans = document.getElementById("miniresult").value;
  document.getElementById("btn").focus();
  document.getElementById("result").value = ans;
//show result after animation/transition complete
//clear miniresult and return to initial position
  z = 1;
}
function supval() {
var str = document.getElementById("result").value;
//addBrackets
//ArrayifyEq
//toRPN
//evalRPN
//addCommas
//display
document.getElementById("result").value = addCommas(evalRPN(toRPN(arrEq(addBrackets(reSign(removeCommas(str)))))));
}

function removeCommas(xStr) {
  for (i=0; i<xStr.length; i++)
	if (xStr.charAt(i) == ',') {
		xStr = xStr.slice(0,i) + xStr.slice(i+1,xStr.length);
		i--;
		} else {}
  return xStr;
}

function reSign(zStr) {
	if (zStr.charAt(0) == '+') {
		zStr = zStr.slice(1,zStr.length);
		} else if (zStr.charAt(0) == '-') {
			zStr = '0' + zStr;
			}
  return zStr;
}

function addBrackets(aStr) {
  var n = 0;
  for (i = 0; i < aStr.length; i++) {
	if (aStr.charAt(i) == '(') {
		n++;
		} else if (aStr.charAt(i) == ')') {
			n--;
			}
  }
  for (i = 0; i < n; i++) {
	aStr += ')';
  }
  return aStr;
}

function toRPN(aArr) {
//aArr is the infix-equation in Array form
  var nArr = [];
  var opStack = [];
  var c;
  var o;
  var ops = {
		"^": {
		    lvl: 4,
		    assoc: 'Right'
		},
		"/": {
		    lvl: 3,
		    assoc: 'Left'
		},
		"*": {
		    lvl: 3,
		    assoc: 'Left'
		},
		"+": {
		    lvl: 2,
		    assoc: 'Left'
		},
		"-": {
		    lvl: 2,
		    assoc: 'Left'
		}
	}

String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
}

  for (i = 0; i < aArr.length; i++) {
  c = aArr[i];
  o = opStack[opStack.length-1];

	if (c.isNumeric()) {
		nArr.push(c);

	} else if ('^/*+-'.indexOf(c) !== -1) {
		while (('^/*+-'.indexOf(o) !== -1)
			&& ((ops[c].lvl < ops[o].lvl)
			   || (ops[c].lvl == ops[o].lvl && ops[c].assoc == 'Left'))
			&& (c !== '(')) {
					nArr.push(opStack.pop());
					o = opStack[opStack.length-1];
					}
					opStack.push(c);
	} else if (c == '(') {
		opStack.push(c);

	} else if (c == ')') {
			while (o !== '(') {
				nArr.push(opStack.pop());
				o = opStack[opStack.length-1];
				}
				opStack.pop();
			}
  }
  while (opStack.length > 0) {
	nArr.push(opStack.pop());
  }
  return nArr;
}

function evalRPN(bArr) {
  var resultStack = [];
  var d;

  for (i=0; i < bArr.length; i++) {
    d = bArr[i];
	if ('+-*/^'.indexOf(d) == -1) {
	resultStack.push(d);
	} else if (d === '+') {
		resultStack.push(resultStack.pop()*1 + resultStack.pop()*1);
	} else if (d === '-') {
		resultStack.push( - resultStack.pop() + resultStack.pop()*1);
	} else if (d === '*') {
		resultStack.push(resultStack.pop() * resultStack.pop());
	} else if (d === '/') {
		resultStack.push( 1 / resultStack.pop() * resultStack.pop());
	} else if (d === '^') {
		resultStack.push(Math.pow(resultStack.pop(), resultStack.pop()));
	}
  }
  if(resultStack.length > 1) {
	return "error";
	} else {
		return resultStack.pop();
		}
}

function addCommas(dStr) {
  dStr += '';
  var x = dStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
  x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function arrEq(bStr) {
  var nStr;
  var ops = ['+', '-', '*', '/', '(', ')', '%'];
  var reg;
  for (i=0; i < ops.length; i++) {
	reg = new RegExp('[' + ops[i] + ']','g');
	bStr = bStr.replace(reg, ',' + ops[i] + ',');
  }
  nStr = bStr.split(',');
  return nStr.filter(RemoveSpace);
	function RemoveSpace(z) {
	  return z != "";
	}
}