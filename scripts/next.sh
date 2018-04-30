#!/bin/sh
rebuildDependants() {
    git clone $1 dependant
    cd dependant
    yarn install
    yarn next
    cd ..
    rm -rf dependant
}

next() {
    lerna publish --canary=next --npm-tag=next --yes
    for REPO in $(cat "$(pwd)/scriptsnext/dependants.txt"); do rebuildDependants $REPO; done
}

next
