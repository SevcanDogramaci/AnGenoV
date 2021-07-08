const path = require('path');
const url = require('url');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');

let mainWindow;

let isDev = false;

if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === 'development') {
	isDev = true;
}

function createMainWindow() {
	mainWindow = new BrowserWindow({
		minWidth: 800,
		minHeight: 600,
		show: false,
		icon: __dirname + "/angenov.png",
		webPreferences: {
			nodeIntegration: true,
		},
	});

	let indexPath;

	if (isDev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		});
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true,
		});
	}

	mainWindow.loadURL(indexPath);

	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		// Open devtools if dev
		if (isDev) {
			const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

			installExtension(REACT_DEVELOPER_TOOLS).catch((err) => console.log('Error loading React DevTools: ', err));
			mainWindow.webContents.openDevTools();
		}
	});

	mainWindow.on('closed', () => (mainWindow = null));
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow();
	}
});

// Stop error
app.allowRendererProcessReuse = true;

// used to show error box
ipcMain.handle('show-error-dialog', (event, arg) => {
	console.log('show-error-dialog is triggered', arg);
	const { message } = arg;

	const options = {
		type: 'error',
		buttons: ['OK'],
		defaultId: 0,
		title: 'Error',
		message: 'An error occurred',
		detail: message[0],
	};

	dialog.showMessageBox(options).then((response) => {
		console.log(response);
	});
});

// used to delete a file
ipcMain.handle('delete-config-file', async (event, arg) => {
	console.log('delete-config-file is triggered', arg);

	const fs = require('fs');
	const path = require('path');
	const { toolName } = arg;

	let cwd = process.cwd();
	cwd = cwd.substring(0, cwd.lastIndexOf('/'));
	cwd = path.join(cwd, 'config', 'toolConfigs.json');

	const file = require(cwd);
	delete file.tools[toolName];

	fs.writeFile(cwd, JSON.stringify(file, null, 2), (err) => {
		if (err) return console.log(err);

		console.log('Writing to ', cwd);
	});

	return 'Successfully deleted !';
});

// used to update a file
ipcMain.handle('update-config-file', async (event, arg) => {
	console.log('update-config-file is triggered', arg);

	const fs = require('fs');
	const path = require('path');
	const { toolName, params, outName, readType, svType } = arg;

	let cwd = process.cwd();
	cwd = cwd.substring(0, cwd.lastIndexOf('/'));
	cwd = path.join(cwd, 'config', 'toolConfigs.json');

	console.log(params, cwd);

	const file = require(cwd);

	if (params == null) {
		file.tools[toolName].lastUsedParams = file.tools[toolName].defaultParams;
	} else if (file.tools[toolName]) {
		file.tools[toolName].lastUsedParams = params;
		file.tools[toolName].outputName = outName;
	} else {
		const newToolConfig = {
			name: toolName,
			outputName: `output${toolName}`,
			readType,
			defaultParams: params,
			lastUsedParams: params,
			svType,
		};
		file.tools[toolName] = newToolConfig;
	}

	fs.writeFile(cwd, JSON.stringify(file, null, 2), (err) => {
		if (err) return console.log(err);

		console.log('Writing to ', cwd);
	});

	return 'Successfully updated !';
});

// used to read a file
ipcMain.handle('read-config-file', async (event, arg) => {
	console.log('read-config-file is triggered', arg);

	const fs = require('fs');
	const path = require('path');

	let cwd = process.cwd();
	cwd = cwd.substring(0, cwd.lastIndexOf('/'));
	cwd = path.join(cwd, 'config', 'toolConfigs.json');

	const rawdata = fs.readFileSync(cwd);
	const tools = JSON.parse(rawdata);
	console.log('Tools read >> ', tools);

	return tools;
});

// Used to view files
ipcMain.on('view-file', (event, arg) => {
	console.log('view-file is triggered', arg);

	const fileToOpen = arg;
	const { shell } = require('electron');

	if (fileToOpen) {
		try {
			shell.openPath(fileToOpen);
		} catch (error) {
			console.log(error.message);
		}
	} else {
		throw Error;
	}
});

// Used to save files
ipcMain.on('show-open-dialog', (event, arg) => {
	console.log('show-open-dialog is triggered', arg);
	const { files } = arg;

	dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory'] }).then((response) => {
		console.log(response);

		const fs = require('fs');
		const path = require('path');

		files.forEach((element) => {
			const splittedFileName = element.split('/');
			const fileName = splittedFileName[splittedFileName.length - 1];
			const currentPath = path.join(element);
			const destinationPath = path.join(response.filePaths[0], fileName);

			console.log(element, fileName, currentPath, destinationPath);

			fs.rename(currentPath, destinationPath, (err) => {
				console.log('In renaming !');
				if (err) {
					throw err;
				} else {
					console.log('Successfully moved the file!');
				}
			});
		});
	});
});
