#!/bin/bash

node newgen.js | ack 'ScriptsCreate' -A15 | cat
