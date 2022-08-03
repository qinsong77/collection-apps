import * as React from 'react';
import { useEffect } from 'react';
import { EventBusWithWindow as eventBus } from 'mf-communication';

const Button: React.FC = () => {
  useEffect(() => {
    const unSubscribe = eventBus.subscribe('eventName_test', (data) => {
      console.log("button122 has receive msg")
      console.info(data);
    });
    return unSubscribe;
  }, []);
  return <button style={{ border: '1px solid blue' }}>App 2 Button</button>;
};
export default Button;
