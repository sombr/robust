#!/bin/bash
tmux split-window 'babel -w -d ./js ./template/'
tmux split-window 'perl bin/robust'
