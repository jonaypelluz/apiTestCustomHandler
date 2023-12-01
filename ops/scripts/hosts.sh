#!/usr/bin/env bash

if grep -q "api-test-custom-handler.local" "/etc/hosts"; then
  echo "Host api-test-custom-handler.local found! Not modifying hosts."
else
  echo "Adding urls to hosts:"
  echo "127.0.0.1 api-test-custom-handler.local" | sudo tee -a /etc/hosts
fi
