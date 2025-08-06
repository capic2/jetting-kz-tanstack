import { forwardRef } from 'react'

import type {
  CSSProperties,
  ElementType,
  HTMLAttributes,
  PropsWithChildren,
} from 'react'
import type { VariantProps } from 'tailwind-variants'

import { text } from './Text.variants'

type ValidTextElements =
  // Basic Text Elements
  | 'p'
  | 'span'
  | 'div'
  // Headings
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  // Text Semantics (basics)
  | 'em'
  | 'strong'
  | 'small'

/**
 * Recommended HTML elements for each typography variant.
 * These combinations promote semantic HTML while maintaining consistent styling.
 */
const RECOMMENDED_COMBINATIONS = {
  inherit: 'span',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  overline: 'h6',
  subtitle: 'h5',
  displayTitle: 'h1',
  displayBody: 'p',
  body: 'p',
  bodyStrong: 'strong',
  bodySmall: 'small',
  bodySmallStrong: 'strong',
  bodyLarge: 'p',
  bodyLargeStrong: 'strong',
  action: 'span',
  actionLarge: 'span',
  actionSmall: 'span',
} as const

export type TextProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    /**
     * The HTML element to render the text as. Defaults to a recommended element based on the variant.
     * @default 'span'
     */
    asElement?: ValidTextElements
    /**
     * The language of the text content See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang
     */
    lang?: HTMLSpanElement['lang']
    /**
     * The typography variant to use.
     * @default 'inherit'
     */
    variant?: VariantProps<typeof text>['variant']
    /**
     * The text's color. This can be any token under the `content` colors namespace.
     * @default 'inherit'
     */
    color?: VariantProps<typeof text>['color']
    /**
     * Whether the text should be truncated to one line and have an ellipsis.
     * @default false
     */
    isTruncated?: boolean
    /**
     * The number of lines to clamp the text to.
     * @default undefined
     */
    lineClamp?: number
    /**
     * Additional class names to apply to the text.
     * @default undefined
     */
    className?: string
  }
>

/**
 * The `Text` component is used to render text with different variants and colors.
 */
const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      variant,
      color,
      isTruncated,
      lineClamp,
      asElement: asElementProp,
      className: classNameProp,
      ...props
    },
    ref,
  ) => {
    const isLineClamped = lineClamp !== undefined
    const className = text({
      variant,
      color,
      isTruncated,
      isLineClamped,
      className: classNameProp,
    })
    const resolvedElement = RECOMMENDED_COMBINATIONS[variant ?? 'inherit']
    const Component = (asElementProp ?? resolvedElement) as ElementType
    return (
      <Component
        {...props}
        ref={ref}
        className={className}
        style={{ '--text-line-clamp': lineClamp } as CSSProperties}
      >
        {children}
      </Component>
    )
  },
)

Text.displayName = 'Text'

export { Text }
