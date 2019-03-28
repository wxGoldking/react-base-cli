// 异步加载高阶组件

import React, { Component } from "react";

export default function AsyncComponent(importComponent, props) {
  class AsyncComponentCache extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({ component });
    }

    render() {
      const Component = this.state.component;
      return Component ? (
        <Component
          {...props}
        />
      ) : null;
    }
  }
  return AsyncComponentCache;
}