### Usage

```jsx
const { name, gitUrl, branch, isCreating, isValid } = {
  name: "my bundle",
  gitUrl: "git://github.com/me/my-bundle",
  branch: "master",
}
;<Form>
  <Input label="Name" value={name} />
  <Input label="Git URL" value={gitUrl} />
  <Input label="Branch" value={branch} />
  <Button color="primary">Import</Button>
</Form>
```

### With group

For grouping some elements together in one line, just wrap them in a simple `div`

```jsx
const { name, gitUrl, branch, isCreating, isValid } = {
  name: "my bundle",
  gitUrl: "git://github.com/me/my-bundle",
  branch: "master",
}
;<Form>
  <div>
    <Input label="Name" value={name} />
    <Input label="Git URL" value={gitUrl} />
  </div>
  <Input label="Branch" value={branch} />
  <Button color="primary">Import</Button>
</Form>
```
