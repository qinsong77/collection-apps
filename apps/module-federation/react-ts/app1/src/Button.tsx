import * as React from 'react';
import { EventBusWithWindow as eventBus, PubSub } from 'mf-communication';

const Button = () => {
  const publishW = () => {
    eventBus.publish('ChannelName_test', {
      data: 123,
    });
  };
  const publish = () => {
    PubSub.publish('app1', 'message', {
      time: Date.now(),
    });
  };
  return (
    <div>
      <button
        style={{ border: '1px solid red' }}
        onClick={publishW}>
        App 1 Button
      </button>
      <hr />
      <button onClick={() => publish()}> PubSub - Publish</button>
    </div>
  );
};

export default Button;
