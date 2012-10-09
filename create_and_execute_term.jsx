main();
function main () {

var audiofilename = "Audio.aiff"; // the name of the audio file
var script_file = File($.fileName); // get the full path of the script
var script_folder = script_file.path; // get the path from that

/*
all the magic is in here
createTermFile(term_file_name, path, audio_file_name)
*/
var new_termfile = createTermFile("Audio_execute", script_folder, audiofilename);
new_termfile.execute(); // now execute the termfile

var doc = app.documents.add();
/*
Some ID stuff

*/

  var page = doc.pages.item(0); // get the first page
  
       app.activeWindow.activePage = page; // set the active page
       app.activeWindow.zoomPercentage = 100; // set the zoom
       app.activeWindow.zoom(ZoomOptions.FIT_PAGE);// fit the page
       // now lets switch into presentation mode

  // these are all the view options
  // look here http://jongware.mit.edu/idcs6js/pe_ScreenModeOptions.html
  // ScreenModeOptions.PRESENTATION_PREVIEW
  // ScreenModeOptions.PREVIEW_OFF 
  // ScreenModeOptions.PREVIEW_TO_BLEED
  // ScreenModeOptions.PREVIEW_TO_PAGE
  // ScreenModeOptions.PREVIEW_TO_SLUG
  

       app.activeWindow.screenMode = ScreenModeOptions.PRESENTATION_PREVIEW;


  delay(5); // this is the delay function wait 5 secs
alert("I've waited 5 seconds and am done now.");

};






function createTermFile(term_file_name, path, audio_file_name){

/* 

http://docstore.mik.ua/orelly/unix3/mac/ch01_03.htm

1.3.1.1. .term files
You can launch a customized Terminal window from the command line by saving some prototypical Terminal settings to a .term file,
then using the open command to launch the .term file (see "open" in Section 1.5.4, later in this chapter).
You should save the .term file someplace where you can find it later, such as ~/bin or ~/Documents.
If you save it in ~/Library/Application Support/Terminal, the .term file will show up in Terminal's File  Library menu.

To create a .term file, open a new Terminal window, and then open the Inspector (File  Show Info, or -I)
and set the desired attributes, such as window size, fonts, and colors. When the Terminal's attributes
have been set, save the Terminal session (File Save, or -S) to a .term file (for example, ~/Documents/proto.term).
Now, any time you want to launch a Terminal window from the command line, you can issue the following command:
 */

//#play audiofile from shell
//#look here http://osxdaily.com/2010/12/07/command-line-mp3-player-in-mac-os-x/
//afplay audiofile.mp3

    
var replace = "\\ ";

var shell_path = path.replace(/%20/g, replace);


    var termfile = new File(path + "/" +term_file_name + ".term");
    termfile.open("w");
    termfile.writeln(
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
        "<!DOCTYPE plist PUBLIC \"-//Apple Computer//DTD PLIST 1.0//EN\""+
            "\"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n"+
            "<plist version=\"1.0\">\n"+
                "<dict>\n"+
                    "<key>WindowSettings</key>\n"+
                "<array>\n"+
                " <dict>\n"+
                "<key>CustomTitle</key>\n"+
                "<string>My first termfile</string>\n"+
                "<key>ExecutionString</key>\n"+
                "<string>cd /Volumes/Macintosh\\ HD"+ shell_path + "; afplay "+ audio_file_name +"</string>\n"+
                "</dict>\n"+
                "</array>\n"+
                "</dict>\n"+
            "</plist>\n");

    termfile.close();
    return termfile;
};

  
  // delay function found here
  //found here http://www.wer-weiss-was.de/theme157/article1143593.html
  
  function delay(prmSec){
  prmSec *= 1000;
  var eDate = null;
  var eMsec = 0;
  var sDate = new Date();
  var sMsec = sDate.getTime();
  do {
  eDate = new Date();
  eMsec = eDate.getTime();
  } while ((eMsec-sMsec)<prmSec);
  } 