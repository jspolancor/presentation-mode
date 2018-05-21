// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "presentation mode" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    
    let defaultZoomLevel = vscode.workspace.getConfiguration('').get('window.zoomLevel');            
    let isPresentationMode = false;    
    let disposable = vscode.commands.registerCommand('extension.presentationMode', function () {
        let zoomLevelInPresentationMode = vscode.workspace.getConfiguration('').get('presentationMode.zoomLevel');
        // The code you place here will be executed every time your command is executed                
        vscode.commands.executeCommand('workbench.action.toggleZenMode');
        if(isPresentationMode){
            vscode.commands.executeCommand('setContext', 'inPresentationMode', false);
            vscode.workspace.getConfiguration('').update('window.zoomLevel', defaultZoomLevel, true);            
        }else {
            vscode.commands.executeCommand('setContext', 'inPresentationMode', true);
            vscode.workspace.getConfiguration('').update('window.zoomLevel', zoomLevelInPresentationMode, true);            
        }        
        isPresentationMode = !isPresentationMode;
    });

    let exitPresentationMode = vscode.commands.registerCommand('extension.presentationModeExit', function () {
        vscode.commands.executeCommand('workbench.action.toggleZenMode');                
        vscode.workspace.getConfiguration('').update('window.zoomLevel', defaultZoomLevel, true);
        vscode.commands.executeCommand('setContext', 'inPresentationMode', false);
        isPresentationMode = false;
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(exitPresentationMode);    
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;