
// day and night mode features
$('.night').click(function(){
   $(".container").addClass("dark-container");
   $(".day-night").addClass("btn-dark");
   $(".day").addClass("dark");
   $(".night").addClass("dark");
   $(".light").addClass("dark");
   $(".btns").addClass("btn-dark");
});

$('.day').click(function(){
   $(".container").removeClass("dark-container");
   $(".day-night").removeClass("btn-dark");
   $(".day").removeClass("dark");
   $(".night").removeClass("dark");
   $(".light").removeClass("dark");
   $(".btns").removeClass("btn-dark");
});

var num = [];

// all the calculation is get in this calculate array
var calculate = [];

//check if the number is floating number
function isFloat(n){
    return Math.round(n) != n;
}

// calculation function done all the calculation
function calculation(num1, num2, opp){
    num1 = Number(num1);
    num2 = Number(num2);

    if(opp == "+")
        return num1 + num2;
    else if(opp == "-")
        return num1 - num2;
    else if(opp == "x")
        return num1 * num2;
    else if(opp == "/"){
        if(num1 == 0 && num2 == 0)
            return "Result is undefined";
        else 
            return num1 / num2;
    }
    else 
        return "wrong input";
}

$(".num").click(function(){
    assignNumber($(this).text());

    //if the input is a number animate the button.
    if(!isNaN($(this).text())){
        buttonAnimation($(this).text());
    }
});

var count = 0;
var result = "";
$(".opp").click(function(){
    assignOpp($(this).text());
    addOpperatorButtonAnimation($(this).text());
});

$(".equal").click(function(){
    equal();
});

$(".clear").click(function(){
    num = [];
    $(".number").text("0");
});

$(".clearAll").click(function(){
    num = [];
    $(".number").text("0");
    calculate = [];
    $(".prev-calc").html("");
});

$(".delete").click(function(){
    num.pop();
    
    $(".number").text(Number(arrayToString(num)).toLocaleString('en-US', {maximumFractionDigits:10}));

    if(num.length == 0)
        $(".number").text("0");
});

function arrayToString(arr){
    var temp = "";
    for(var i=0; i<arr.length; i++)
        temp += arr[i];
    return temp;
}

// make the number positive or negative
$(".pos-neg").click(function(){
    var temp = "";
    if(num.length == 0){
        var check = $(".number").text();
        if(check[0] != "-"){
            $(".number").text("-" + check);
        }else{
            var nonNegativeNum = "";
            for(var i=0; i<check.length - 1; i++){
                nonNegativeNum += check[i+1];
            }
            $(".number").text(nonNegativeNum);
        }
    }else{
        if(num[0][0] != "-"){
            temp = arrayToString(num);
            num = [];
            num.push("-");
            for(var i=0; i<temp.length; i++){
                num[i + 1] = temp[i];
            }
            $(".number").text("-" + temp);
        }else{
            temp = arrayToString(num);

            num = [];
            for(var i=0; i<temp.length - 1; i++){
                num[i] = temp[i + 1];
            }
            temp = arrayToString(num);
            $(".number").text(temp);
        }    
    }
});

// take number from the keyboard
document.addEventListener("keypress", function(e){
    if(!isNaN(e.key)){
        assignNumber(e.key);
        buttonAnimation(e.key);
    }
    if(e.key == "+"){
        assignOpp(e.key);
        buttonAnimation("addition");
    }
    else if(e.key == "-"){
        assignOpp(e.key);
        buttonAnimation("substraction");
    }
    else if(e.key == "/"){
        assignOpp(e.key);
        buttonAnimation("division");
    }
    else if(e.key == "*"){
        assignOpp("x");
        buttonAnimation("multiplication");
    }else if(e.key == "."){
        assignNumber(".");
        buttonAnimation("dote");
    }else if(e.key == "="){
        equal();
        buttonAnimation("equal");
    }else if(e.key == "Enter"){
        equal();
        buttonAnimation("equal");
    }
});

// take a number and push to the calculate array
function assignNumber(inputNumber){
    if(num.length == 0 && inputNumber == "."){
        num.push("0");
    }

    if(num[num.length - 1] == result){
        num.pop();
    }
    var computeNumber = "";
    var temp = "";
    temp = arrayToString(num);

    if(num.length < 16){
        if(!isFloat(temp) && inputNumber == ".")
            num.push(inputNumber);

        else if(inputNumber != ".")
            num.push(inputNumber);
    }
    

    for(var i=0; i<num.length; i++){
        computeNumber += num[i];
    }

    var formatedComputeNumber = Number(computeNumber).toLocaleString('en-US', {maximumFractionDigits:10});

    if(inputNumber == "." && !isFloat(computeNumber))
        $(".number").text(formatedComputeNumber + ".");
    else 
        $(".number").text(formatedComputeNumber);
}


