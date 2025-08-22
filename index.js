var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
var buttonColors=["green","red","yellow","blue"];
$("body").keydown(function(){
    if(!started){
        sequence();
        started=true;
    }
})
function sequence(){
    userClickedPattern=[];
    var randomno=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomno];
    gamePattern.push(randomChosenColor);
    animatePress(randomChosenColor);
    playsound(randomChosenColor);

    level++;
    $("#level-title").text("Level "+level);
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playsound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
})
function playsound(name){
    var audi=new Audio("./sounds/"+name+".mp3");
        audi.play();
}
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100)
}
function gameOver(){
    playsound("wrong");
    $("h1").text("Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");   
    },200);
    started=false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                sequence();
            },1000);
        }
    }
    else{
        gameOver();
    }
}