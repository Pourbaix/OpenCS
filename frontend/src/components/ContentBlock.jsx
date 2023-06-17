import "../assets/styles/components/content_block.scss";

function ContentBlock(props) {
	return (
		<div className="content_block_container">
			<div className="content_block_content">{props.children}</div>
		</div>
	);
}

export default ContentBlock;
