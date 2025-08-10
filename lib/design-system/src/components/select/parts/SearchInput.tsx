import { forwardRef } from 'react';

import { Input, SearchField } from 'react-aria-components';
//import { useIntl } from 'react-intl'
import { tv } from 'tailwind-variants';

//import { CircularIconButton } from '../../icon-button/CircularIconButton'
//import { Icon } from '../../icon/Icon'

const searchInput = tv({
  slots: {
    base: 'flex gap-2 border border-solid pt-2 pb-2 pl-3 pr-3 rounded-md border-border-form-active text-content-form-active mt-50 mb-50 ml-50 mr-50 typography-body',
    input: 'flex-grow outline-none [&::-webkit-search-cancel-button]:hidden',
    button: 'text-content-neutral-enabled',
    separator: 'h-[1px] bg-surface-neutral-lowest w-full mt-50',
  },
});

const SearchInput = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  //const intl = useIntl()
  const { base, input, /*button, */ separator } = searchInput();

  return (
    <>
      <SearchField className={base()} ref={ref} data-dd-privacy="mask">
        {/*<Icon src="MagnifyingGlassOutlined" aria-hidden="true" />*/}
        <Input className={input()} />
        {/*<CircularIconButton
          title={intl.formatMessage({
            id: 'unity:component:common:clear:title',
            defaultMessage: 'Clear',
          })}
          className={button()}
          icon="CloseOutlined"
          asElement="button"
        />*/}
      </SearchField>
      <div aria-hidden="true" className={separator()} />
    </>
  );
});

SearchInput.displayName = 'SearchInput';

export { SearchInput };
