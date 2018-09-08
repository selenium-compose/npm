![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)
# Selenium Compose

<p align="center">
  <img width="250" src="https://www.selenium-compose.io/logo.svg">
</p>

Selenium Compose is a code-free, description-driven [selenium tests](https://www.seleniumhq.org/) composition.

## Installation

First install [Selenium Standalone](https://www.npmjs.com/package/selenium-standalone)
and start Selenium Server

```bash
npm install selenium-standalone@latest -g
selenium-standalone install && selenium-standalone start
```

```bash
npm install selenium-compose
selenium-compose doc title
```

## Overview

* Code-free selenium tests composition
* Intuitive syntax
* Debug-friendly
* Readable logs
* Reusable components
* Developer friendly
* Pitfalls-free
* Hassle-free

## Get Started

* Selenium Compose Guides [https://selenium-compose.io](https://selenium-compose.io)

## Example

Testing [Golang](https://golang.org)

```yaml
variables:
  golang_url: "https://golang.org"

scenarios:
  golang_org:
    actions:
      - open:
          url: $golang_url
          timeout: 20s
      - wait:
          - title:
              is: the go programming language
              ignore_case: true
      - click:
          location: "#learn .run"
      - wait:
        - text:
            location: .stdout
            is: "Hello, 世界"
      - type:
          location: "#learn select"
          keys: "fib.go"
      - pause: 400ms
      - move_to: "#learn .run"
      - click:
      - wait:
        - text:
            location: .stdout
            is: "1 1 2 3 5"
            timeout: 50s
      - click: "#learn .buttons a.share"
      - wait:
          title: The Go Playground
      - clear:
          location: code
          selector: id
      - type:
          location: code
          selector: id
          keys:
            >
              package main

              import (
                "fmt"
                "time"
              )

              func main() {
                time.Sleep(time.Second)
                fmt.Print("Voila!")
              }

      - pause: 2s
      - click:
          location: "#run"
      - wait:
        - text:
            location: "#output .stdout"
            is: Voila!
            timeout: 2m
```

##### Debug mode

<p align="center">
  <img src="https://www.selenium-compose.io/gifs/demo_debug.gif">
</p>

## Commands

### Run

Run executes all scenarios described in yml files

```bash
$ selenium-compose run [scenarios yml file]
```

Flag | Default | Description
--- | --- | ---
`-u` `--hub` | `:4444/wd/hub` | Selenium hub url
`-d` `--debug` | `false` | Run in debug mode
`-s` `--selector` | `css` | Default selector. One of {xpath, id, name, tag, class, css}
`-t` `--timeout` | `2 min` | Maximum timeout for conditions to be satisfied
`-l` `--length` | `unlimited` | Maximum execution time after which all remained tests will be terminated
`-l` `--scenario-length` | `unlimited` | Maximum execution time for each scenario after which the scenario will be terminated
`-f` `--filter` | `""` | Filter out scenarios to be run by name
`-e` `--exit-on-failure` | `false` | Terminate all running tests if any test failed
`-n` `--parallel` | `100` | Maximum simultaneously running tests count
`-o` `--output` | `./out` | Output dir for logs, screenshots, etc...
`-p` `--pwd` | `.` | Current working dir, all paths are relative to the working dir
`--retry-count` | 5 | Attempts count to create a new session
`--retry-interval` | 30 sec | Attempts interval to create a new session
`--browser` | `chrome` | The name of the browser
`--version` | `"Unknown"` | The browser version
`--platform` | `ANY` | Flag specifying which platform the browser should be running on

## Issues

If you encounter any problems when using Selenium Compose,
raise an issue on [GitHub](https://github.com/selenium-compose/selenium-compose/issues) or contact us on
[Slack](https://join.slack.com/t/seleniumcompose/shared_invite/enQtMzYwMzI2MTQ2Njc4LTQ2MDFmMjBhYTllNDdhNjc5NDM3ZGUzNmZiMDZkOGM1NDcxMTdjYWM4OWMxMmRiYThlZWQ1NTVkOGE0NDVkMWY).
˜
