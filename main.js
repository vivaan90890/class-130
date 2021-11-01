song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function modelLoaded(){
console.log("poseNet model is intialised");
}
function gotPoses(results){
if(results.length>0){
console.log(results);
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
console.log(scoreLeftWrist+"score of the left wrist"+scoreRightWrist+"score of the right wrist");
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
console.log("leftWrist="+leftWristX+"leftWristY="+leftWristY);
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("rightWrist="+rightWristX+"rightWristY="+rightWristY);
}
}
function draw(){
image(video,0,0,600,500);
fill("red");
stroke("black");
if(scoreLeftWrist>0.2){
circle(leftWristX,leftWristY,20);
number=Number(leftWristY);
remover_deciamal=floor(number);
volume=remover_deciamal/500;
document.getElementById("volume").innerHTML="volume ="+volume;
song.setVolume(volume);
}
if(scoreRightWrist>0.2){
circle(rightWristX,rightWristY,20);
if(rightWristY >0 && rightWristY <=100){
document.getElementById("speed").innerHTML="speed = 0.5";
song.rate(0.5);
}
if(rightWristY >100 && rightWristY <=200){
    document.getElementById("speed").innerHTML="speed = 1";
    song.rate(1);
    }
    if(rightWristY >200 && rightWristY <=300){
        document.getElementById("speed").innerHTML="speed = 1.5";
        song.rate(1.5);
        }
        if(rightWristY >300 && rightWristY <=400){
            document.getElementById("speed").innerHTML="speed = 2";
            song.rate(2);
            }
            if(rightWristY >400 && rightWristY <=500){
                document.getElementById("speed").innerHTML="speed = 2.5";
                song.rate(2.5);
                }
}

}
function play(){
song.setVolume(1);
song.rate(1);
song.play();
}