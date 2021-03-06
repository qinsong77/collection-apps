## babel 设置
- [@babel/preset-env 与@babel/plugin-transform-runtime 使用及场景区别](https://segmentfault.com/a/1190000021188054)

- babel-loader
- @babel/core
- @babel/preset-env
- @babel/plugin-transform-runtime
- @babel/preset-react

#### babel-loader
首先对于项目中的jsx文件我们需要通过一个"转译器"将项目中的jsx文件转化成js文件，babel-loader在这里充当的就是这个转译器。
#### @babel/core
babel-loader仅仅识别出了jsx文件，内部核心转译功能需要@babel/core这个核心库，@babel/core模块就是负责内部核心转译实现的。
#### @babel/preset-env
@babel/prest-env是babel转译过程中的一些预设，它负责将一些基础的es 6+语法，比如const/let...转译成为浏览器可以识别的低级别兼容性语法。

> 这里需要注意的是@babel/prest-env并不会对于一些es6+高版本语法的实现，比如Promise等polyfill，你可以将它理解为语法层面的转化不包含高级别模块(polyfill)的实现。

#### @babel/plugin-transform-runtime
@babel/plugin-transform-runtime,上边我们提到了对于一些高版本内置模块，比如Promise/Generate等等@babel/preset-env并不会转化，所以@babel/plugin-transform-runtime就是帮助我们来实现这样的效果的,他会在我们项目中如果使用到了Promise之类的模块之后去实现一个低版本浏览器的polyfill。

> 其实与@babel/plugin-transform-runtime达到相同的效果还可以直接安装引入@babel/polyfill，不过相比之下这种方式不被推荐，他存在污染全局作用域，全量引入造成提及过大以及模块之间重复注入等缺点。

此时这几个插件我们已经可以实现将es6+代码进行编译成为浏览器可以识别的低版本兼容性良好的js代码了，不过我们还缺少最重要一点。
#### @babel/preset-react
上面的这些插件处理的都是js文件，我们也要能够识别并处理jsx文件。
此时就引入了我们至关重要的@babel/preset-react。
@babel/preset-react是一组预设，所谓预设就是内置了一系列babel plugin去转化jsx代码成为我们想要的js代码。

