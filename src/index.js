// import * as React from 'react'
// import * as ReactDOM from 'react-dom'

import ReactDOM from './kreact/react-dom'
import Component from './kreact/Component'

import './index.css'

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        FunctionComponent-{this.props.name}
      </div>
    )
  }
}

// 函数组件
function FunctionComponent(props) {
  return (
    <div className="border">
      {props.name}
    </div>
  )
}

function FragmentComponent(props) {
  return (
    <>
      <li>1</li>
      <li>2</li>
    </>
  )
}

const jsx = (
  <section className="border">
    <h1>这是一段h1</h1>
    <p>janna</p>
    <a href="https://github.com/">github</a>
    <FunctionComponent name="函数组件" />
    <ClassComponent name="类组件" />
    <>
      <h1>1</h1>
      <h2>2</h2>
    </>
    <ul>
      <FragmentComponent />
    </ul>
  </section>
)

ReactDOM.render(jsx, document.getElementById('root'))

// * 不同节点的渲染
// 原生标签节点 ducoument.creatElement
// 文本节点    document.createTextNode或者node.textContext或者node.nodeValue
// 函数节点    执行函数的结果
// 类组件      先实例化，再执行render的结果
// Fragment   直接遍历子节点