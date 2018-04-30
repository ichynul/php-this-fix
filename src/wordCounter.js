class WordCounter {
    constructor(_vscode) { //构造函数，传入vscode对象
        this.vscode = _vscode;
        this.init();
    }

    init() { //初始化
        var vscode = this.vscode;
        var StatusBarAlignment = vscode.StatusBarAlignment;
        var window = this.vscode.window;

        //statusBar，是需要手动释放的
        this.statusBar = window.createStatusBarItem(StatusBarAlignment.Left);

        //跟注册事件相配合的数组，事件的注册，也是需要释放的
        var disposable = [];
        //事件在注册的时候，会自动填充一个回调的dispose到数组
        window.onDidChangeTextEditorSelection(this.count, this, disposable);

        //保存需要释放的资源
        this.disposable = vscode.Disposable.from(disposable);

        this.updateText();
        this.statusBar.show();
    }

    updateText() { //现在快凌晨两点，偷个懒早点睡，临时改成字符数量了。
        var window = this.vscode.window;
        this.editor = window.activeTextEditor;
        let selection = editor.selection;
        let content = editor.document.getText(selection);
        var len = content.replace(/[\r\n\s]+/g, '').length;
        this.statusBar.text = $this.count();
    }

    showMsg() {
        vscode.window.showInformationMessage($this.count());
    }

    dispose() { //实现dispose方法
        this.disposable.dispose();
        this.statusBar.dispose();
    }

    count() {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return 'No editor';
        }
        let selection = editor.selection;
        let content = editor.document.getText(selection);
        if (!content.length) {
            return 'No text';
        }
        var matchs = text.match(/\$this->\$/g) || [];
        return `$this->$:' ${matchs.length}`;
    }
}