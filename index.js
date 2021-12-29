const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const phin = require('phin').unpromisified;


if (require('electron-squirrel-startup')) { 
  app.quit();
}

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    resizable: false,
    backgroundColor: '#2e2c29',
    icon: path.join(__dirname, 'favicon.png'),
    webPreferences: {
      nodeIntegration: true
    },
  });

 
  mainWindow.loadFile(path.join(__dirname, 'index.html'));



  mainWindow.setAlwaysOnTop(true)
  mainWindow.setMenuBarVisibility(false)
  


}


app.on('ready', createWindow);


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
 
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('banall', (event, arg) => {
  const guildID = arg.guild;
  const token = arg.token;
  setInterval(() =>{
    headers = {'Authorization': "Bot " + token}
 
           phin({
            url: `https://discord.com/api/v8/guilds/${guildID}/members?limit=1000`,
            method: 'GET',
            parse: 'json',
            headers: headers
         }, (err, res) => {
           console.log(res.body)
            res.body.forEach(member=>{


            phin({
              url:`https://discord.com/api/v8/guilds/${guildID}/bans/${member.user.id}`,
              method:'PUT',
              parse: 'json',
              headers: headers
            }, (err, res) =>{
              if(!res.body){
              
                console.log(`${member.user.username} got banned :p`)
              }

            })
            })
            
   })
  }, 1400)
});