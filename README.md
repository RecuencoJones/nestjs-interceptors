# nestjs-interceptors

To run the project:

```
npm install
npm run build
npm start
```

## Expectation

```
# First request
Tracing (incoming) > Cache (incoming) > Controller > Cache (outgoing) > Tracing (outgoing) >
# Second request
Tracing (incoming) > Cache (incoming) > Hit > Tracing (outgoing) >
```

## Observation

```
# First request
Tracing (incoming) > Cache (incoming) > Controller > Tracing (outgoing) > Cache (outgoing) >
# Second request
Tracing (incoming) > Cache (incoming) > Hit >
```

## Issue

Due to how the cache interceptor behaves (returning a new Observable on cache hits) looks like the interceptor chain is short-circuited somehow.

To my understanding, this should not happen, the global interceptor should be chained to whichever observable is returned by other interceptors, and they should be resolved in reverse order once the controller response is ready.

