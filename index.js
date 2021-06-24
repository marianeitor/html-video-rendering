const { exec } = require('child_process');

const outputVideoPath = "output.mp4"
const htmlAnimation = "template.html"

//Starting xvfb process
const proc1 = exec("Xvfb :1 -screen 0 1280x720x24+32", (error, stdout, stderr) => {
    console.log(error)
});

//Starting firefox and pointing to display 1
const proc2 = exec(`DISPLAY=:1 firefox --kiosk ${htmlAnimation}`, (error, stdout, stderr) => {
    console.log(error)
})

//Starting ffmpeg to capture
const proc3 = exec(`ffmpeg -video_size 1152x648 -draw_mouse 0 -framerate 30 -f x11grab -i :1.0+0,0 -c:v libx264rgb -crf 0 -preset ultrafast ${outputVideoPath}`, (error, stdout, stderr) => {
    console.log(error)
})

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    proc1.kill('SIGINT');
    proc2.kill('SIGINT');
    proc3.kill('SIGINT');
    process.exit();
});