// calculate all the number in the calculate array when the opperator buttons are clicked.
function calculateWhenOppclicked(inputOpp){
    var temp = "";
    var formatedComputeNumber = 0;
    if(num[num.length - 1] == "."){
        num.pop();
        temp = arrayToString(num);
        formatedComputeNumber = Number(temp).toLocaleString('en-US', {maximumFractionDigits:10});
        $(".number").text(formatedComputeNumber);
        temp = ""
    }
    temp = arrayToString(num);
    if(equalBtnCounter == 0 && calculate.length != 0)
        calculate.push(temp);
    if(calculate.length == 0){
        if($(".number").text() == "0")
            calculate.push($('.number').text());
        else
            calculate.push(temp);
    }
        calculate.push(inputOpp);
    var html = "";
    for(var i = 0; i < calculate.length; i=i+2){
        html +=" <span>" + calculate[i] + "</span>  <span class='red'>" + calculate[i + 1] + "</span>";
    }
    $(".prev-calc").html(html);
    if(calculate.length > 3){
        if(count == 0){
            result = calculation(calculate[calculate.length - 4], calculate[calculate.length - 2], calculate[calculate.length - 3]);
            count++;
        }
        else {
            result = calculation(result, temp, inputOpp);
        }
        formatedComputeNumber = Number(result).toLocaleString('en-US', {maximumFractionDigits:10});
        $(".number").text(formatedComputeNumber);
    }
    num = [];
    equalBtnCounter = 0;
}

var equalBtnCounter = 0;

// calculate all the number in the calculate array when the equal button is clicked.
function equal(){
    var formatedComputeNumber = 0;
    if(calculate.length == 2){
        var temp = "";
        var numTwo = $(".number").text();
        for(var i=0; i < numTwo.length; i++){
            if(numTwo[i] == ",")
                continue;
            else
                temp += numTwo[i];
        }
        result = calculation(calculate[calculate.length - 2], temp, calculate[calculate.length - 1]);
        formatedComputeNumber = Number(result).toLocaleString('en-US', {maximumFractionDigits:10});
        if(result == "Result is undefined")
            $(".number").text(result);
        else
            $(".number").text(formatedComputeNumber);
        $(".prev-calc").html("");
    }else{
        temp = ""
        numTwo = $(".number").text();
        for(var i=0; i < numTwo.length; i++){
            if(numTwo[i] == ",")
                continue;
            else
                temp += numTwo[i];
        }
        result = calculation(result, temp, calculate[calculate.length - 1]);
        if(result != "wrong input"){
            var formatedComputeNumber = Number(result).toLocaleString('en-US', {maximumFractionDigits:10});
            $(".number").text(formatedComputeNumber);
            $(".prev-calc").html("");
        }
        var inputNum = $(".number").text();
        temp =  "";
        if(inputNum.slice(inputNum.length - 1, inputNum.length) == "."){
            for(var i = 0; i < inputNum.length - 1; i++){
                temp += inputNum[i];
            }
            var formatedComputeNumber = Number(temp).toLocaleString('en-US', {maximumFractionDigits:10});
            $(".number").text(formatedComputeNumber);
        }
    }
    calculate = [];
    num = [];
    result = result.toString();
    for(var i=0; i < result.length; i++){
        num[i] = result[i];
    }
       
    if(result == "wrong input")
        num = [];
        
    equalBtnCounter = 1;
}

// take an operator and assign to the calculate array
function assignOpp(opperator){
    if(num.length != 0)
        calculateWhenOppclicked(opperator);
    else{
        calculate.pop();
        if(calculate.length == 0){
            calculate.push($(".number").text());
        }
        calculate.push(opperator);
        var html = "";
        for(var i = 0; i < calculate.length; i=i+2){
            html +=" <span>" + calculate[i] + "</span>  <span class='red'>" + calculate[i + 1] + "</span>";
        }
        $(".prev-calc").html(html);
    }
}

// button animation
function buttonAnimation(key){
    $("." + key).addClass("pressed");
    setTimeout(function(){$("." + key).removeClass("pressed");}, 100);
}

function addOpperatorButtonAnimation(opperator){
    if(opperator == "+")
        buttonAnimation("addition");
    else if(opperator == "-")
        buttonAnimation("substraction");
    else if(opperator == "/")
        buttonAnimation("division");
    else if(opperator == "*")
        buttonAnimation("multiplication");
    else if(opperator == ".")
        buttonAnimation("dote");
    else if(opperator == "=")
        buttonAnimation("equal");
}