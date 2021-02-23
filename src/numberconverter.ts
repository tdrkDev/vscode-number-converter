import * as vscode from 'vscode';
import * as parse from './parse';

function showResult(src: string, mode: string, editor: vscode.TextEditor) {
	const dst = parse.parse(src as string, mode as string);
	if (dst === "err") {
		vscode.window.showErrorMessage("Failed to convert " + src + " to " + mode);
		return;
	}

	let start = editor.selection.start;

	editor.edit((editBuilder) => {
		editBuilder.delete(new vscode.Range(start, editor.selection.end));
		editBuilder.insert(start, dst);
	});
}

export function activate(context: vscode.ExtensionContext) {
	const commands = [
		vscode.commands.registerCommand('numberconverter.to-hex', () => {
			let mode: string = "hex";
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const selections = 
				editor.selections
				.map(s => editor.document.getText(new vscode.Range(s.start, s.end)))
					.reverse()
					.join(' ');
				if (selections) {
					showResult(selections, mode, editor);
				} else {
					const pos = editor.selection.active;
					const textLine = editor.document.lineAt(pos.line);
					showResult(textLine.text, mode, editor);
				}
			}
		}),
		vscode.commands.registerCommand('numberconverter.to-bin', () => {
			let mode: string = "bin";
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const selections = 
				editor.selections
				.map(s => editor.document.getText(new vscode.Range(s.start, s.end)))
					.reverse()
					.join(' ');
				if (selections) {
					showResult(selections, mode, editor);
				} else {
					const pos = editor.selection.active;
					const textLine = editor.document.lineAt(pos.line);
					showResult(textLine.text, mode, editor);
				}
			}
		}),
		vscode.commands.registerCommand('numberconverter.to-dec', () => {
			let mode: string = "dec";
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				const selections = 
				editor.selections
				.map(s => editor.document.getText(new vscode.Range(s.start, s.end)))
					.reverse()
					.join(' ');
				if (selections) {
					showResult(selections, mode, editor);
				} else {
					const pos = editor.selection.active;
					const textLine = editor.document.lineAt(pos.line);
					showResult(textLine.text, mode, editor);
				}
			}
		}),
	];

	commands.forEach(c => {
		context.subscriptions.push(c);
	});
}

export function deactivate() {}
