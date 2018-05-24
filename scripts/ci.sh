ci() {
    yarn verify
    yarn ensure:clean:repo

    # If it's not a push to master, exit nicely
    if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]; then
        exit 0
    fi

    # Otherwise, publish the next release and the website
    yarn deploy:website
    yarn next
}

ci
