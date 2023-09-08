``` javascript
// BFS: 广度遍历
// 适用于层序遍历或者寻找最短路径时间
```


``` javascript
// DFS: 深度遍历
// 递归
```

题目：https://leetcode.cn/problems/max-area-of-island/description/

描述：
给你一个大小为 m x n 的二进制矩阵 grid 。

岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

岛屿的面积是岛上值为 1 的单元格的数目。

计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

示例：
输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
输出：6
解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。


代码：
``` javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    // dfs 深度优先
    let row = grid.length
    let col = grid[0].length

    function dfs(x, y) {
        if (x < 0 || x >= row || y < 0 || y >= col || grid[x][y] === 0) return 0
        grid[x][y] = 0
        let ans = 1
        let dx = [-1, 1, 0, 0]
        let dy = [0, 0, 1, -1]
        for (let i = 0; i < dx.length; i++) {
            ans += dfs(x + dx[i], y + dy[i])
        }

        return ans
    }

    let res = 0
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            res = Math.max(res, dfs(f, j))
        }
    }

    return res
};
```

``` javascript
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    // 广度优先
    let ans = 0
    let row = grid.length
    let col = grid[0].length
    let dx = [-1, 1, 0, 0]
    let dy = [0, 0, 1, -1]

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === 0) continue
            let queue = [[i, j]]
            let curr = 0

            while(queue.length > 0) {
                let [x, y] = queue.shift()
                // 越界判断
                if (x < 0 || x >= row || y < 0 || y >= col || grid[x][y] === 0) continue
                ++curr
                grid[x][y] = 0
                for (let k = 0; k < dx.length; k++) {
                    queue.push([x + dx[k], y + dy[k]])
                }
            }
            ans = Math.max(ans, curr)
        }
    }

    return ans
};
```