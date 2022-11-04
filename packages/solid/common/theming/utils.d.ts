import { CssComponent } from '@stitches/core/types/styled-component';
import { Appearance } from '../../src/types';
export declare function generateClassNames(
/**
 * name of css class name variable
 */
classNameKey: 'button' | 'container' | 'anchor' | 'divider' | 'label' | 'input' | 'loader' | 'message', 
/**
 * stiches CSS output
 */
defaultStyles: string, 
/**
 * appearance variables
 */
appearance?: Appearance): (string | CssComponent<"span", {}, {}, {}> | undefined)[];
//# sourceMappingURL=utils.d.ts.map