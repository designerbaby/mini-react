// * vnode 
// type 原生标签 string
//      文本标签 没有type
// 函数组件 type 函数
// props 属性 如className、id、href、children

function render(vnode, container) {
  console.log('vnode', vnode);
  // step1 vnode -> node
  const node = createNode(vnode)

  // step2 
  container.appendChild(node)
}

// vnode -> node
function createNode(vnode) {
  const { type } = vnode

  let node

  // todo 根据节点类型，生成dom节点
  if (type === TEXT) {
    // 文本节点
    node = document.createTextNode('')
  } else if (typeof type === 'string') {
    // 原生标签节点
    node = updateHostComponent(type)
  } else if (typeof type === 'function') {
    node = updateFunctionComponent(vnode)
  }
  // 遍历children
  reconcileChildren(node, props.children)

  // 更新属性
  updataNode(node, props)
  return node
}

// nextVal 数据类型object
function updataNode(node, nextVal) {
  Object.keys(nextVal)
    .filter(k => k !== 'children')
    .
}

function updateFunctionComponent(vnode) {
  const { type, props } = vnode

  const instance = new type()
  const child = instance.render()
  const child = type(props)

  const node = 
}