# JS Mexico

This project depends on environment variables.
Install `direnv` and create an .envrc with at least this contents

    layout node
    export NODE_PATH="$NODE_PATH:./app"
    export MONGO_URL="mongodb://localhost/jsmexico"
    #export MONGO_DEBUG=1
    export SECRET="LONG STRING!!!1!one"
