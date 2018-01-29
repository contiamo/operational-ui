## Working on Operational UI

After you install dependencies, simply run `npm run dev` or `yarn dev` inside the `components` or `visualizations` packages. This spins up a dev server you can use to test packages, by editing the entry point at `./packages/{components,visualizations}/scripts/dev-server/site.tsx`.

To run the showcase, simply run `npm run start` or `yarn start` from root. 

To make sure your code is ready for Travis and your reviewers, run `npm run ci:local` or `yarn ci:local` from the root of the project.

### Generators

To create a new `component`, simply run `./scripts/create-component.sh ComponentName`. This will generate all the boilerplate, files like `ComponentName.tsx` and `ComponentName.test.tsx`, and points to a few remaining manual wiring steps to get your component, its tests and its showcase page in place. The boilerplate also tries to guide towards consistent practices around code style, state management and styling. Please ask if anything is unclear.

More generators coming soon..

