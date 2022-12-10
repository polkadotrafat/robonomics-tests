Issues with Robonomics Parachain node

1. Zombienet : Robonomics parachain node times out. Here is a sample configuration file, one of many, that I used to spawn robonomics parachain node.

```
[relaychain]
default_command = "./bin/polkadot"
default_args = [ "-lparachain=debug" ]

chain = "rococo-local"

    [[relaychain.nodes]]
    name = "alice"
    validator = true

    [[relaychain.nodes]]
    name = "bob"
    validator = true

[[parachains]]
id = 2048
chain = "main-dev"

    [parachains.collator]
    name = "alice"
    chain = "main-dev"
    command = "./bin/robonomics"
    args = ["-lparachain=debug","--force-authoring"]
```

It times out with 
```
Error: Timeout(60) for node : alice-1
at NativeClient.<anonymous> (/snapshot/javascript/packages/orchestrator/dist/providers/native/nativeClient.js)
at Generator.next (<anonymous>)
at fulfilled (/snapshot/javascript/packages/orchestrator/dist/providers/native/nativeClient.js)
```

I tried running it with "cumulus_based = true" flag but it errored out as well.

```
TypeError: Cannot read properties of undefined (reading '0')
    at clearAuthorities (/snapshot/javascript/packages/orchestrator/dist/chain-spec.js)
    at /snapshot/javascript/packages/orchestrator/dist/paras.js
    at Generator.next (<anonymous>)
    at fulfilled (/snapshot/javascript/packages/orchestrator/dist/paras.js)
┌────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Node'              │ /tmp/zombie-8decca0cf5d024e678365b4902c84514_-15730-wHfsVc8N2CCh/logs                              │
│ s logs:            │                                                                                                    │
│ m                  │                                                                                                    │
└────────────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────┘
Error: Command failed with exit code 2: /bin/bash -c kill -9
kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]
    at makeError (/snapshot/javascript/node_modules/execa/lib/error.js:60:11)
    at handlePromise (/snapshot/javascript/node_modules/execa/index.js:118:26)
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  shortMessage: 'Command failed with exit code 2: /bin/bash -c kill -9 ',
  command: '/bin/bash -c kill -9 ',
  escapedCommand: '"/bin/bash" -c "kill -9 "',
  exitCode: 2,
  signal: undefined,
  signalDescription: undefined,
  stdout: '',
  stderr: 'kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]',
  failed: true,
  timedOut: false,
  isCanceled: false,
  killed: false
}
UnhandledRejection: Error: Command failed with exit code 2: /bin/bash -c kill -9
kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]
```

2. Error: Input when trying to export wasm runtime for mercury parachain 

https://github.com/airalab/robonomics/issues/323
