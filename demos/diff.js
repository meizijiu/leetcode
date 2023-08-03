// 假设我们有两个虚拟DOM树：oldVirtualDOM和newVirtualDOM

const oldVirtualDOM = {
	type: 'div',
	props: { id: 'container', className: 'wrapper' },
	children: [
		{ type: 'h1', props: { className: 'title' }, text: 'Hello, React!' },
		{
			type: 'p',
			props: { className: 'content' },
			text: 'Welcome to React Diff Algorithm!',
		},
	],
};

const newVirtualDOM = {
	type: 'div',
	props: { id: 'container', className: 'wrapper' },
	children: [
		{ type: 'h1', props: { className: 'title' }, text: 'Hello, ChatGPT!' }, // 更新文本内容
		{
			type: 'p',
			props: { className: 'content' },
			text: 'Welcome to ChatGPT and React Diff Algorithm!',
		}, // 更新文本内容
		{ type: 'button', props: { className: 'btn' }, text: 'Click Me!' }, // 新增节点
	],
};

function diff2(oldVirtualDOM, newVirtualDOM) {
    const diffResult = []

	// 判断节点是否不同
	function isDifferent(oldNode, newNode) {
		return (
			oldNode.type !== newNode.type ||
			oldNode.props !== newNode.props ||
			oldNode.text !== newNode.text
		);
	}

    function compareNodes(oldNode, newNode, index = 0) {
        if (!oldNode) {
			// 旧节点不存在，说明是全新节点，需要添加
			diffResult.push({ type: 'ADD', newNode, index });
        } else if (!newNode) {
            // 新节点不存在，说明旧节点被删除了
            diffResult.push({ type: 'REMOVE', index })
        } else if (isDifferent(oldNode, newNode)) {
			// 节点类型不同或者节点文本内容不同，需要更新
			diffResult.push({ type: 'UPDATE', newNode, index });
        } else {
            // 递归迭代
            const oldChildren = oldNode.children || [];
            const newChildren = newNode.children || [];
            const len = Math.max(oldChildren.length, newChildren.length)
            for (let i = 0; i < len; i++) {
				compareNodes(oldChildren[i], newChildren[i], i);
			}
        }
    }

    compareNodes(oldVirtualDOM, newVirtualDOM)

    return diffResult
}


diff2(oldVirtualDOM, newVirtualDOM);