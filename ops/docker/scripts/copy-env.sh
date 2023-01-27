#!/bin/sh
if [[ -f ".env" ]]; then
    rm .env
fi

cp -n .env.development .env
