var color_flag = false;
function changeColor() {
    var h1 = document.getElementsByTagName('h1');
    for (var i = 0; i< h1.length; i++) {
        // if (color_flag) {
        //     h1[i].style.color = "red";
        // } else {
        //     h1[i].style.color = "red";
        // }
        h1[i].style.color = color_flag? "red": "green";
        color_flag = !color_flag;
    }
}
