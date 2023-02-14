function App() {
	const [markdown, setMarkdown] = React.useState(placeholder_md);

	React.useEffect(() => {
		$("#toggle-btn").click(function () {
			$("#toggle-btn").toggleClass("fa-arrows-alt fa-compress");
			$("#editor").toggle();
		});
	}, []);

	function handleMessageChange(event) {
		setMarkdown(event.target.value);
	}

	return (
		<div className="container">
			<div id="editor-wrapper">
				<div className="tooltip">
					Editor
					<i id="toggle-btn" className="fa fa-arrows-alt"></i>
				</div>
				<textarea
					id="editor"
					name="markdown"
					value={markdown}
					onChange={(e) => handleMessageChange(e)}
				/>
			</div>
			<div id="preview-wrapper">
				<div className="tooltip">Preview</div>
				<Preview markdown={markdown} />
			</div>
			<div className="footer">
				by{" "}
				<a href="https://github.com/nickpartalis" target="_blank">
					nickpartalis
				</a>
			</div>
		</div>
	);
}

function Preview({ markdown }) {
	const markedOptions = {
		gfm: true,
		breaks: true,
		highlight: function (code) {
			return Prism.highlight(code, Prism.languages.javascript, "javascript");
		}
	};

	return (
		<div
			id="preview"
			dangerouslySetInnerHTML={{
				__html: DOMPurify.sanitize(
					marked.parse(
						markdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ""),
						{ ...markedOptions }
					)
				)
			}}
		/>
	);
}

const placeholder_md = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
