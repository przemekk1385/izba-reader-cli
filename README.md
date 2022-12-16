# izba-reader-frontend

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Environment variables

| Name                 | Description                                     |
| -------------------- | ----------------------------------------------- |
| VUE_APP_API_ROOT_URL | API root url (eg. *http://api.example.com/api*) |
| VUE_APP_API_KEY      | API key                                         |

## Doppler configs

Project can be run using [Doppler](https://www.doppler.com).

### dev

API runs on the same host, on port `8000`.

### dev_docker_api

API runs inside Docker container, on port `1304`.

### prd

API runs on external host.
