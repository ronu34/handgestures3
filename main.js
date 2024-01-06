Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:720
});
console.log("Setting up of webcam sucessfully completed.");

camera = document.getElementById("camera");
console.log("camera variable created.");

Webcam.attach('#camera');
console.log("Webacam attached sucessfully.");

function take_snapshot()
{
    console.log("Takeing Snapshot");
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
    console.log("Image generated");
    console.log("Placeing Image into id='captured_image'");
    console.log("Checking ml5 version please wait for few milleseconds.")
    console.log("Done!!!")
    console.log("Ml5 version : ",ml5.version);
    console.log("Loading Model")
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WYnMU5Sti/model.json'
    ,modelLoaded);
    function modelLoaded() {
        console.log("Model Loaded!!!!");
    }

    
}
function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The prediction is-"+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error , results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if (results[0].label == "Voctory") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if (results[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        
    }
}
