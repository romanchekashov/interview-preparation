const { assert, measurePerformance } = require('../../../Utils');

/**
 * O(n) time | O(n) space (call-stack size)
 *
 * @tag recursion
 * @param {{val: number, left: {}, right: {}}} tree binary tree
 * @return {number} max sum branch
 */
function maxSumBranchInWeightedNodeBinaryTree(tree) {
    return tree ? Math.max(maxSumBranchInWeightedNodeBinaryTree(tree.left), maxSumBranchInWeightedNodeBinaryTree(tree.right)) + tree.val : 0;
}

function maxSumBranchInWeightedNodeBinaryTreeTailRecursion(tree) {
    let max = 0;
    const maxSum = (node, sum) => {
        sum += node.val
        max = Math.max(max, sum)
        node.left && maxSum(node.left, sum)
        node.right && maxSum(node.right, sum)
    }
    tree && maxSum(tree, 0)
    return max;
}

const solutions = [maxSumBranchInWeightedNodeBinaryTree, maxSumBranchInWeightedNodeBinaryTreeTailRecursion];

solutions.forEach((solution) => {
    console.log(`Run tests for: ${solution.name}`);
    measurePerformance(() => {
        const treeArr = [1, 2, 9, 1, 7, 5, 2, 9, null, 7];
        const tree = {
            val: 1,
            left: {
                val: 2,
                left: {
                    val: 1,
                    left: {
                        val: 9
                    }
                },
                right: {
                    val: 7
                }
            },
            right: {
                val: 9,
                left: {
                    val: 5,
                    left: {
                        val: 7
                    }
                },
                right: {
                    val: 2
                }
            }
        }

        assert(22, solution(tree));
    });
});
