#!/bin/bash

trap terminate_start SIGINT

terminate_start() {
    echo "Shutting down..."
    stop
}

start() {
    docker compose up --wait
    # npx lerna run dev --scope=tamriel-fashion --stream
}

stop() {
    docker compose down
}

start