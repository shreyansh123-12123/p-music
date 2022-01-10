song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0; 
scoreRightwrist=0;
song2="";

function setup(){
    canvas=createCanvas(600,400);
    canvas.position(300,300)
    video=createCapture(VIDEO);
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("model Loaded");
}
function draw(){
    image(video,0,0,600,400);
    fill("#ffff00");
    stroke("#ffff00");

    if(scoreRightwrist>0.2){
    circle(rightWristX,rightWristY,15);
    inNumberLeftWristY=Number(leftWristY);
    removeDecimals=floor(inNumberLeftWristY);
    song.play();
    song.rate(1);
    song.volume(0.5);
    song2.stop();

    
    }
    if(scoreleftwrist>0.2){
        circle(leftWristX,leftWristY,15);
        inNumberLeftWristY=Number(leftWristY);
        removeDecimals=floor(inNumberLeftWristY);
        song2.play();
        song2.rate(1);
        song2.volume(0.5);
        song.stop();
        
        }
}
function preload(){
    song= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}


function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("score of left wrist = " + scoreleftwrist);
        scoreRightwrist=results[0].pose.keypoints[10].score;
        console.log("score of right wrist = " + scoreRightwrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristx = " + leftWristX + "leftWristy = " + leftWristY );
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristx = " + leftWristX + "rightWristy = " + rightWristY);
        
    }
}
