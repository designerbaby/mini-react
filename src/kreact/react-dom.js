// * vnode 
// type 原生标签 string
//      文本标签 没有type
//      函数组件 函数
//      类组件   类
// props 属性 如className、id、href、children

function render(vnode, container) {
  console.log('vnode', vnode);
  // step1 vnode -> node
  const node = createNode(vnode)

  // step2 
  container.appendChild(node)
}

function isStringOrNumber(sth) {
  return typeof sth === 'string' || typeof sth === 'number'
}

// 根据虚拟节点生成真实的dom节点
// vnode -> node
function createNode(vnode) {
  const { type } = vnode

  let node

  // todo 根据节点类型，生成dom节点
  if (typeof type === 'string') {
    // 原生标签节点 div/a
    node = updateHostComponent(vnode)
  } else if (isStringOrNumber(vnode)) {
    // 文本节点
    node = updateTextComponent(vnode)
  } else if (typeof type === 'function') {
    node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode)
  } else {
    // 处理fragment
    node = updateFragmentComponent(vnode)
  }
  // // 遍历children
  // reconcileChildren(node, props.children)

  // // 更新属性
  // updateNode(node, props)
  return node
}

// nextVal 数据类型object
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== 'children')
    .forEach(k => {
      node[k] = nextVal[k]
    })
}

function updateHostComponent (vnode) {
  const { type, props } = vnode
  const node = document.createElement(type) // 创建真实的dom节点
  updateNode(node, props) // 更新node节点
  reconcileChildren(node, props.children)
  return node
}

function updateTextComponent (vnode) {
  const node = document.createTextNode(vnode) // 创建文本节点
  return node
}

// 返回node,执行函数
function updateFunctionComponent(vnode) {
  const { type, props } = vnode
  const child = type(props)
  
  // vnode->node
  const node = createNode(child)
  return node
}

// 返回node,先实例化，再执行render函数
function updateClassComponent(vnode) {
  const { type, props } = vnode
  const instance = new type(props)
  const child = instance.render()
  // vnode->node
  const node = createNode(child)
  return node
}

function updateFragmentComponent(vnode) {
  // !源码中没用到这个createDocumentFragment
  const node = document.createDocumentFragment() // 创建个fragment空节点
  reconcileChildren(node, vnode.props.children)
  return node
}

// 遍历子节点，子节点是vnode,然后再vnode -> node.再插入parentNode中
// 遍历执行render
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children]

  for (let i = 0; i < newChildren.length; i++) {
    let child = newChildren[i]
    render(child, parentNode)
  }
}

export default { render }