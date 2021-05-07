import { ipcRenderer } from 'electron';

export const saveToDir = (files) => {
	ipcRenderer.send('show-open-dialog', { files });
};

export function view(file) {
	ipcRenderer.send('view-file', file);
}

export async function readConfig() {
	return ipcRenderer.invoke('read-config-file');
}
