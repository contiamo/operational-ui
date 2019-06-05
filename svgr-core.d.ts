declare module "@svgr/core" {
  interface Config {
    /**
     * Replace SVG "width" and "height" value by "1em" in order to make SVG size inherits from text size.
     */
    icon: boolean;
    /**
     * Specify a custom extension for generated files.
     */
    ext: string;
    /**
     * Remove width and height from root SVG tag.
     */
    dimensions: boolean;
    /**
     * Use Prettier to format JavaScript code output.
     */
    prettier: boolean;
    /**
     * Specify Prettier config. See Prettier options.
     */
    prettierConfig: any;
    /**
     * Use SVGO to optimize SVG code before transforming it into a component.
     */
    svgo: boolean;
    /**
     * Specify SVGO config. See SVGO options.
     */
    svgoConfig: any;
    /**
     * Setting this to true will forward ref to the root SVG tag.
     */
    ref: boolean;
    /**
     * Replace an attribute value by an other. The main usage of this option is to change an icon color to "currentColor" in order to inherit from text color.
     */
    replaceAttrValues: Record<string, string>;
    /**
     * Add props to the root SVG tag.
     */
    svgProps: Record<string, string>;
    /**
     * Add title tag via title property.
     */
    titleProp: boolean;
    /**
     * Specify a template file (CLI) or a template function (API) to use. For an example of template, see the default one.
     */
    template: Function;
    /**
     * List of plugins.
     */
    plugins: string[];
  }

  interface State {
    /**
     * Specify a react component name.
     */
    componentName: string;
  }

  function svgr(
    svgCode: string,
    config?: Partial<Config>,
    state?: Partial<State>
  ): Promise<string>;

  namespace svgr {
    function sync(
      svgCode: string,
      config?: Partial<Config>,
      state?: Partial<State>
    ): string;
  }

  export default svgr;
}
