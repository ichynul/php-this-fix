class WordCounter {
    constructor(_vscode) {
        this.vscode = _vscode;
        this.init();
    }

    init() {
        var vscode = this.vscode;
        var StatusBarAlignment = vscode.StatusBarAlignment;
        var window = this.vscode.window;
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection("build");
        var disposable = [];
        window.onDidChangeTextEditorSelection(this.check, this, disposable);
        window.onDidChangeActiveTextEditor(this.check, this, disposable);
        this.disposable = vscode.Disposable.from(disposable);
        this.check();
    }

    check() {
        let editor = this.vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        let selection = editor.selection;
        let content = editor.document.getText(selection) || editor.document.getText();
        if (!content.length) {
            return;
        }
        let diagnostics = [];
        let lines = content.split(/\r?\n/g);
        lines.forEach((line, i) => {
            let index = line.indexOf('$this->$');
            if (index >= 0) {
                diagnostics.push({
                    severity: parseInt(this.vscode.workspace.getConfiguration('phpfixthis').get('warnningLevel')),
                    range: {
                        start: {
                            line: i,
                            character: index
                        },
                        end: {
                            line: i,
                            character: index + 8
                        }
                    },
                    message: `\'${line.substr(index, 8)}\' is wrong maybe!`,
                    source: 'ex'
                });
            }
        });
        this.diagnosticCollection.set(editor.document.uri, diagnostics);
    }
    dispose() {
        this.disposable.dispose();
        this.diagnosticCollection.dispose();
    }
}
module.exports = WordCounter;