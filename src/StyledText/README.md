Apply styling to HTML text elements. Specifically used to apply styling to React Markdown.

### Usage

```jsx
<StyledText>
  <h1>Fibonacci Demo</h1>
  <p>
    This notebook walks through some ways to write a Fibonancci generating function in Python. From{" "}
    <a href="https://en.wikipedia.org/wiki/Fibonacci_number">Wikipedia</a>
  </p>
  <blockquote>
    <p>
      By definition, the first two numbers in the Fibonacci sequence are either 1 and 1, or 0 and 1, depending on the
      chosen starting point of the sequence, and each subsequent number is the sum of the previous two.
    </p>
  </blockquote>
  <p>
    Check out the <code>fibonacci-walkthrough</code> notebook for some example implementations. The <code>listfib</code>{" "}
    function will return the list of the first <code>n</code> Fibonacci numbers.{" "}
  </p>
  <p>
    This bundle also shows how to create background jobs from your notebooks. The <code>fibonacci-walkthrough</code> job
    will run and save the output of the <code>fibonacci-walkthrough.ipynb</code> notebook. This job is not scheduled and
    must be triggered manually. See the <code>bundle.yaml</code> for how this is configured.
  </p>
</StyledText>
```

```jsx
<StyledText>
  <h1>UC-OTE-CableFailure</h1>
  <h3>User (user.name@contiamo.com)</h3>
  <h3>last edit: july 13, 2018</h3>
  <h3>updated for git and Datalab Jupyter Hub environment</h3>
  <p>
    start jupyter - <a href="#">https://jupyter.de</a>
  </p>
  <p>go to: new --> terminal</p>
  <h2>terminal</h2>
  <p>mkdir python # if not there in /home/user</p>
  <p>cd python</p>
  <p>mkdir uc-cf</p>
  <h2>jupyter</h2>
  <p>open the jupyter website</p>
</StyledText>
```
