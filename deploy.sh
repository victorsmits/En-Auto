#!/bin/bash
git add .;
git commit -m "update Heroku";
git subtree push -f --prefix En-Auto-Backend https://git.heroku.com/en-auto-backend.git master;
git subtree push -f --prefix En-Auto-Frontend https://git.heroku.com/en-auto-frontend.git master
