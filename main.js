prediction_1 = "";
prediction_2 = "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function clickpicture(){
    Webcam.snap(function (url){
        document.getElementById("snapshot").innerHTML = "<img id='capturedimg' src='" + url + "'>";
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/qiZ6lOVvZ/model.json",modelloaded);

function modelloaded(){
    console.log("model has been loaded");

}

function speak(){
    synth = window.speechSynthesis;
    data1 = "so it looks the hand gesture is " + prediction_1 ;
    data2 = "but then i think the hand gesture can be  " + prediction_2 + " as well";
    utter = new SpeechSynthesisUtterance(data1 + data2);
    synth.speak(utter);

}

function identifypicture(){
    image = document.getElementById("capturedimg");
    classifier.classify(image, gotresult);
    

}

function gotresult(error, result){
    if (error){
        console.error(error);
    }
    else {
        console.log(result); 
        document.getElementById("result_name").innerHTML = result[0].label;
        document.getElementById("result_name_2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak();
        if (result[0].label == "amazing"){
            document.getElementById("emoji_update").innerHTML = "&#128076;";
        }
        if (result[0].label == "best"){
            document.getElementById("emoji_update").innerHTML = "&#128077;";
        }
        if (result[0].label == "victory"){
            document.getElementById("emoji_update").innerHTML = "&#9996;";
        }
        if (result[1].label == "amazing"){
            document.getElementById("emoji_update_2").innerHTML = "&#128076;";
        }
        if (result[1].label == "best"){
            document.getElementById("emoji_update_2").innerHTML = "&#128077;";
        }
        if (result[1].label == "victory"){
            document.getElementById("emoji_update_2").innerHTML = "&#9996;";
        }
    }
}