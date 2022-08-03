import * as React from 'react';
import { EventBusWithWindow as eventBus } from 'mf-communication';

const Button = () => {
  const subscribe = () => {
    eventBus.publish('eventName_test', {
      data: 123,
    });
  };
  return (
    <button
      style={{ border: '1px solid red' }}
      onClick={subscribe}>
      App 1 Button
    </button>
  );
};

export default Button;
