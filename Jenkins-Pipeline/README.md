# Description

This folder contains resources required for Jenkins pipeline to work.

## Prerequisites

### NPM Registry Secret in JX namespace:

Add base64 encoded credentials to the __npm_registry_creds.yaml__ file:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: npm-registry-creds
type: Opaque
data:
  username: BASE64_USER
  password: BASE64_PASS
```


On push to master (after successful build):
 - Publish a new version on NPM with 'next' tag.
On PR:
 - NOTHING