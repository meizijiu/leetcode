class koa {
	constructor() {
		this.middlewares = [];
	}

	use(middleware) {
		this.middlewares.push(middleware);
	}

	async compose(ctx, middlewares) {
		let index = -1;

		const dispatch = async (i) => {
			if (i < index) {
				throw new Error('next() called multiple times');
			}

			index = i;

			const middleware = middlewares[i];

			// 最后一个中间件调用next将不执行下一个中间件
			if (!middleware) return;

			await middleware(ctx, () => dispatch(i + 1));
		};

		await dispatch(0);
	}

	async handleRequest(ctx) {
		const middlewares = [...this.middlewares];

		middlewares.push(async () => {});

		await this.compose(ctx, middlewares);
	}

	async listen(port) {
		const server = createServer(async (req, res) => {
			const ctx = { req, res };
			await this.handleRequest(ctx);

			res.end('Hello World');
		});

		server.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}

const app = new Koa();

app.use(async (ctx, next) => {
	console.log('First middleware - enter');
	await next(); // 控制权传递给下一个中间件
	console.log('First middleware - exit');
});

app.use(async (ctx, next) => {
	console.log('Second middleware - enter');
	await next(); // 控制权传递给下一个中间件
	console.log('Second middleware - exit');
});

app.use(async (ctx, next) => {
	console.log('Third middleware - enter');

	// 模拟异步操作
	await new Promise((resolve) => setTimeout(resolve, 1000));

	await next(); // 控制权传递给下一个中间件
	console.log('Third middleware - exit');
});

app.listen(3000);
