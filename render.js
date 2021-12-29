const ipcRenderer = require('electron').ipcRenderer;





function banall() {
    ipcRenderer.send('banall', {
        token: `${document.getElementById("token").value}`,
        guild: `${document.getElementById("guild").value}`
    });

}
document.onkeydown=function(e)
{

    if(e.ctrlKey && e.shiftKey && e.keyCode ==="I".charCodeAt(0)){
        return false;
    }
}