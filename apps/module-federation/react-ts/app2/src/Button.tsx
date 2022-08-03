import * as React from 'react';
import { useEffect } from 'react';
import { EventBusWithWindow as eventBus } from 'mf-communication';
import { PubSub } from 'mf-communication/lib';

const Button: React.FC = () => {
  useEffect(() => {
    const unSubscribe = eventBus.subscribe('ChannelName_test', (data) => {
      console.log('button122 has receive msg');
      console.info(data);
    });
    const unSub = PubSub.subscribe('app1', 'message', (data) => {
      console.log(data);
    });
    return () => {
      unSubscribe();
      unSub();
    };
  }, []);
  return <button style={{ border: '1px solid blue' }}>App 2 Button1</button>;
};
export default Button;
