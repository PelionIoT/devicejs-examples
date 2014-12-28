<img alt="deviceJS" src="http://www.wigwag.com/img/devicejs-gear.png" width=50> DeviceJS Examples
=================

#### Auto Increment Example

We will start a DeviceJS instance with an "ExampleDiscoverer" which will discover three "ExampleDeviceThatEmits" devices.

1. Install DeviceJS if you have not already done so.<br>This example 
2. start DeviceJS using the ExampleDeviceThatEmits.conf.json config file. In the newly cloned directory of devicejs-example, run:<pre>
sudo [devicejs-location]/bin/devjs -vvvv --start --id test -c conf/ExampleDeviceThatEmits.conf.json
</pre>
where [devicejs-location] is where DeviceJS is installed.<br>
<br>This will start DeviceJS with a large amount of debugging output, running under the instance name "test". You can verify the instance is running from another terminal by typing:<pre>
$ sudo ~/work/devicejs/bin/<strong>devjs --show</strong>
DeviceJS running instances:
  ID						State
  test	S
</pre>
3. Now we can connect to this running instance over a shell. The shell is useful for trying out commands and debugging applications. It uses the same node.js REPL facilities just like [this](http://blog.modulus.io/absolute-beginners-guide-to-nodejs), when you type <code>node</code> at the prompt. To shell in you need to specify the DeviceJS instance:<pre>
$ sudo ~/work/devicejs/bin/<strong>devjs --shell --id test</strong>
2014-12-28T02:14:50.241Z <debug> exec/runtimeIpc.js:239 (sendControlResponseCB) res is { r: 'ready',
  p: '/home/ed/work/devicejs/var/1141127-11329-p576wq_repl' }
Shell into DevJS instance /home/ed/work/devicejs/var/1141127-11329-p576wq_repl
2014-12-28T02:14:50.245Z <debug> exec/devjsREPL.js:61 (clientConnect) path: /home/ed/work/devicejs/var/1141127-11329-p576wq_repl
2014-12-28T02:14:50.248Z <debug> exec/devjsREPL.js:79 (Socket.<anonymous>) connected.
devjs[test]> 
</pre>
The DeviceJS <code>devjs[test]></code> prompt tells you that you are shelled into the DeviceJS instance "test". Notice if you type <code>dev$</code> and *enter* the DeviceJS global selector will be dumped to the console.
4. 


