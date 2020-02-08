### Uploader

```
第一次运行项目:
  npm run start

后续使用：
  npm run dev

编译项目:
  npm run build:stage
  npm run build:live
```

### 代码规范

- 请安装vscode中的ESLint扩展插件，然后在项目根目录.vscode/settings.json中配置如下信息
> 若项目根目录下找不到这个文件夹，点击 [文件 > 首选项 > 设置 > 工作区] 并稍微改个配置并保存就出来了
```
  "eslint.options": { "configFile": "./.eslintrc.json" },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "typescript",
        "autoFix": true
    },
    {
        "language": "typescriptreact",
        "autoFix": true
    }
  ],
  "eslint.alwaysShowStatus": true
```
- 尽量不要在组件中使用继承！[原因](https://reactjs.org/docs/composition-vs-inheritance.html)。如果需要，父组件只能作为抽象类，不能用于组件渲染；
- 公共组件不要有副作用！
- 高阶函数使用`with`开头.如`withForm`并且引入使用的时候，也是用小驼峰
- 不要在组件中引入 `@http`,使用`@http`发请求的情况放在 store 中：
- 使用business层对store的属性与方法进行中转（并提供相应的businessProps接口），再注入到containers层使用，分离UI与业务。
- 不要直接将store注入到container层！

```javascript
    api() {
        return {
          getXXXById: (id: string) => http.get(`/EmailCommunication/Body/template/${id}`)
        };
      }
```

- `import`除了兄弟结构用相对路径，其他情况一律用在 webpack 中配置的别名
- 文件，文件夹名使用小驼峰
- 组件引用时使用大驼峰
- mobx 的注解放在 class 类名上，使用 inject 函数来注入想要的 business 使用`ES6 Decorator`的方式

```javascript
@inject(business)
class Home extends Component {}
```

- 不要使用函数式 `export default observable(Component)`来包装。
- 禁止使用以下生命周期函数[原因](https://medium.com/@nightspirit622/react-16-3-%E4%B9%8B%E5%BE%8C%E7%9A%84lifecycle-hooks-311661f65859)
  - `componentWillMount`
  - `componentWillReceiveProps`
  - `componentWillUpdate`
- 文件夹引用使用 webpack 种配置好的别名。如`@components`
- 对于事件绑定 this 的问题，不要放在 constructor 里面来 bind this，使用箭头函数来解决。 比如：onDelete = ()=> {}
- 对于 render 函数返回内容过多时(暂定 30 行)，尽量拆分组件， 表单例外。
- 与渲染无关的状态尽量不要放在 react 的 state 中来管理.[doc](https://cn.mobx.js.org/best/store.html)
- 尽量使用 es6 语法，如解构，给定默认值，let,const,箭头函数，`await async`
- 请严格遵守eslint规范，不要随意使用disable注释去避开代码检查
