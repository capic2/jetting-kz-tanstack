import type { PlayCtx } from '../../types/testing'

import { screen, userEvent, within } from 'storybook/test'

/**
 * Factory to get select testing utils
 * @param context the story context
 */
export const getTestingUtilsSelect = (context: PlayCtx) => {
  /**
   * Select an option in a select field
   * @param labelText the label of the select field
   * @param optionName the name of the option to select
   */
  const selectOption = async ({
    labelText,
    optionName,
  }: {
    labelText: string
    optionName: string
  }) => {
    await context.step(
      `Select option "${optionName}" in "${labelText}"`,
      async () => {
        const select = within(context.canvasElement).getByLabelText(labelText, {
          exact: false,
        })

        if (!select) {
          throw new Error(`Select not found for label ${labelText}`)
        }

        await userEvent.click(select, { delay: 100 })
        await userEvent.click(
          screen.getByRole('option', { name: optionName }),
          {
            delay: 100,
          },
        )
        await userEvent.tab({ delay: 100 })
      },
    )
  }

  return { selectOption }
}
