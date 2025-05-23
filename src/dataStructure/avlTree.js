class TreeNode {
  value
  left = null
  right = null
  height
  constructor(val, height) {
    this.value = val
    this.height = height || 0
  }
}


export class AVLTree {
  root = null
  tasks = []
  constructor(value) {
    this.root = value ? new TreeNode(value) : null
  }

  #recordTask(operate, treeState) {
    // 「插入节点 xxx，插入位置 xxx，具体行为：插入 左旋 右旋 」
    this.tasks.push({ operate, treeState, key: this.tasks.length })
    console.log(this.tasks)
  }

  #updateHeight(node) {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1
  }

  getHeight(node) {
    // 叶节点高度为0，节点不存在即 -1
    return node === null ? -1 : node.height
  }

  insert(value) {
    this.root = this.#insert(this.root, value)
  }
  // 在 AVL 树中插入节点后，从该节点到根节点的路径上可能会出现一系列失衡节点。
  // 因此，我们需要从这个节点开始，自底向上执行旋转操作，使所有失衡节点恢复平衡
  #insert(node, value) {
    if (node === null) {
      return new TreeNode(value)
    }
    if (value < node.value) {
      node.left = this.#insert(node.left, value)
      this.#recordTask('insertLeft', this)
    }
    if (value > node.value) {
      node.right = this.#insert(node.right, value)
      this.#recordTask('insertRight', this)
    }

    this.#updateHeight(node)
    return this.#checkBalance(node)
  }
  // 

  #getBalance(node) {
    if (node === null) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right)
  }

  #checkBalance(node) {
    // 偏哪边，就反方向旋转。
    // 自底向上旋转调整平衡： 先纠正子节点、再纠正父节点
    // 
    const balanceFactor = this.#getBalance(node)
    // 左偏树
    if (balanceFactor > 1) {
      if (this.#getBalance(node.left) >= 0) {
        this.#recordTask('左偏树右旋', this)
        return this.rightRotate(node)
      }// 子树偏右
      else {
        this.#recordTask('左偏树子树偏右，先左旋再右旋', this)
        node.left = this.leftRotate(node.left)
        return this.rightRotate(node)
      }
    }
    // 右偏树
    if (balanceFactor < -1) {
      if (this.#getBalance(node.right) <= 0) {
        this.#recordTask('右偏树左旋', this)
        return this.leftRotate(node)
      } else {
        //子树偏左
        this.#recordTask('右偏树子树偏左，先右旋再左旋', this)
        node.right = this.rightRotate(node.right)
        return this.leftRotate(node)
      }
    }
    return node
  }

  rightRotate(node) {
    // 父变子右，子右(变)父左
    const child = node.left
    const grandChild = child.right
    child.right = node
    node.left = grandChild

    // 为什么要先 updateNode 再 updateChild
    // child 已经是新的根节点了。
    // node 已经是 child 的子节点了。
    // 如果先更新 child,child 的高度会根据 node 的高度来计算,此时node 的节点高度还是之前的
    this.#updateHeight(node)
    this.#updateHeight(child)

    return child
  }

  leftRotate(node) {
    const child = node.right
    const grandChild = child.left

    child.left = node
    node.right = grandChild

    this.#updateHeight(node)
    this.#updateHeight(child)

    return child
  }
}

export const TraverseTreeWithPreOrder = (tree) => {
  // 前序 根-左-右
  const preRes = []
  const preOrder = (root) => {
    if (root === null) return
    preRes.push(root.value)
    preOrder(root.left)
    preOrder(root.right)
  }
  preOrder(tree.root)
  console.log('前序', preRes)
  return preRes
}