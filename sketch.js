/* MoveNet Skeleton - Steve's Makerspace (most of this code is from TensorFlow)

MoveNet is developed by TensorFlow:
https://www.tensorflow.org/hub/tutorials/movenet

*/

let video, bodypose, pose, keypoint, detector;
let poses = [];

var inup
function preload(){
  inup = loadImage("upload_9eba0692c05fbceb38024e09280b0be4.gif");
}


async function init() {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
  };
  detector = await poseDetection.createDetector(
    poseDetection.SupportedModels.MoveNet,
    detectorConfig
  );
}

async function videoReady() {
  console.log("video ready");
  await getPoses();
}

async function getPoses() {
  if (detector) {
    poses = await detector.estimatePoses(video.elt, {
      maxPoses: 2,
      //flipHorizontal: true,
    });
  }
  requestAnimationFrame(getPoses);
}

async function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, videoReady);
  video.size(width, height);
  video.hide();
  await init();

  stroke(255);
  strokeWeight(5);
  
}

function draw() {
  image(video, 0, 0);
  drawSkeleton();
  // flip horizontal
  cam = get();
  translate(cam.width, 0);
  scale(-1, 1);
  image(cam, 0, 0);
}

function drawSkeleton() {
  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    pose = poses[i];
    // // shoulder to wrist
    // for (j = 5; j < 9; j++) {  //
    //   if (pose.keypoints[j].score > 0.1 && pose.keypoints[j + 2].score > 0.1) {
    //     partA = pose.keypoints[j];
    //     partB = pose.keypoints[j + 2];
    //     line(partA.x, partA.y, partB.x, partB.y);
    //   }
    // }
    // // shoulder to shoulder
    // partA = pose.keypoints[5];
    // partB = pose.keypoints[6];
    // if (partA.score > 0.1 && partB.score > 0.1) {
    //   line(partA.x, partA.y, partB.x, partB.y);
      
    // }
    // // hip to hip
    // partA = pose.keypoints[11];
    // partB = pose.keypoints[12];
    // if (partA.score > 0.1 && partB.score > 0.1) {
    //   line(partA.x, partA.y, partB.x, partB.y);
      
    // }
    // // shoulders to hips
    // partA = pose.keypoints[5];
    // partB = pose.keypoints[11];
    // if (partA.score > 0.1 && partB.score > 0.1) {
    //   line(partA.x, partA.y, partB.x, partB.y);
      
    // }
    // partA = pose.keypoints[6];
    // partB = pose.keypoints[12];
    // if (partA.score > 0.1 && partB.score > 0.1) {
    //   line(partA.x, partA.y, partB.x, partB.y);
      
    // }
    // // hip to foot
    // for (j = 11; j < 15; j++) {
    //   if (pose.keypoints[j].score > 0.1 && pose.keypoints[j + 2].score > 0.1) {
    //     partA = pose.keypoints[j];
    //     partB = pose.keypoints[j + 2];
    //     line(partA.x, partA.y, partB.x, partB.y);
        
    //   }
    // }


    //eye
    partA = pose.keypoints[1]; //取眼睛的位置
    partB = pose.keypoints[2];
    if(partA.score > 0.1){  //鏡頭抓取眼睛
      push() //
      imageMode(CENTER);
      image(inup,partA.x,partA.y-25,inup.width,inup.height)
      pop()
    }

    if(partB.score > 0.1){
      push()
      imageMode(CENTER);
      image(inup,partB.x,partB.y-25,inup.width,inup.height)
      pop()
   }
    //wrist
    partA = pose.keypoints[9];
    partB = pose.keypoints[10];
    if(partA.score > 0.1){
      push()
      imageMode(CENTER);
      image(inup,partA.x,partA.y,inup.width,inup.height)
      pop()
    }

    if(partB.score > 0.1){
      push()
      imageMode(CENTER);
      image(inup,partB.x,partB.y,inup.width,inup.height)
      pop()
   }

   //text
   partA = pose.keypoints[2];
   if(partA.score > 0.1){
    push()
    scale(-1, 1);
    textSize(50)
    fill("#960018")
    stroke("#fff321")
    strokeWeight(3)
    text("412730284 王沛瑜",partA.x-50,partA.y-50)
    pop()
  }

   //   //nose
  //   partA=pose.keypoints[0]
  //   if(partA.score > 0.1){
  //     // fill("#960018")
  //     // ellipse(partA.x,partA.y,50)

  //     image(inn,partA.x-25,partA.y-25,50,50)
  //     // fill("#ffffff")
  //   }
  }


  
}

/* Points (view on left of screen = left part - when mirrored)
  0 nose
  1 left eye
  2 right eye
  3 left ear
  4 right ear
  5 left shoulder
  6 right shoulder
  7 left elbow
  8 right elbow
  9 left wrist
  10 right wrist
  11 left hip
  12 right hip
  13 left kneee
  14 right knee
  15 left foot
  16 right foot
*/
