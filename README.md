# Nlf-client

Angular client for [nlf-backend](/luftsport/nlf-backend)

## Build

Build local version
```
node src/version.js && ng serve --configuration=localhost --proxy-config proxy.conf.json
```

Build dev or prod
```
node src/version.js && ng build --configuration=dev
```

## Build docs
```
compodoc -p src/tsconfig.app.json
```
