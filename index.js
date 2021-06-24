const { exec } = require('child_process');


//Starting xvfb process
exec("Xvfb :1 -screen 0 1280x720x24+32", (error, stdout, stderr) => {});

//Starting firefox and pointing to display 1
exec("DISPLAY=:1 firefox --kiosk template.html", (error, stdout, stderr) => {})

//Starting ffmpeg to capture
exec("ffmpeg -video_size `DISPLAY=:1 xdpyinfo | grep 'dimensions:'|awk '{print $2}'` -draw_mouse 0 -framerate 30 -f x11grab -i :1.0+0,0 -c:v libx264rgb -crf 0 -preset ultrafast output.mp4", (error, stdout, stderr) => {})





exec()
