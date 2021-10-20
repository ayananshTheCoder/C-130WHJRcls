song = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

function preload()
{
    song = loadSound('music.mp3');
}

function setup()
{
    canvas = createCanvas(300, 200);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length < 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('leftWristX = ' + leftWristX + '; leftWristY = ' + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('rightWristX = ' + leftWritstX + '; rightWristY = ' + rightWristY);

        console.log(results)
        var scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log("scoreLeftWrist = " + scoreLeftWrist)
    }
}

function modelLoaded()
{
    console.log('PoseNet has been initialized!!!! 🥳')
}

function draw()
{
    image(video, 0, 0, 300, 200);

    fill('#ff0000');
    stroke('ff0000#')

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20)
        var InNumberleftWristY = Number(leftWristY);
        var remove_decimals = floor(InNumberleftWristY)
        var volume = remove_decimals/500;
        
        document.getElementById('volume').innerHTML = "VOLUME = " + volume;
        song.setVolume(volume);
    
    }

}

function playSong()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}